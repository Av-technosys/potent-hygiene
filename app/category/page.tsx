import { Navbar } from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import CategoryPageClient from "./CategoryPageClient";

export default function Page() {
  return (
    <div>
      <Navbar />

      <CategoryPageClient />

      <Footer />
    </div>
  );
}
