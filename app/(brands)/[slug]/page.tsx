import BestsellingProducts from "@/app/components/common/homepage/BestSellingProduct";
import { BrandHero } from "@/app/components/common/homepage/brands/BrandsHero";
import { BrandStats } from "@/app/components/common/homepage/brands/BrandStats";
import { BrandWhyChoose } from "@/app/components/common/homepage/brands/BrandWhyChoose";
import { CategoryGrid } from "@/app/components/common/homepage/CategorySection";
import { OurStory } from "@/app/components/common/homepage/OurStory";
import StoryTruth from "@/app/components/common/homepage/StoryTruth";
import type { ComponentProps } from "react";
import { brandDataMap } from "@/const/globalconst";
import { notFound } from "next/navigation";
import { InstagramFeed } from "@/app/components/common/homepage/InstaFeed";
import { Testimonials } from "@/app/components/common/homepage/Reviews";
import { ProductCategories } from "@/app/components/common/homepage/ProductCategories";
import { Newsletter } from "@/app/components/common/homepage/NewsLetter";
import { BlogSection } from "@/app/components/common/homepage/Blogs";
import BrandBestSelling from "@/app/components/common/homepage/brands/brandBestSelling";
import BrandNewArrival from "@/app/components/common/homepage/brands/brandNewArrival";

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = brandDataMap[slug as keyof typeof brandDataMap];

  if (!data) return notFound();

  return (
    <main style={{ backgroundColor: data["bg-color"] }}>
      <BrandHero {...data.hero} />

      {data.sections.map((section, i) => {
        switch (section.type) {
          case "categories":
            return <CategoryGrid key={i} {...section.props} slug={slug} />;

          case "story":
            return <StoryTruth key={i} {...section.props} />;

          case "products":
            // return <BestsellingProducts key={i} {...section.props} brand={true} />;
            return <BrandBestSelling key={i} slug={slug} brand={true} buttonColor={"#168BA0"} />;
          case "ourStory":
            return <OurStory key={i} {...section.props} />;
          case "newArrivals":
            return <BrandNewArrival key={i} slug={slug} brand={true} buttonColor={"#168BA0"} />;
          case "stats":
            return (
              <BrandStats
                key={i}
                {...(section.props as ComponentProps<typeof BrandStats>)}
              />
            );

          case "brandWhy":
            return <BrandWhyChoose key={i} {...section.props} />;

          case "instagram":
            return <InstagramFeed key={i} {...section.props} />;

          case "testimonials":
            return <Testimonials key={i} {...section.props} />;

          case "productCategories":
            return <ProductCategories key={i} />;

          case "newsletter":
            return <Newsletter key={i} {...section.props} />;

          case "blog":
            return <BlogSection key={i} />;
          default:
            return null;
        }
      })}
    </main>
  );
}
