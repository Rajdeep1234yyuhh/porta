"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Contact } from "../data/site";

// The root layout loads the contact details (editable from /admin) and hands
// them to client components through this context
const ContactContext = createContext<Contact | null>(null);

export function ContactProvider({ contact, children }: { contact: Contact; children: ReactNode }) {
  return <ContactContext.Provider value={contact}>{children}</ContactContext.Provider>;
}

export function useContact() {
  const contact = useContext(ContactContext);
  if (!contact) throw new Error("useContact must be used inside ContactProvider");
  return contact;
}
