import BlogHeader from "@/app/components/common/BlogHeader";
import Footer from "@/app/components/common/Footer";
import { blogs } from "@/app/data/blogs";
import Image from "next/image";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Blog not found
      </div>
    );
  }

  return (
    <>
      <BlogHeader />

      {/* Top Title Section */}
      <div className="bg-white py-6 text-center relative">
        {/* Back Button - Absolute Left */}
        <Link
          href="/blog"
          className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-black"
        >
          <IconArrowLeft size={22} />
        </Link>

        <h1 className="text-2xl md:text-3xl font-semibold">
          {blog.title}
        </h1>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-white py-10 px-4">
        <div className="max-w-3xl mx-auto bg-[#f8f6f1] rounded-2xl shadow-sm p-6 md:p-8 space-y-6">

          
          {/* Author Section */}
<div className="flex items-center gap-3 text-sm text-neutral-600">
  <Avatar>
    <AvatarImage src="/author.jpg" alt={blog.author} />
    <AvatarFallback>
      {blog.author.charAt(0)}
    </AvatarFallback>
  </Avatar>

  <div className="flex items-center gap-2 flex-wrap">
    <span className="font-medium text-neutral-800">
      {blog.author}
    </span>

    <span className="text-neutral-400">|</span>

    <span>{blog.date}</span>

    <span className="text-neutral-400">|</span>

    <span>{blog.readTime}</span>
  </div>
</div>

          {/* Image */}
          <Image
            src={blog.image}
            alt={blog.title}
            width={800}
            height={400}
            className="rounded-xl w-full object-cover"
          />

          {/* Content */}
          <div className="whitespace-pre-line text-neutral-700 leading-relaxed">
            {blog.content}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}