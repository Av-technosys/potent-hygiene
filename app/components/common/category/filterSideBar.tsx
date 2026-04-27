"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";

export default function FiltersSidebar({categories}:any) {
  const router = useRouter();
  const params = useSearchParams();

  const productType=[
    {name:"Organic Sanitary Pads",slug:"organic_sanitary_pads"},
    {name:"Menstrual Cup",slug:"menstrual_cup"},
    {name:"Organic Panty liners",slug:"organic_panty_liners"},
    {name:"Combo",slug:"combo"},
  ]

  const productSize=[
    {name:"Small",slug:"small"},
    {name:"Medium",slug:"medium"},
    {name:"Large",slug:"large"},
  ]

  const productFlow=[
    {name:"Light",slug:"light_flow"},
    {name:"Medium",slug:"medium_flow"},
    {name:"Heavy",slug:"heavy_flow"},
  ]

  const productMaterial=[
    {name:"Organic Cotton",slug:"organic_cotton"},
    {name:"Synthetic Blend",slug:"synthetic_blend"},
    {name:"Medical Grade Silicon",slug:"medical_grade_silicon"},
  ]



  const updateParam = (key: string, value: any) => {
    const newParams = new URLSearchParams(params.toString());

    if (newParams.get(key) === value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    router.push(`?${newParams.toString().toLowerCase()}`);
  };

  const clearAll = () => {
    router.push("?");
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
         <div>
          <h3 className="font-medium mb-3">Categories</h3>

          {categories?.map(
            (item:any) => (
              <div key={item.name} className="flex items-center gap-2 mb-2">
                <Checkbox
                  checked={params.get("category") === item.slug}
                  onCheckedChange={() => updateParam("category", item.slug)}
                />

                <label>{item.name}</label>
              </div>
            ),
          )}
        </div>
        <div>
          <h3 className="font-medium mb-3">Product Type</h3>

          {productType.map(
            (item) => (
              <div key={item.name} className="flex items-center gap-2 mb-2">
                <Checkbox
                  checked={params.get("type") === item.slug}
                  onCheckedChange={() => updateParam("type", item.slug)}
                />

                <label>{item.name}</label>
              </div>
            ),
          )}
        </div>
        <div>
          <h3 className="font-medium mb-3">Flow Type</h3>

          {productFlow.map((item) => (
            <div key={item.name} className="flex items-center gap-2 mb-2">
              <Checkbox
                checked={params.get("flow") === item.slug}
                onCheckedChange={() => updateParam("flow", item.slug)}
              />

              <label>{item.name}</label>
            </div>
          ))}
        </div>
        <div>
          <h3 className="font-medium mb-3">Size</h3>

          {productSize.map((item) => (
            <div key={item.name} className="flex items-center gap-2 mb-2">
              <Checkbox
                checked={params.get("size") === item.slug}
                onCheckedChange={() => updateParam("size", item.slug)}
              />

              <label>{item.name}</label>
            </div>
          ))}
        </div>
        <div>
          <h3 className="font-medium mb-3">Material</h3>

          {productMaterial.map(
            (item) => (
              <div key={item.name} className="flex items-center gap-2 mb-2">
                <Checkbox
                  checked={params.get("material") === item.slug}
                  onCheckedChange={() => updateParam("material", item.slug)}
                />

                <label>{item.name}</label>
              </div>
            ),
          )}
        </div>
        <div>
          <h3 className="font-medium mb-3">Price Range</h3>
          <div className="flex gap-2">
            <Input
              placeholder="₹0"
              onChange={(e) => updateParam("min", e.target.value)}
            />
            <Input
              placeholder="₹1000"
              onChange={(e) => updateParam("max", e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={params.get("stock") === "true"}
            onCheckedChange={() => updateParam("stock", "true")}
          />
          <label>In Stock Only</label>
        </div>
      </CardContent>
    </Card>
  );
}
