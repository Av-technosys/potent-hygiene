import React from "react";
import FilterBar from "../../components/common/category/filterTopBar";
export const dynamic = "force-dynamic";
import FiltersSidebar from "../../components/common/category/filterSideBar";
import CategoryProducts from "../../components/common/category/categoryProducts";
import { getProducts } from "@/helper/product/action";

interface PageProps {
  searchParams: {
    page?: string;
    page_size?: string;
    search?: string;
    category?: string;
  };
}

const PAGE_SIZE = 20;

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;

  const result = await getProducts({
    page: Number(params.page ?? "1"),
    pageSize: Number(PAGE_SIZE),
    search: params.search ?? "",
    category: params.category,
  });

  return (
    <div className=" container">

      <FilterBar />
      <div className=" py-8  flex gap-6">
        <FiltersSidebar />
        <CategoryProducts
          products={result.items}
          total={result.totalPages}
          currentPage={result.page}
        />
      </div>

    </div>
  );
};

export default Page;