/* eslint-disable @typescript-eslint/no-explicit-any */
import Product from "../../../components/common/Product-detail/product";
import TrustBadges from "../../../components/common/Product-detail/trustbadges";
import AboutProduct from "../../../components/common/Product-detail/aboutproduct";
import ProductReviews from "../../../components/common/Product-detail/productreview";
import Image from "next/image";
import AboutHero from "../../../components/common/Product-detail/abouthero";
import JournalsSection from "../../../components/common/Product-detail/journal";
import RelatedProducts from "../../../components/common/Product-detail/alsolike";
import {
  getProductReviews,
  getProductSimilarProducts,
} from "@/helper";
import { getFullProductDetails } from "@/helper/product/action";
import { lowayProductDetailsPage, ovyProductDetailsPage } from "@/const/globalconst";

export default async function Page({ params }: any) {
  const { slug } = await params;

  const product = await getFullProductDetails(slug);
  const similarProducts = (await getProductSimilarProducts(slug)) || [];
  const reviewWithMedia = await getProductReviews(slug);
  // const catetoryName = similarProducts[0]?.category;

  const themeColor = product.brand == "loway" ? lowayProductDetailsPage : ovyProductDetailsPage;

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }
  return (
    <div className="container">
      <div className="">
        <Product
          // categoryName={catetoryName}
          // variants={product}
          productInfo={product}
          themeColor={themeColor}
        />
        <TrustBadges themeColor={themeColor} />
        <AboutProduct variant={product} themeColor={themeColor} />
        <ProductReviews reviews={reviewWithMedia} product={product} themeColor={themeColor} />
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
        <AboutHero themeColor={themeColor} />
        <JournalsSection themeColor={themeColor} />
        <RelatedProducts products={similarProducts} themeColor={themeColor} />
      </div>
    </div>
  );
}
