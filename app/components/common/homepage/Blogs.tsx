// components/sections/blog-section.tsx
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const articles = [
  {
    id: 1,
    title: "Understanding Your Menstrual Cycle: A Complete Guide",
    excerpt: "Learn about the four phases of your menstrual cycle and how to work with your body for optimal wellness.",
    date: "Jan 15, 2026",
    category: "Wellness",
    image: "/dummyLady.png", // Replace with your exported image
  },
  {
    id: 2,
    title: "Understanding Your Menstrual Cycle: A Complete Guide",
    excerpt: "Learn about the four phases of your menstrual cycle and how to work with your body for optimal wellness.",
    date: "Jan 15, 2026",
    category: "Wellness",
    image: "/dummyLady.png",
  },
  {
    id: 3,
    title: "Understanding Your Menstrual Cycle: A Complete Guide",
    excerpt: "Learn about the four phases of your menstrual cycle and how to work with your body for optimal wellness.",
    date: "Jan 15, 2026",
    category: "Wellness",
    image: "/dummyLady.png",
  },
];

export function BlogSection() {
  return (
    <section className="py-10 bg-[#FDFCF9]">
      <div className="container mx-auto px-16">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-serif font-bold text-gray-900 lg:text-5xl">
            Hygiene & Wellness Hub
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-gray-500 leading-relaxed">
            Tips, guides, and insights for your menstrual health journey.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((article) => (
            <article key={article.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[32px] mb-6">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Category Badge */}
                <div className="absolute left-6 top-6">
                  <span className="rounded-full bg-[#1A8D91] px-4 py-1.5 text-[10px] font-bold text-white uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex items-center gap-2 mb-3 text-gray-400">
                <Calendar className="h-4 w-4" />
                <span className="text-xs font-medium">{article.date}</span>
              </div>

              {/* Title & Excerpt */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#1A8D91] transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="pt-16 flex justify-center">
          <Button 
            variant="outline" 
            className="rounded-full border-[#1A8D91] px-12 py-7 text-sm font-bold text-[#1A8D91] hover:bg-[#D1E9EC] transition-all"
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
}