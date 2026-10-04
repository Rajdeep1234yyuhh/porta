"use client";

import { Download, Mail, MessageCircle, Phone } from "lucide-react";
import { useContact } from "../../context/ContactContext";

export default function SellerContact() {
  const contact = useContact();
  const button = "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold";
  const social = [
    { href: contact.github, label: "GitHub", handle: contact.githubUser },
    { href: contact.linkedin, label: "LinkedIn", handle: contact.linkedinUser },
    { href: contact.instagram, label: "Instagram", handle: `@${contact.instagramUser}` },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className={`${button} bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90`}>
          <MessageCircle className="h-4 w-4" /> Message on WhatsApp
        </a>
        <a href={contact.telHref} className={`${button} border border-slate-300 text-slate-800 hover:bg-slate-50`}>
          <Phone className="h-4 w-4" /> {contact.phoneDisplay}
        </a>
        <a href={contact.mailtoHref} className={`${button} border border-slate-300 text-slate-800 hover:bg-slate-50`}>
          <Mail className="h-4 w-4" /> Email
        </a>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={`${button} border border-slate-300 text-slate-800 hover:bg-slate-50`}>
          <Download className="h-4 w-4" /> Résumé (PDF)
        </a>
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
        {social.map((s) => (
          <li key={s.label}>
            <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-violet-700 hover:underline">
              <span className="font-semibold text-slate-800">{s.label}</span> {s.handle}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
