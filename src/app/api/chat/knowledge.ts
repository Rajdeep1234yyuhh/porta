import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

type KnowledgeDocument = {
  path: string;
  content: string;
  isRole: boolean;
};

const KNOWLEDGE_ROOT = path.join(process.cwd(), "knowledge");
const ROLES_DIRECTORY = path.join(KNOWLEDGE_ROOT, "roles");
const SUPPORTED_EXTENSIONS = new Set([
  ".md",
  ".mdx",
  ".txt",
  ".json",
  ".yaml",
  ".yml",
]);
const CACHE_DURATION_MS = 15_000;
const MAX_DOCUMENT_CHARS = 6_000;
const MAX_CONTEXT_CHARS = 14_000;
const MAX_RESULTS = 4;

let documentCache:
  | { documents: KnowledgeDocument[]; expiresAt: number }
  | undefined;

function isSupportedFile(filePath: string) {
  return SUPPORTED_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

async function getFilesRecursively(directory: string): Promise<string[]> {
  let entries;

  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }

  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return getFilesRecursively(entryPath);
      }

      return entry.isFile() && isSupportedFile(entryPath) ? [entryPath] : [];
    }),
  );

  return files.flat();
}

async function loadKnowledgeDocuments(): Promise<KnowledgeDocument[]> {
  let rootEntries;

  try {
    rootEntries = await readdir(KNOWLEDGE_ROOT, { withFileTypes: true });
  } catch (error) {
    // The folder is optional locally, but is included in production when present.
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }

  // Only index the two (or any future) files directly in knowledge/ and the
  // contents of knowledge/roles/. This avoids accidentally indexing unrelated
  // nested folders while keeping the requested sources together.
  const rootFiles = rootEntries
    .filter(
      (entry) =>
        entry.isFile() && isSupportedFile(path.join(KNOWLEDGE_ROOT, entry.name)),
    )
    .map((entry) => path.join(KNOWLEDGE_ROOT, entry.name));
  const roleFiles = await getFilesRecursively(ROLES_DIRECTORY);

  const files = [
    ...rootFiles.map((filePath) => ({ filePath, isRole: false })),
    ...roleFiles.map((filePath) => ({ filePath, isRole: true })),
  ];

  return Promise.all(
    files.map(async ({ filePath, isRole }) => ({
      path: path.relative(KNOWLEDGE_ROOT, filePath).replaceAll("\\", "/"),
      content: (await readFile(filePath, "utf8")).slice(0, MAX_DOCUMENT_CHARS),
      isRole,
    })),
  );
}

async function getKnowledgeDocuments() {
  if (documentCache && documentCache.expiresAt > Date.now()) {
    return documentCache.documents;
  }

  const documents = await loadKnowledgeDocuments();
  documentCache = {
    documents,
    expiresAt: Date.now() + CACHE_DURATION_MS,
  };

  return documents;
}

function getTerms(query: string) {
  return [
    ...new Set(
      query.toLowerCase().match(/[a-z0-9][a-z0-9_-]{1,}/g) ?? [],
    ),
  ].slice(0, 24);
}

function scoreDocument(document: KnowledgeDocument, terms: string[]) {
  const searchableText = `${document.path}\n${document.content}`.toLowerCase();

  return terms.reduce((score, term) => {
    if (!searchableText.includes(term)) {
      return score;
    }

    // Matches in a filename are especially useful for role documents.
    const filenameBonus = document.path.toLowerCase().includes(term) ? 3 : 0;
    return score + 1 + filenameBonus;
  }, 0);
}

/**
 * Searches the existing knowledge/ sources. Root-level files and every file in
 * knowledge/roles/ are indexed; this function never creates or writes folders.
 */
export async function searchKnowledge(query: string) {
  const terms = getTerms(query);
  if (terms.length === 0) {
    return "";
  }

  const documents = await getKnowledgeDocuments();
  const matches = documents
    .map((document) => ({
      document,
      score: scoreDocument(document, terms),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score;
      }

      // Prefer the role source when relevance is otherwise tied.
      return Number(b.document.isRole) - Number(a.document.isRole);
    })
    .slice(0, MAX_RESULTS);

  let remainingCharacters = MAX_CONTEXT_CHARS;
  const context = matches.flatMap(({ document }) => {
    if (remainingCharacters <= 0) {
      return [];
    }

    const source = `### ${document.path}\n${document.content}`;
    const sourceLength = Math.min(source.length, remainingCharacters);
    remainingCharacters -= sourceLength;
    return [source.slice(0, sourceLength)];
  });

  return context.join("\n\n");
}
