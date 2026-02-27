// app/page.tsx
import { Navbar } from "@/app/components/common/Navbar";
import { Hero } from "@/app/components/common/homepage/HeroSection";
import { BrandAccordion } from "@/app/components/common/homepage/Brand";
import { CategoryGrid } from "@/app/components/common/homepage/CategorySection";
import { BestsellingProducts } from "@/app/components/common/homepage/BestSellingProduct";
import { OurStory } from "@/app/components/common/homepage/OurStory";
import { WhyChooseUs } from "@/app/components/common/homepage/WhyChooseUs";
import { Testimonials } from "@/app/components/common/homepage/Reviews";
import { InstagramFeed } from "@/app/components/common/homepage/InstaFeed";
import { BlogSection } from "@/app/components/common/homepage/Blogs";
import { Newsletter } from "@/app/components/common/homepage/NewsLetter";
import { Footer } from "@/app/components/common/Footer";

export default function Home() {
  return (
    <main className="min-h-screen   bg-white">
      <Navbar />

      <Hero />

      <BrandAccordion />

      <CategoryGrid />

      <BestsellingProducts />

      <OurStory />

      <WhyChooseUs />

      <Testimonials />

      <InstagramFeed />

      <BlogSection />

      <Newsletter />

      <Footer />
    </main>
  );
}
