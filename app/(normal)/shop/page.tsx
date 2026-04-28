import React from "react";
import FilterBar from "../../components/common/category/filterTopBar";
export const dynamic = "force-dynamic";
import FiltersSidebar from "../../components/common/category/filterSideBar";
import CategoryProducts from "../../components/common/category/categoryProducts";
import { getProducts } from "@/helper/product/action";
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
    min?: any;
    max?: any;
    stock?: any;
    brand?: any
  };
}

const PAGE_SIZE = 20;

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const allCategories = await getCategories();

  const result = await getProducts({
    page: Number(params.page ?? "1"),
    pageSize: Number(PAGE_SIZE),
    search: params.search ?? "",
    category: params.category,
    type:params.type,
    material:params.material,
    size:params.size,
    flow:params.flow,
    min:params.min,
    max:params.max,
    stock:params.stock,
    brand:params.brand
  });

  const totalItems:any = result.items.length;

  return (
    <div className=" container">

      <FilterBar total={totalItems} />
      <div className=" py-8  flex gap-6">
        <FiltersSidebar categories={allCategories} />
        <CategoryProducts
          products={result.items}
          total={5}
          currentPage={result.page}
        />
      </div>

    </div>
  );
};

export default Page;