"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Search, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { DEPARTMENTS } from "../catalog";
import { useCart } from "./cart";

const NAV = [
  { href: "/ecom/categories", label: "All categories" },
  ...DEPARTMENTS.map((d) => ({ href: `/ecom/categories?department=${d.slug}`, label: d.name })),
  { href: "/ecom/products", label: "All products" },
  { href: "/ecom/seller", label: "About the seller" },
];

function SearchForm({ id, className }: { id: string; className: string }) {
  // A plain GET form, so search works before (and without) JavaScript
  return (
    <form action="/ecom/search" role="search" className={className}>
      <label htmlFor={id} className="sr-only">
        Search the store
      </label>
      <input
        id={id}
        name="q"
        type="search"
        placeholder="Search products, categories, tech…"
        className="h-11 w-full min-w-0 rounded-l-xl border border-r-0 border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-500"
      />
      <button type="submit" aria-label="Search" className="flex h-11 w-12 shrink-0 items-center justify-center rounded-r-xl bg-violet-600 text-white hover:bg-violet-700">
        <Search className="h-5 w-5" />
      </button>
    </form>
  );
}

export default function StoreHeader() {
  const cart = useCart();
  const pathname = usePathname();
  const count = cart.items.length;

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="bg-slate-900 px-4 py-2 text-center text-xs text-slate-200">
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 align-middle" aria-hidden="true" />
        Available for new projects · Replies usually within 24 hours · Delivering to clients worldwide
      </div>

      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 sm:gap-6 sm:px-6 lg:px-8">
        <Link href="/ecom" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
            <ShoppingBag className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-extrabold tracking-tight text-slate-900">Rajdeep Kotoky</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">Store</span>
          </span>
        </Link>

        <SearchForm id="store-search" className="hidden flex-1 md:flex" />

        <nav aria-label="Account" className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 lg:flex"
          >
            <ArrowLeft className="h-4 w-4" /> Portfolio
          </Link>
          <Link href="/ecom/seller" className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
            <User className="h-5 w-5" />
            <span className="hidden sm:inline">Seller</span>
          </Link>
          <Link
            href="/ecom/cart"
            className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
          >
            <span className="relative">
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-2.5 -top-2.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1 text-[11px] font-bold text-white ring-2 ring-white">
                  {count}
                </span>
              )}
            </span>
            <span className="hidden sm:inline">Cart</span>
          </Link>
        </nav>
      </div>

      <div className="px-4 pb-3 md:hidden">
        <SearchForm id="store-search-mobile" className="flex" />
      </div>

      <nav aria-label="Departments" className="border-t border-slate-200">
        <ul className="mx-auto flex w-full max-w-7xl gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
          {NAV.map((item) => {
            const active = !item.href.includes("?") && pathname === item.href;
            return (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  className={`block whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium ${
                    active ? "bg-violet-50 text-violet-700" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="shrink-0 lg:hidden">
            <Link href="/" className="block whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 hover:bg-slate-100">
              ← Back to portfolio
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
