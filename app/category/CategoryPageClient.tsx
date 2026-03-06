"use client";

import React, { Suspense } from "react";
import FilterBar from "../components/common/category/filterTopBar";
import FiltersSidebar from "../components/common/category/filterSideBar";
import CategoryProducts from "../components/common/category/categoryProduct";

export default function CategoryPageClient() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <FilterBar />

      <div className="max-w-7xl mx-auto py-8 px-6 flex gap-8">
        <FiltersSidebar />
        <CategoryProducts />
      </div>
    </Suspense>
  );
}
