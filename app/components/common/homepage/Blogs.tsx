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
    image: "/dummyLady.png", 
  },
  {
    id: 2,
    title: "Eco-Friendly Period Care: Why It Matters More Than You Think",
    excerpt: "Discover the environmental impact of traditional products and how to switch to sustainable alternatives.",
    date: "Feb 02, 2026",
    category: "Organic",
    image: "/dummyLady.png",
  },
  {
    id: 3,
    title: "Mental Health & Hormones: Navigating the Emotional Rollercoaster",
    excerpt: "Understanding the link between your hormones and mood during different times of the month.",
    date: "Feb 20, 2026",
    category: "Health",
    image: "/dummyLady.png",
  },
];

export function BlogSection() {
  return (
    <section className="py-16 md:py-16 md:bg-[#F8F6F1]">
      <div className="container mx-auto px-6 md:px-16">
        
        {/* Header - Centered for both views */}
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <h2 className="md:text-4xl text-3xl font-serif font-bold text-[#333333]">
            Hygiene & Wellness Hub
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-black/50 leading-relaxed">
            Tips, guides, and insights for your menstrual health journey.
          </p>
        </div>

        {/* Blog Grid: 1 col on mobile, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {articles.map((article) => (
            <article key={article.id} className="group cursor-pointer flex flex-col">
              
              {/* Image Container with Hover Effect */}
              <div className="relative aspect-[16/11] md:aspect-[16/10] w-full overflow-hidden rounded-[24px] md:rounded-[32px] mb-5 shadow-sm">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Category Badge - Adjusted for mobile */}
                <div className="absolute left-4 top-4 md:left-6 md:top-6">
                  <span className="rounded-full bg-[#1A8D91] px-3 md:px-4 py-1.5 text-[9px] md:text-[10px] font-bold text-white uppercase tracking-wider shadow-lg">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex items-center gap-2 mb-3 text-gray-400">
                <Calendar className="h-4 w-4 text-[#1A8D91]/60" />
                <span className="text-xs font-medium">{article.date}</span>
              </div>

              {/* Title & Excerpt */}
              <div className="space-y-3">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight group-hover:text-[#1A8D91] transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button - Responsive width */}
        <div className="pt-12 md:pt-16 flex justify-center">
          <Button 
            variant="outline" 
            className="w-full md:w-auto rounded-full border-2 border-[#1A8D91] px-12 py-7 text-sm font-bold text-[#1A8D91] hover:bg-[#1A8D91] hover:text-white transition-all active:scale-95 shadow-sm"
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
}