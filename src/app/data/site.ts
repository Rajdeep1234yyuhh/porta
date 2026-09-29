// Single source of truth for the site URL and public contact details.

// Vercel serves the www host (the bare domain and the old *.vercel.app
// address redirect to it), so canonical URLs must use it too.
export const SITE_URL = "https://www.rajdeepkotoky.com";

/** Contact details as edited in /admin; everything else is derived from them. */
export type ContactDetails = {
  email: string;
  /** International format, e.g. "+91 8638752315" */
  phone: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  instagram: string;
};

// Shown until details are saved from /admin, and whenever no Blob store is
// connected (e.g. local development)
export const DEFAULT_CONTACT: ContactDetails = {
  email: "kotoky10@gmail.com",
  phone: "+91 8638752315",
  whatsapp: "+91 8638752315",
  github: "https://github.com/Rajdeep1234yyuhh",
  linkedin: "https://www.linkedin.com/in/rajdeep-kotoky-2273561a0/",
  instagram: "https://www.instagram.com/radioactive_gigs/",
};

const digits = (phone: string) => phone.replace(/\D/g, "");
const profileHandle = (url: string) => new URL(url).pathname.split("/").filter(Boolean).at(-1) ?? "";

// Links must use the international number: wa.me and tel: links without the
// country code resolve to a different country.
export function buildContact(details: ContactDetails) {
  const phoneE164 = `+${digits(details.phone)}`;
  return {
    email: details.email,
    phoneE164,
    phoneDisplay: details.phone,
    whatsappDisplay: details.whatsapp,
    mailtoHref: `mailto:${details.email}`,
    telHref: `tel:${phoneE164}`,
    whatsappHref: `https://wa.me/${digits(details.whatsapp)}`,
    github: details.github,
    githubUser: profileHandle(details.github),
    linkedin: details.linkedin,
    linkedinUser: profileHandle(details.linkedin),
    instagram: details.instagram,
    instagramUser: profileHandle(details.instagram),
  };
}

export type Contact = ReturnType<typeof buildContact>;
