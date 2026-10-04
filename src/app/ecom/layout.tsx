import { CartProvider } from "./components/cart";
import StoreFooter from "./components/StoreFooter";
import StoreHeader from "./components/StoreHeader";

// The portfolio presented as an online store; see catalog.ts for how
// projects and services map to categories and products.
export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="min-h-dvh bg-white text-slate-900" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
        <StoreHeader />
        <main>{children}</main>
        <StoreFooter />
      </div>
    </CartProvider>
  );
}
