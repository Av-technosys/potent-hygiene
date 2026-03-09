// import { getBlogs } from "@/helper/blog/action"; // Aapka final action
import Footer from "../components/common/Footer";
import { Navbar } from "../components/common/Navbar";
import BlogListClient from "./BlogListClient"; // Niche wala component

export default async function BlogPage() {
  // Database se data fetch ho raha hai
  // const allBlogs = await getBlogs(); 

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              Hygiene Knowledge Hub
            </h1>
            <p className="text-sm mt-3">
              Learn, understand, and make healthier wellness choices
            </p>
          </div>
          
          {/* Filtering ka logic is client component mein pass kar diya */}
          {/* <BlogListClient initialBlogs={allBlogs} /> */}

        </div>
      </div>
      <Footer />
    </>
  );
}