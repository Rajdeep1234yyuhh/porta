"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { allServices } from "../../data/services";

// The cart holds product (service) slugs. It lives in this browser only;
// "checkout" turns it into a WhatsApp or email inquiry.
const STORAGE_KEY = "ecom-cart";
const KNOWN = new Set(allServices.map((s) => s.slug));

type Cart = {
  items: string[];
  ready: boolean;
  has: (slug: string) => boolean;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<Cart | null>(null);

function readStored(): string[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === "string" && KNOWN.has(s)) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  // Read after mount so the server render and first client render match
  useEffect(() => {
    setItems(readStored());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage unavailable (private mode); the cart still works for this visit
    }
  }, [items, ready]);

  const add = useCallback((slug: string) => setItems((cur) => (cur.includes(slug) ? cur : [...cur, slug])), []);
  const remove = useCallback((slug: string) => setItems((cur) => cur.filter((s) => s !== slug)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, ready, has: (slug: string) => items.includes(slug), add, remove, clear }),
    [items, ready, add, remove, clear],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used inside CartProvider");
  return cart;
}
