import { Navbar } from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import CategoryPageClient from "./CategoryPageClient";
import { getCategories } from "@/helper/category/action";

export default async function Page() {
  // Database se live categories fetch kar rahe hain
  const allCategories = await getCategories(); 

  return (
    <div>
      <Navbar />

      {/* Categories data ko props ke zariye bhej rahe hain */}
      <CategoryPageClient initialCategories={allCategories} />

      <Footer />
    </div>
  );
}