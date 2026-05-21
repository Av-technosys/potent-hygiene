import React from "react";
import FilterBar from "../../components/common/category/filterTopBar";
export const dynamic = "force-dynamic";
import FiltersSidebar from "../../components/common/category/filterSideBar";
import CategoryProducts from "../../components/common/category/categoryProducts";
import { getProductCategories, getProducts, getUserProduct } from "@/helper/product/action";
import { getCategories } from "@/helper";

interface PageProps {
  searchParams: {
    page?: string;
    page_size?: string;
    search?: string;
    category?: string;
    type?: string;
    material?: string;
    size?: string;
    flow?: string;
    cramps?: string;
    allergies?: string;
    min?: any;
    max?: any;
    stock?: any;
    brand?: any
  };
}

const PAGE_SIZE = 200;

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;

  const allCategories = await getCategories();
  const products = await getUserProduct();
  const productsCategory = await getProductCategories();

  return (
    <div className=" container">

      <FilterBar total={products?.length} />
      <div className=" py-8  flex gap-6">
        <FiltersSidebar allCategories={allCategories} />
        <CategoryProducts
          products={products}
          productsCategory={productsCategory}
        />
      </div>

    </div>
  );
};

export default Page;