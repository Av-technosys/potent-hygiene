/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Breadcrumb from "../../../components/common/Product-detail/breadcrumb";
import { Navbar } from "../../../components/common/Navbar";
import Product from "../../../components/common/Product-detail/product";
import TrustBadges from "../../../components/common/Product-detail/trustbadges";
import AboutProduct from "../../../components/common/Product-detail/aboutproduct";
import ProductReviews from "../../../components/common/Product-detail/productreview";
import Image from "next/image";
import AboutHero from "../../../components/common/Product-detail/abouthero";
import JournalsSection from "../../../components/common/Product-detail/journal";
import RelatedProducts from "../../../components/common/Product-detail/alsolike";
import Footer from "../../../components/common/Footer";
import {
  getFullProduct,
  getProductReviews,
  getProductSimilarProducts,
} from "@/helper";

export default async function Page({ params }: any) {
  const { slug } = await params;

  const product = await getFullProduct(slug);
  const similarProducts = (await getProductSimilarProducts(slug)) || [];
  const reviewWithMedia = await getProductReviews(slug);
  const catetoryName = similarProducts[0]?.category;

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }
  return (
    <div className=" max-w-7xl  mx-auto">
      <div className="px-4 md:px-10">
        <Product
          categoryName={catetoryName}
          variants={product.variants}
          productInfo={product.targetVariant}
        />
        <TrustBadges />
        <AboutProduct variant={product.targetVariant} />
        <ProductReviews reviews={reviewWithMedia} />
        <div className="  ">
          <Image
            src="/review.png"
            alt="Product Detail"
            width={800}
            height={600}
            className="onject-cover w-full h-auto my-8"
            unoptimized
          />
        </div>
        <AboutHero />
        <JournalsSection />
        <RelatedProducts products={similarProducts} />
      </div>
    </div>
  );
}
