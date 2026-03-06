"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/app/data/blogs";

import Footer from "../components/common/Footer";
import { IconArrowRight } from "@tabler/icons-react";
import { Navbar } from "../components/common/Navbar";

const categories = [
  "All Articles",
  "Period care",
  "Sustainability",
  "Product Knowledge",
  "Hygiene Basics",
  "Wellness Tips",
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All Articles");

  const filteredBlogs =
    activeCategory === "All Articles"
      ? blogs
      : blogs.filter((b) => b.category === activeCategory);

  const firstBlog = filteredBlogs[0];
  const secondBlog = filteredBlogs[1];
  const remainingBlogs = filteredBlogs.slice(2);

  return (
    <>
      <Navbar />

      <div className="bg-white min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4">

          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              Hygiene Knowledge Hub
            </h1>
            <p className="text-sm mt-3">
              Learn, understand, and make healthier wellness choices
            </p>
          </div>

          {/* Filter Pills — Mobile single line x-scroll */}
          <div className="flex overflow-x-auto whitespace-nowrap gap-3 mb-10 sm:flex-wrap sm:justify-center">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setActiveCategory(item)}
                className={`shrink-0 px-5 py-2 rounded-full border text-sm transition ${
                  activeCategory === item
                    ? "bg-[#168ba0] text-white border-[#168ba0]"
                    : "bg-white text-[#168ba0] border-[#168ba0]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Top Section */}
          {firstBlog && (
            <div className="grid md:grid-cols-3 gap-6 mb-10">

              <div className="md:col-span-2 bg-white rounded-xl border shadow-sm overflow-hidden">
                <Image
                  src={firstBlog.image}
                  alt={firstBlog.title}
                  width={900}
                  height={500}
                  className="w-full h-72 object-cover"
                />

                <div className="p-6 space-y-4">
                  <h2 className="text-lg md:text-xl font-semibold">
                    {firstBlog.title}
                  </h2>

                  <p className="text-neutral-600 text-sm">
                    {firstBlog.description}
                  </p>

                  <div className="flex justify-between text-sm text-neutral-500 pt-2">
                    <span>{firstBlog.date}</span>
                    <Link
                      href={`/blog/${firstBlog.slug}`}
                      className="text-teal-600 font-medium flex items-center gap-2"
                    >
                      Read More
                      <IconArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {secondBlog && (
                <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                  <Image
                    src={secondBlog.image}
                    alt={secondBlog.title}
                    width={500}
                    height={500}
                    className="w-full h-72 object-cover"
                  />

                  <div className="p-6 space-y-4">
                    <h2 className="text-base font-semibold">
                      {secondBlog.title}
                    </h2>

                    <p className="text-neutral-600 text-sm">
                      {secondBlog.description}
                    </p>

                    <div className="flex justify-between text-sm text-neutral-500 pt-2">
                      <span>{secondBlog.date}</span>
                      <Link
                        href={`/blog/${secondBlog.slug}`}
                        className="text-teal-600 font-medium"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Bottom Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {remainingBlogs.map((blog) => (
              <div
                key={blog.slug}
                className="bg-white rounded-xl border shadow-sm overflow-hidden"
              >
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={500}
                  height={400}
                  className="w-full h-60 object-cover"
                />

                <div className="p-5 space-y-3">
                  <h2 className="text-sm md:text-base font-semibold">
                    {blog.title}
                  </h2>

                  <p className="text-neutral-600 text-sm line-clamp-2">
                    {blog.description}
                  </p>

                  <div className="flex justify-between text-sm text-neutral-500 pt-2">
                    <span>{blog.date}</span>
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="text-teal-600 font-medium"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}