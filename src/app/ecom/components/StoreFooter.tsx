"use client";

import Link from "next/link";
import { useContact } from "../../context/ContactContext";
import { DEPARTMENTS } from "../catalog";

export default function StoreFooter() {
  const contact = useContact();
  const columns = [
    {
      title: "Shop",
      links: [
        ...DEPARTMENTS.map((d) => ({ href: `/ecom/categories?department=${d.slug}`, label: d.name })),
        { href: "/ecom/products", label: "All products" },
      ],
    },
    {
      title: "Customer service",
      links: [
        { href: contact.whatsappHref, label: `WhatsApp ${contact.whatsappDisplay}`, external: true },
        { href: contact.telHref, label: `Call ${contact.phoneDisplay}` },
        { href: contact.mailtoHref, label: contact.email },
        { href: "/ecom/cart", label: "Cart & checkout" },
      ],
    },
    {
      title: "About the seller",
      links: [
        { href: "/ecom/seller", label: "Seller profile" },
        { href: "/resume.pdf", label: "Résumé (PDF)", external: true },
        { href: contact.github, label: "GitHub", external: true },
        { href: contact.linkedin, label: "LinkedIn", external: true },
        { href: contact.instagram, label: "Instagram", external: true },
      ],
    },
    {
      title: "Other views",
      links: [
        { href: "/", label: "Portfolio" },
        { href: "/zoom", label: "3D Portfolio" },
        { href: "/cube", label: "3D Cube" },
        { href: "/terminal", label: "Terminal" },
      ],
    },
  ];

  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="text-sm font-bold text-slate-900">{col.title}</h2>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  {"external" in link && link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 [overflow-wrap:anywhere] hover:text-violet-700 hover:underline">
                      {link.label}
                    </a>
                  ) : link.href.startsWith("/") ? (
                    <Link href={link.href} className="text-sm text-slate-600 hover:text-violet-700 hover:underline">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-sm text-slate-600 [overflow-wrap:anywhere] hover:text-violet-700 hover:underline">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200">
        <p className="mx-auto w-full max-w-7xl px-4 py-5 text-xs text-slate-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Rajdeep Kotoky. This store is a way to browse my portfolio — checkout sends me an inquiry; nothing
          is charged here.
        </p>
      </div>
    </footer>
  );
}
