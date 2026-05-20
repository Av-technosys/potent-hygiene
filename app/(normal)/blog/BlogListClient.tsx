"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconArrowRight } from "@tabler/icons-react";

const categories = [
  "All Articles",
  "Period care",
  "Sustainability",
  "Product Knowledge",
  "Hygiene Basics",
  "Wellness Tips",
];

export default function BlogListClient({
  initialBlogs,
}: {
  initialBlogs: any[];
}) {
  const [activeCategory, setActiveCategory] = useState("All Articles");

  const filteredBlogs =
    activeCategory === "All Articles"
      ? initialBlogs
      : initialBlogs.filter((b) => b.blogCategory === activeCategory);

  const getPreviewText = (html: string, limit: number) => {
    if (!html) return "";
    const cleanText = html.replace(/<\/?[^>]+(>|$)/g, "");
    return cleanText.length > limit
      ? cleanText.substring(0, limit) + "..."
      : cleanText;
  };

  if (!initialBlogs || initialBlogs.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-2xl bg-gray-50 text-gray-400">
        No blogs available yet.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex gap-3 overflow-x-auto whitespace-nowrap no-scrollbar select-none mb-10 sm:flex-wrap sm:justify-center">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setActiveCategory(item)}
            className={`shrink-0 px-5 py-2 rounded-full border text-sm transition font-medium ${activeCategory === item
              ? "bg-[#168BA0] text-white border-[#168BA0]"
              : "bg-white text-[#168BA0] border-[#168BA0] hover:bg-teal-50"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredBlogs.map((blog, index) => {
            const isFeatured = index === 0;

            return (
              <div
                key={blog.slug || index}
                className={`rounded-2xl h-full shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col ${isFeatured ? "md:col-span-2" : "col-span-1"
                  }`}
              >
                {/* Image Wrapper - Parent must be relative and have a height */}
                <div
                  className={`relative w-full overflow-hidden rounded-t-2xl bg-neutral-100 ${isFeatured ? "h-72 md:h-[300px]" : "h-auto"
                    }`}
                >
                  <Image
                    src={blog.image || "/placeholder.jpg"}
                    alt={blog.title}
                    width={600}
                    height={400}
                    className="object-contain w-full h-auto transition-transform duration-500 hover:scale-105"
                    priority={isFeatured} // Featured card ko fast load karne ke liye
                    unoptimized
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h2
                    className={`font-bold text-gray-900 leading-tight mb-3 ${isFeatured
                      ? "text-2xl md:text-3xl"
                      : "text-lg line-clamp-2"
                      }`}
                  >
                    {blog.title}
                  </h2>

                  <p className="text-neutral-500 text-sm leading-relaxed mb-6">
                    {isFeatured
                      ? getPreviewText(blog.data || blog.metaDescription, 180)
                      : getPreviewText(blog.data || blog.metaDescription, 90)}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center text-xs font-medium text-neutral-400">
                    <span>{blog.date}</span>
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="text-[#168BA0] font-bold flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Read More <IconArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 text-neutral-500 font-medium">
          No articles found in this category.
        </div>
      )}
    </div>
  );
}
