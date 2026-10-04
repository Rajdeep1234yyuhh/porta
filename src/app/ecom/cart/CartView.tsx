"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, MessageCircle, ShoppingCart, Trash2 } from "lucide-react";
import { useContact } from "../../context/ContactContext";
import { getServiceBySlug, type ServiceData } from "../../data/services";
import { useCart } from "../components/cart";
import { ProductVisual } from "../components/visuals";

type Channel = "whatsapp" | "email";

function inquiryText(items: ServiceData[], name: string, replyTo: string, details: string) {
  const lines = ["Hi Rajdeep, I'd like a quote for:", ...items.map((s) => `• ${s.title}`), "", `Name: ${name}`];
  if (replyTo) lines.push(`Reply to: ${replyTo}`);
  if (details) lines.push(`Project details: ${details}`);
  lines.push("", "(Sent from your portfolio store)");
  return lines.join("\n");
}

export default function CartView() {
  const cart = useCart();
  const contact = useContact();
  const [sentVia, setSentVia] = useState<Channel | null>(null);
  const items = cart.items.map((slug) => getServiceBySlug(slug)).filter((s): s is ServiceData => Boolean(s));

  if (!cart.ready) {
    return <p className="mt-10 text-slate-500">Loading your cart…</p>;
  }

  if (items.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-slate-300 py-16 text-center">
        <ShoppingCart className="h-12 w-12 text-slate-300" />
        <p className="mt-4 text-lg font-semibold text-slate-900">Your cart is empty</p>
        <p className="mt-1 text-sm text-slate-500">Add a product or two and check out to get a quote.</p>
        <Link href="/ecom/products" className="mt-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white hover:opacity-90">
          Shop products
        </Link>
      </div>
    );
  }

  const checkout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel: Channel = submitter?.value === "email" ? "email" : "whatsapp";
    const text = inquiryText(
      items,
      String(form.get("name") ?? "").trim(),
      String(form.get("replyTo") ?? "").trim(),
      String(form.get("details") ?? "").trim(),
    );
    if (channel === "whatsapp") {
      window.open(`${contact.whatsappHref}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    } else {
      const subject = `Quote request: ${items.map((s) => s.title).join(", ")}`;
      window.location.href = `${contact.mailtoHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    }
    setSentVia(channel);
  };

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_24rem]">
      <section aria-label="Cart items">
        <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200">
          {items.map((service) => (
            <li key={service.slug} className="flex gap-4 p-4">
              <Link href={`/ecom/products/${service.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                <ProductVisual service={service} />
              </Link>
              <div className="min-w-0 flex-1">
                <Link href={`/ecom/products/${service.slug}`} className="font-semibold text-slate-900 hover:text-violet-700">
                  {service.title}
                </Link>
                <p className="mt-0.5 line-clamp-2 text-sm text-slate-600">{service.shortDescription}</p>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-slate-900">Price on request</span>
                  <button
                    type="button"
                    onClick={() => cart.remove(service.slug)}
                    className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Link href="/ecom/products" className="mt-4 inline-block text-sm font-semibold text-violet-700 hover:underline">
          ← Continue shopping
        </Link>
      </section>

      <aside aria-label="Checkout" className="h-fit rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-lg font-bold text-slate-900">Order summary</h2>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-600">Items</dt>
            <dd className="font-medium text-slate-900">{items.length}</dd>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-2">
            <dt className="font-semibold text-slate-900">Total</dt>
            <dd className="font-bold text-slate-900">Quote on request</dd>
          </div>
        </dl>

        {sentVia ? (
          <div role="status" className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
            <p className="font-semibold">Your inquiry is ready in {sentVia === "whatsapp" ? "WhatsApp" : "your email app"}.</p>
            <p className="mt-1">Send the message there to place your order — Rajdeep usually replies within 24 hours.</p>
            <div className="mt-3 flex gap-3">
              <button type="button" onClick={() => setSentVia(null)} className="font-semibold text-emerald-800 hover:underline">
                Back to checkout
              </button>
              <button type="button" onClick={cart.clear} className="font-semibold text-emerald-800 hover:underline">
                Clear cart
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={checkout} className="mt-5 space-y-3">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Your name</span>
              <input name="name" required autoComplete="name" className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Email or phone (optional)</span>
              <input name="replyTo" autoComplete="email" className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Project details (optional)</span>
              <textarea name="details" rows={4} placeholder="What are you building? Any deadline or budget?" className="mt-1 block w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100" />
            </label>
            <button type="submit" value="whatsapp" className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white hover:opacity-90">
              <MessageCircle className="h-4 w-4" /> Check out on WhatsApp
            </button>
            <button type="submit" value="email" className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100">
              <Mail className="h-4 w-4" /> Check out by email
            </button>
            <p className="text-xs text-slate-500">Checkout opens a pre-filled message to Rajdeep. Nothing is charged here.</p>
          </form>
        )}
      </aside>
    </div>
  );
}
