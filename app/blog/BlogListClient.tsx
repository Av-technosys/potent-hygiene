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

export default function BlogListClient({ initialBlogs }: { initialBlogs: any[] }) {
  const [activeCategory, setActiveCategory] = useState("All Articles");

  // Filter based on 'blogCategory' field from schema
  const filteredBlogs = activeCategory === "All Articles"
    ? initialBlogs
    : initialBlogs.filter((b) => b.blogCategory === activeCategory);

  const firstBlog = filteredBlogs[0];
  const secondBlog = filteredBlogs[1];
  const remainingBlogs = filteredBlogs.slice(2);

  // Empty state check
  if (!initialBlogs || initialBlogs.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-2xl bg-gray-50 text-gray-400">
        No blogs available yet. Start by adding one from admin!
      </div>
    );
  }

  return (
    <>
      {/* Category Tabs */}
      <div className="flex gap-3 overflow-x-auto whitespace-nowrap no-scrollbar select-none mb-10 sm:flex-wrap sm:justify-center">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setActiveCategory(item)}
            className={`shrink-0 px-5 py-2 rounded-full border text-sm transition ${
              activeCategory === item
                ? "bg-[#168BA0] text-white border-[#168BA0]"
                : "bg-white text-[#168BA0] border-[#168BA0] hover:bg-teal-50"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Featured Grid (Alignment Fixed) */}
      {filteredBlogs.length > 0 ? (
        <>
          {firstBlog && (
            <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-6xl mx-auto">
              {/* Big Featured Card */}
              <div className="md:col-span-2 bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition">
                <Image
                  src={firstBlog.image}
                  alt={firstBlog.title}
                  width={900}
                  height={500}
                  className="w-full h-72 object-cover"
                  unoptimized
                />
                <div className="p-6 space-y-4">
                  <h2 className="text-lg md:text-xl font-semibold">{firstBlog.title}</h2>
                  <p className="text-neutral-600 text-sm line-clamp-2">{firstBlog.metaDescription}</p>
                  <div className="flex justify-between text-sm text-neutral-500 pt-2 border-t">
                    <span>{firstBlog.date}</span>
                    <Link href={`/blog/${firstBlog.slug}`} className="text-[#168BA0] font-medium flex items-center gap-2">
                      Read More <IconArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Side Small Card */}
              {secondBlog && (
                <div className="bg-white  rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition">
                  <Image
                    src={secondBlog.image || "/placeholder.jpg"}
                    alt={secondBlog.title}
                    width={500}
                    height={500}
                    className="w-full h-72 object-cover"
                    unoptimized
                  />
                  <div className="p-6 space-y-4">
                    <h2 className="text-base font-semibold line-clamp-2">{secondBlog.title}</h2>
                    <div className="flex justify-between text-sm text-neutral-500 pt-2 border-t">
                      <span>{secondBlog.date}</span>
                      <Link href={`/blog/${secondBlog.slug}`} className="text-[#168BA0] font-medium">Read More →</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Remaining Grid */}
          <div className="grid md:grid-cols-3 gap-6  max-w-6xl mx-auto">
            {remainingBlogs.map((blog) => (
              <div key={blog.slug} className="bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition">
                <Image
                  src={blog.image || "/placeholder.jpg"}
                  alt={blog.title}
                  width={500}
                  height={400}
                  className="w-full h-60 object-cover"
                  unoptimized
                />
                <div className="p-5 space-y-3">
                  <h2 className="text-sm md:text-base font-semibold line-clamp-2">{blog.title}</h2>
                  <div className="flex justify-between text-sm text-neutral-500 pt-2 border-t">
                    <span>{blog.date}</span>
                    <Link href={`/blog/${blog.slug}`} className="text-[#168BA0] font-medium">Read More →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-20 text-neutral-500">No articles found in this category.</div>
      )}
    </>
  );
}