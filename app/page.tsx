import { Navbar } from "@/app/components/common/Navbar";
import { Hero } from "@/app/components/common/homepage/HeroSection";
import { BrandAccordion } from "@/app/components/common/homepage/Brand";
import { CategoryGrid } from "@/app/components/common/homepage/CategorySection";
import BestsellingProducts from "@/app/components/common/homepage/BestSellingProduct";
import { OurStory } from "@/app/components/common/homepage/OurStory";
import { WhyChooseUs } from "@/app/components/common/homepage/WhyChooseUs";
import { Testimonials } from "@/app/components/common/homepage/Reviews";
import { InstagramFeed } from "@/app/components/common/homepage/InstaFeed";
import { BlogSection } from "@/app/components/common/homepage/Blogs";
import { Newsletter } from "@/app/components/common/homepage/NewsLetter";

import StoryTruth from "./components/common/homepage/StoryTruth";
import AboutStory from "./components/common/homepage/AboutStory";
import Footer from "./components/common/Footer";

import Faq from "./components/common/homepage/Faq";
import { ProductCategories } from "./components/common/homepage/ProductCategories";
import { WhatsAppWidget } from "./components/common/homepage/WhatsAppWidget";

export default function Home() {
  return (
    <main className="min-h-screen   md:bg-white bg-linear-to-b from-[#E2F4F7] to-[#FFFFFF]">
      <Navbar />
      <Hero />
      <BrandAccordion />
      <CategoryGrid />
      <StoryTruth />
      <BestsellingProducts />
      <OurStory />
      <WhyChooseUs />
      <AboutStory />
      <InstagramFeed />
      <Testimonials />
      <ProductCategories />
      <Newsletter />
      <BlogSection />
      <Faq />
      <WhatsAppWidget />
      <Footer />
    </main>
  );
}
