"use client";

import Link from "next/link";
import { Check, MessageCircle, ShoppingCart } from "lucide-react";
import { useContact } from "../../context/ContactContext";
import { useCart } from "./cart";

export function AddToCartButton({ slug, size = "md" }: { slug: string; size?: "md" | "lg" }) {
  const cart = useCart();
  const pad = size === "lg" ? "px-6 py-3 text-base" : "px-4 py-2 text-sm";

  if (cart.has(slug)) {
    return (
      <Link
        href="/ecom/cart"
        className={`inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 font-semibold text-emerald-700 transition-colors hover:bg-emerald-100 ${pad}`}
      >
        <Check className="h-4 w-4" /> In cart · View cart
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={() => cart.add(slug)}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-white shadow-sm transition-opacity hover:opacity-90 ${pad}`}
    >
      <ShoppingCart className="h-4 w-4" /> Add to cart
    </button>
  );
}

export function BuyNowButton({ title }: { title: string }) {
  const contact = useContact();
  const text = `Hi Rajdeep, I'd like a quote for ${title}.`;
  return (
    <a
      href={`${contact.whatsappHref}?text=${encodeURIComponent(text)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
    >
      <MessageCircle className="h-4 w-4" /> Buy now on WhatsApp
    </a>
  );
}
