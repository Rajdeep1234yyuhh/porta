import ServicesClient from "../components/ServicesClient";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "../lib/seo";

export const metadata = pageMetadata({
  title: "Freelance Development Services",
  description:
    "Hire Rajdeep Kotoky for custom SaaS, web applications, Shopify & e-commerce stores, websites, AI chatbots and technical problem-solving. Fast delivery.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
      <ServicesClient />
    </>
  );
}
