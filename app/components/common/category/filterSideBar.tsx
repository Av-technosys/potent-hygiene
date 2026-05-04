"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PRODUCT_FILTER } from "@/const/filters";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function FiltersSidebar({ categories }: any) {
  const router = useRouter();
  const params = useSearchParams();

  // ✅ local state (instant UI)
  const [filters, setFilters] = useState<any>({
    category: params.get("category") || "",
    type: params.get("type") || "",
    flow: params.get("flow") || "",
    size: params.get("size") || "",
    material: params.get("material") || "",
    cramps: params.get("cramps") || "",
    allergies: params.get("allergies") || "",
    stock: params.get("stock") || "",
    min: params.get("min") || "",
    max: params.get("max") || "",
  });

  useEffect(() => {
    const newParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) newParams.set(key, String(value));
    });

    router.replace(`?${newParams.toString().toLowerCase()}`);
  }, [filters, router]);

  const toggleFilter = (key: string, value: string) => {
    setFilters((prev: any) => ({
      ...prev,
      [key]: prev[key] === value ? "" : value,
    }));
  };

  const clearAll = () => {
    setFilters({
      category: "",
      type: "",
      flow: "",
      size: "",
      material: "",
      cramps: "",
      allergies: "",
      stock: "",
      min: "",
      max: "",
    });
  };

  return (
    <Card className="hidden md:block w-72 rounded-2xl shadow-md bg-white h-fit sticky top-4 max-h-[96vh] overflow-y-auto no-scrollbar">
      <CardContent className="p-5 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">Filters</h2>
          <button onClick={clearAll} className="text-sm text-[#1A8D91]">
            Clear All
          </button>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-medium mb-3">Categories</h3>
          {categories?.map((item: any) => (
            <div key={item.name} className="flex items-center gap-2 mb-2">
              <Checkbox
                checked={filters.category === item.slug}
                onCheckedChange={() =>
                  toggleFilter("category", item.slug)
                }
              />
              <label>{item.name}</label>
            </div>
          ))}
        </div>

        {/* Product Type */}
        <div>
          <h3 className="font-medium mb-3">Product Type</h3>
          {PRODUCT_FILTER.product_type.map((item) => (
            <div key={item.name} className="flex items-center gap-2 mb-2">
              <Checkbox
                checked={filters.type === item.slug}
                onCheckedChange={() =>
                  toggleFilter("type", item.slug)
                }
              />
              <label>{item.name}</label>
            </div>
          ))}
        </div>

        {/* Flow */}
        <div>
          <h3 className="font-medium mb-3">Flow Type</h3>
          {PRODUCT_FILTER.flow_or_usage_type.map((item) => (
            <div key={item.name} className="flex items-center gap-2 mb-2">
              <Checkbox
                checked={filters.flow === item.slug}
                onCheckedChange={() =>
                  toggleFilter("flow", item.slug)
                }
              />
              <label>{item.name}</label>
            </div>
          ))}
        </div>

        {/* Size */}
        <div>
          <h3 className="font-medium mb-3">Size</h3>
          {PRODUCT_FILTER.size.map((item) => (
            <div key={item.name} className="flex items-center gap-2 mb-2">
              <Checkbox
                checked={filters.size === item.slug}
                onCheckedChange={() =>
                  toggleFilter("size", item.slug)
                }
              />
              <label>{item.name}</label>
            </div>
          ))}
        </div>

        {/* Material */}
        <div>
          <h3 className="font-medium mb-3">Material</h3>
          {PRODUCT_FILTER.material.map((item) => (
            <div key={item.name} className="flex items-center gap-2 mb-2">
              <Checkbox
                checked={filters.material === item.slug}
                onCheckedChange={() =>
                  toggleFilter("material", item.slug)
                }
              />
              <label>{item.name}</label>
            </div>
          ))}
        </div>

        {/* Price */}
        <div>
          <h3 className="font-medium mb-3">Price Range</h3>
          <div className="flex gap-2">
            <Input
              placeholder="₹0"
              value={filters.min}
              onChange={(e) =>
                setFilters((prev: any) => ({
                  ...prev,
                  min: e.target.value,
                }))
              }
            />
            <Input
              placeholder="₹1000"
              value={filters.max}
              onChange={(e) =>
                setFilters((prev: any) => ({
                  ...prev,
                  max: e.target.value,
                }))
              }
            />
          </div>
        </div>

        {/* Stock */}
        <div className="flex items-center gap-2">
          <Checkbox
            checked={filters.stock === "true"}
            onCheckedChange={() =>
              toggleFilter("stock", "true")
            }
          />
          <label>In Stock Only</label>
        </div>
      </CardContent>
    </Card>
  );
}
