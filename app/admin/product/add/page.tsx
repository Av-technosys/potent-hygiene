/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState } from "react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, X } from "lucide-react"; // X icon add kiya for UI
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { MultiCategorySelect } from "@/components/multiCategorySelect";
import ImageUpload from "@/components/ImageUpload"; 
import { createProduct } from "@/helper/product/action";
import GallerySection from "../GallerySection";
import AttributeSection from "../AttributeSection";

type ImageItem = {
  key: string;
  preview: string;
};

type AttributeValue = {
  id?: string;
  value: string;
};

type Variant = {
  id: string;
  name: string;
  sku: string;
  price: number;
  strikethroughPrice: number;
  description: string;
  banner: ImageItem | null;
  gallery: ImageItem[];
  attributes: Record<string, AttributeValue>;
  isInStock: boolean;
  isReturnable: boolean;
  isCancelable: boolean;
  isReplacement: boolean;
  returnDays: number;
  replacementDays: number;
};

export default function AddProductForm() {
  const router = useRouter();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [variants, setVariants] = useState<Variant[]>([{
    id: crypto.randomUUID(),
    name: "",
    sku: "",
    price: 0,
    strikethroughPrice: 0,
    description: "",
    banner: null,
    gallery: [],
    attributes: {},
    isInStock: true,
    isReturnable: false,
    isCancelable: false,
    isReplacement: false,
    returnDays: 0,
    replacementDays: 0
  }]);

  const [activeIndex, setActiveIndex] = useState(0);
  const galleryRef = useRef<HTMLInputElement>(null);

  const addVariant = () => {
    const newVariant: Variant = {
      ...variants[0],
      id: crypto.randomUUID(),
      sku: "",
      banner: null,
      gallery: [],
      isInStock: true,
      attributes: {} 
    };
    setVariants([...variants, newVariant]);
    setActiveIndex(variants.length);
  };

  const removeVariant = (index: number) => {
    if (variants.length === 1) return toast.error("At least one variant required");
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
    if (activeIndex >= newVariants.length) setActiveIndex(newVariants.length - 1);
  };

  const updateVariant = (index: number, updates: Partial<Variant>) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], ...updates };
    setVariants(newVariants);
  };

  const setGalleryForActive = (action: React.SetStateAction<ImageItem[]>) => {
    const currentGallery = variants[activeIndex].gallery;
    const nextGallery = typeof action === "function" ? (action as any)(currentGallery) : action;
    updateVariant(activeIndex, { gallery: nextGallery });
  };

  const handleBannerSuccess = (url: string) => {
    updateVariant(activeIndex, { banner: { key: url, preview: url } });
    toast.success("Banner uploaded");
  };

  const handleGallerySuccess = (url: string) => {
    const currentGallery = variants[activeIndex].gallery;
    updateVariant(activeIndex, { gallery: [...currentGallery, { key: url, preview: url }] });
    toast.success("Gallery image added");
  };

  const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedCategories.length === 0) return toast.error("Select a category");

    const formData = new FormData();
    selectedCategories.forEach((catId) => formData.append("category[]", catId));

    const payload = variants.map(v => ({
      ...v,
      bannerImage: v.banner?.preview,
      media: v.gallery.map(g => g.preview),
      attributes: Object.entries(v.attributes)
        .map(([attr, val]) => ({ attribute: attr, value: val.value }))
        .filter(a => a.value.trim().length > 0)
    }));

    formData.append("variants", JSON.stringify(payload));

    try {
      await createProduct(formData);
      toast.success("Product created!");
      router.push("/admin/product");
    } catch (err) {
      toast.error("Failed to create product");
    }
  };

  const activeVariant = variants[activeIndex];

  // Logic to handle Multi-Select (Toggle logic)
  const toggleSpecAttribute = (key: string, val: string) => {
    const currentAttrValue = activeVariant.attributes[key]?.value || "";
    let selectedArray = currentAttrValue ? currentAttrValue.split(",") : [];

    if (selectedArray.includes(val)) {
      // Agar pehle se hai toh remove karo
      selectedArray = selectedArray.filter((item) => item !== val);
    } else {
      // Nahi hai toh add karo
      selectedArray.push(val);
    }

    const newValue = selectedArray.join(",");
    updateVariant(activeIndex, {
      attributes: { ...activeVariant.attributes, [key]: { value: newValue } }
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <form onSubmit={handleCreateProduct}>
        <div className="flex justify-between items-center sticky top-0 z-10 py-4 bg-white border-b">
          <h1 className="text-2xl font-bold">Add New Product</h1>
          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/product")}>Cancel</Button>
            <Button type="submit">Create Product</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-sm">Categories</CardTitle></CardHeader>
              <CardContent>
                <MultiCategorySelect selectedCategories={selectedCategories} onCategoriesChange={setSelectedCategories} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex justify-between flex-row items-center">
                <CardTitle className="text-sm">Variants</CardTitle>
                <Button type="button" size="sm" variant="ghost" onClick={addVariant}><Plus size={16} /></Button>
              </CardHeader>
              <CardContent className="px-2">
                {variants.map((v, i) => (
                  <div key={v.id} onClick={() => setActiveIndex(i)} className={`flex items-center justify-between p-2 rounded-lg cursor-pointer mb-1 ${activeIndex === i ? "bg-primary text-white" : "hover:bg-muted"}`}>
                    <span className="text-sm truncate font-medium">{v.name || "New Variant"}</span>
                    {variants.length > 1 && <Trash2 size={14} onClick={(e) => { e.stopPropagation(); removeVariant(i); }} />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader><CardTitle>Variant Details</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Variant Name</Label><Input required value={activeVariant.name} onChange={(e) => updateVariant(activeIndex, { name: e.target.value })} /></div>
                  <div className="space-y-2"><Label>SKU</Label><Input required value={activeVariant.sku} onChange={(e) => updateVariant(activeIndex, { sku: e.target.value })} /></div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2"><Label>Price</Label><Input type="number" value={activeVariant.price} onChange={(e) => updateVariant(activeIndex, { price: Number(e.target.value) })} /></div>
                  <div className="space-y-2"><Label>Strike Price</Label><Input type="number" value={activeVariant.strikethroughPrice} onChange={(e) => updateVariant(activeIndex, { strikethroughPrice: Number(e.target.value) })} /></div>
                  <div className="flex items-center space-x-2 pt-8"><Switch checked={activeVariant.isInStock} onCheckedChange={(c) => updateVariant(activeIndex, { isInStock: c })} /><Label>In Stock</Label></div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={activeVariant.description} onChange={(e) => updateVariant(activeIndex, { description: e.target.value })} />
                </div>
                <div className="space-y-3">
                  <Label>Banner Image</Label>
                  <ImageUpload onUploadSuccess={handleBannerSuccess} />
                  {activeVariant.banner && <img src={activeVariant.banner.preview} className="h-32 w-24 object-cover rounded-md border mt-2" alt="Preview" />}
                </div>
              </CardContent>
            </Card>

            {/* --- SPECIFICATIONS SECTION (MULTI-SELECT) --- */}
            <Card>
              <CardHeader><CardTitle className="text-sm">Product Specifications</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Select Size (Multi-select)</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Small (240mm)", "Medium (280mm)", "Large (320mm)", "Extra Large (360mm)"].map((s) => {
                      const isSelected = activeVariant.attributes["size"]?.value.split(",").includes(s);
                      return (
                        <Button 
                          key={s} 
                          type="button" 
                          variant={isSelected ? "default" : "outline"} 
                          className="rounded-full" 
                          onClick={() => toggleSpecAttribute("size", s)}
                        >
                          {s} {isSelected && <X size={12} className="ml-1" />}
                        </Button>
                      );
                    })}
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Flow Type (Multi-select)</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Light Flow", "Regular Flow", "Heavy Flow", "Overnight"].map((f) => {
                      const isSelected = activeVariant.attributes["flow"]?.value.split(",").includes(f);
                      return (
                        <Button 
                          key={f} 
                          type="button" 
                          variant={isSelected ? "default" : "outline"} 
                          className="rounded-full" 
                          onClick={() => toggleSpecAttribute("flow", f)}
                        >
                          {f} {isSelected && <X size={12} className="ml-1" />}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <GallerySection gallery={activeVariant.gallery} galleryRef={galleryRef} handleGallery={() => {}} setGallery={setGalleryForActive as any} />
            <div className="mt-4 p-4 border rounded-lg bg-white">
                <Label>Add Gallery Images</Label>
                <ImageUpload onUploadSuccess={handleGallerySuccess} />
            </div>

            <AttributeSection productAttributes={activeVariant.attributes} handleValueChange={(k, v) => {
              const current = activeVariant.attributes;
              updateVariant(activeIndex, { attributes: { ...current, [k]: { value: v } } });
            }} />
          </div>
        </div>
      </form>
    </div>
  );
}