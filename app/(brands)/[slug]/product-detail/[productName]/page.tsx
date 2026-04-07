/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Product from "../../../../components/common/Product-detail/product";
import TrustBadges from "../../../../components/common/Product-detail/trustbadges";
import AboutProduct from "../../../../components/common/Product-detail/aboutproduct";
import ProductReviews from "../../../../components/common/Product-detail/productreview";
import Image from "next/image";
import AboutHero from "../../../../components/common/Product-detail/abouthero";
import JournalsSection from "../../../../components/common/Product-detail/journal";
import RelatedProducts from "../../../../components/common/Product-detail/alsolike";

import {
  getFullProduct,
  getProductReviews,
  getProductSimilarProducts,
} from "@/helper";
import { BrandProductColors } from "@/const/globalconst";

export default async function Page({ params }: any) {
  const { productName, slug } = await params;
  const themeColor =
    BrandProductColors[slug as keyof typeof BrandProductColors] || "#000";
  const product = await getFullProduct(productName);
  const similarProducts = (await getProductSimilarProducts(productName)) || [];
  const reviewWithMedia = await getProductReviews(productName);
  const catetoryName = similarProducts[0]?.category;

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }
  return (
    <>
      {/* constrained content */}
      <div className="max-w-7xl mx-auto">
        <div className="px-4 md:px-10">
          <Product
            categoryName={catetoryName}
            variants={product.variants}
            productInfo={product.targetVariant}
            themeColor={themeColor}
          />
          <TrustBadges themeColor={themeColor} />
          <AboutProduct
            variant={product.targetVariant}
            themeColor={themeColor}
          />
          <ProductReviews reviews={reviewWithMedia} />

          <div>
            <Image
              src="/review.png"
              alt="Product Detail"
              width={800}
              height={600}
              className="object-cover w-full h-auto my-8"
              unoptimized
            />
          </div>
        </div>
      </div>

      <AboutHero themeColor={themeColor} />

      {/* back to constrained */}
      <div className="max-w-7xl mx-auto">
        <div className="px-4 md:px-10">
          <JournalsSection themeColor={themeColor} />
          <RelatedProducts products={similarProducts} themeColor={themeColor} />
        </div>
      </div>
    </>
  );
}
