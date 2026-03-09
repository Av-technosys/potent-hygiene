"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";

export default function FiltersSidebar() {
  const router = useRouter();
  const params = useSearchParams();

  const updateParam = (key: string, value: any) => {
    const newParams = new URLSearchParams(params.toString());

    if (newParams.get(key) === value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    router.push(`?${newParams.toString()}`);
  };

  const clearAll = () => {
    router.push("?");
  };

  return (
    <Card className="hidden md:block w-72 rounded-2xl shadow-md bg-white">
      <CardContent className="p-5 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">Filters</h2>

          <button onClick={clearAll} className="text-sm text-[#1A8D91]">
            Clear All
          </button>
        </div>
        <div>
          <h3 className="font-medium mb-3">Product Type</h3>

          {["Sanitary Pads", "Menstrual Cup", "Pantyliners", "Combo"].map(
            (item) => (
              <div key={item} className="flex items-center gap-2 mb-2">
                <Checkbox
                  checked={params.get("type") === item}
                  onCheckedChange={() => updateParam("type", item)}
                />

                <label>{item}</label>
              </div>
            ),
          )}
        </div>
        <div>
          <h3 className="font-medium mb-3">Flow Type</h3>

          {["Light", "Regular", "Heavy", "Ultra Heavy"].map((item) => (
            <div key={item} className="flex items-center gap-2 mb-2">
              <Checkbox
                checked={params.get("flow") === item}
                onCheckedChange={() => updateParam("flow", item)}
              />

              <label>{item}</label>
            </div>
          ))}
        </div>
        <div>
          <h3 className="font-medium mb-3">Size</h3>

          {["Small", "Medium", "Large", "Extra Large"].map((item) => (
            <div key={item} className="flex items-center gap-2 mb-2">
              <Checkbox
                checked={params.get("size") === item}
                onCheckedChange={() => updateParam("size", item)}
              />

              <label>{item}</label>
            </div>
          ))}
        </div>
        <div>
          <h3 className="font-medium mb-3">Material</h3>

          {["Organic Cotton", "Medical Grade Silicon", "Synthetic Blend"].map(
            (item) => (
              <div key={item} className="flex items-center gap-2 mb-2">
                <Checkbox
                  checked={params.get("material") === item}
                  onCheckedChange={() => updateParam("material", item)}
                />

                <label>{item}</label>
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
