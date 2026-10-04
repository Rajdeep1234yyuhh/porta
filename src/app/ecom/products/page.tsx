import { pageMetadata } from "../../lib/seo";
import { allServices } from "../catalog";
import { Breadcrumbs, Container, ProductCard } from "../components/ui";

export const metadata = pageMetadata({
  title: "All Products | Store",
  description:
    "Custom SaaS, web applications, Shopify & e-commerce, websites, AI/ML solutions and technical problem-solving — add any to your cart for a quote.",
  path: "/ecom/products",
});

export default function ProductsPage() {
  return (
    <Container className="py-8">
      <Breadcrumbs items={[{ label: "Store", href: "/ecom" }, { label: "Products" }]} />
      <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">All products</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Every service is built to order. Add the ones you need to your cart and check out to get a quote.
      </p>
      <p className="mt-6 border-b border-slate-200 pb-3 text-sm text-slate-600">
        <strong className="text-slate-900">{allServices.length}</strong> products
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {allServices.map((service) => (
          <ProductCard key={service.slug} service={service} />
        ))}
      </div>
    </Container>
  );
}
