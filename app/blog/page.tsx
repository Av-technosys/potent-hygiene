import BlogHeader from "@/app/components/common/BlogHeader";
import Footer from "@/app/components/common/Footer";
import BlogListClient from "./BlogListClient"; // Aapka client component
import { getBlogs } from "@/helper/blog/action";

export default async function BlogPage() {
  // Database se live blogs fetch kar rahe hain
  const allBlogs = await getBlogs(); 

  return (
    <div className="min-h-screen bg-[#FDFCF9]">
      <BlogHeader />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#333333] mb-4">
            Our Journal Hygiene Knowledge Hub
          </h1>
          <p className="text-black/50 max-w-2xl mx-auto">
           Learn, understand, and make healthier wellness choices
          </p>
        </div>

        {/* Aapka pura purana UI logic BlogListClient ke andar hai */}
        {/* Humne bas database wala data props mein bhej diya hai */}
        <BlogListClient initialBlogs={allBlogs} />
      </main>

      <Footer />
    </div>
  );
}