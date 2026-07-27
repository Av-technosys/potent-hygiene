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

import StoryTruth from "../components/common/homepage/StoryTruth";
import AboutStory from "../components/common/homepage/AboutStory";
import { ProductCategories } from "../components/common/homepage/ProductCategories";
import { WhatsAppWidget } from "../components/common/homepage/WhatsAppWidget";

export default function Home() {
  
  return (
    <main className="min-h-screen   md:bg-white bg-linear-to-b from-[#E2F4F7] to-[#FFFFFF]">

      <Hero />
      <BrandAccordion />
      <CategoryGrid />
      <StoryTruth key={STORY_CONTENT[0].title} {...STORY_CONTENT[0]} />
      <BestsellingProducts />
      <OurStory key={STORY_CONTENT[0].title} {...STORY_CONTENT[1]} />
      <WhyChooseUs />
      <AboutStory />
      <InstagramFeed
        title="Join Our Community"
        username="@potenthygiene"
        gradientFrom="#168BA0"
        gradientTo="#AFE7F1"
        textColor="#FFFFFF"
        buttonColor="#1A8D91"
      />

      <Testimonials />
      <ProductCategories />
      <Newsletter />
      <BlogSection />
      <WhatsAppWidget />
    </main>
  );
}


const STORY_CONTENT = [
  {
    component: "StoryTruth",
    badgeText: "Own Your Cycle",
    title: "The",
    highlight: "Nakd",
    image: "/thestory.png",
    primaryColor: "#1A8D91",
    gradientFrom: "#168BA0",
    gradientTo: "#AFE7F1",
    bgAccent: "#E6F4F6",
    paragraphs: [
      "Good hygiene is not just about routine...",
      "Our goal is to make hygiene conversations normal...",
      "We encourage awareness and self-care...",
    ],
  },
  {
    component: "OurStory",
    badgeText: "Our Story",
    title: "Built for Women,",
    highlight: "By Women",
    image: "/ourStory.png",
    primaryColor: "#1A8D91",
    gradientFrom: "#168BA0",
    gradientTo: "#AFE7F1",
    bgAccent: "#E6F4F6",
    tickerText: "Potent Hygiene - Where Your Wellness Comes First",
    paragraphs: [
      `Ovy was created for women who seek gentle, premium care. Infused with natural lavender essence and crafted with the softest materials, every product is designed to pamper and protect.`,
      `Today, we are proud to offer a complete range of organic, dermatologically tested products that prioritize your health and the planet. Our journey is just beginning, and we are grateful to have you with us.`,
    ],
  },
];