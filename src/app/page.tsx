import HomeClient from "./components/HomeClient";
import { pageMetadata } from "./lib/seo";

export const metadata = pageMetadata({
  title: "Rajdeep Kotoky | Freelance Full-Stack Developer & AI Engineer",
  description:
    "Freelance full-stack developer & AI engineer building SaaS products, web apps, Shopify stores and AI chatbots with Next.js, React & Python. 28 projects shipped.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return <HomeClient />;
}
