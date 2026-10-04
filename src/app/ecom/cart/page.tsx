import { pageMetadata } from "../../lib/seo";
import { Breadcrumbs, Container } from "../components/ui";
import CartView from "./CartView";

export const metadata = {
  ...pageMetadata({ title: "Cart | Store", description: "Your quote cart.", path: "/ecom/cart" }),
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <Container className="py-8">
      <Breadcrumbs items={[{ label: "Store", href: "/ecom" }, { label: "Cart" }]} />
      <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">Your cart</h1>
      <CartView />
    </Container>
  );
}
