import Footer from "../components/footer/footer";
import Navigation from "../components/header/Navigation";
import Landing from "../components/landing/landing";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function Home() {
  return (
      <div className="isolate bg-white">
        <Navigation />
        <Landing></Landing>
        <Footer />
      </div>
  );
}
