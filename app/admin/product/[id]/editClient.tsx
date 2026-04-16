/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { MultiCategorySelect } from "@/components/multiCategorySelect";
import GallerySection from "../GallerySection";
import AttributeSection from "../AttributeSection";
import { updateProduct } from "@/helper/product/action";
import { validateImage } from "@/lib/validateImage";
import { useFileUpload } from "@/helper";
import { productAttributeType, productMediaType, productType, productVarientType } from "@/types/productTypes";

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
  isExisting: boolean; // Track if variant is old or new
  name: string;
  sku: string;
  price: number;
  strikethroughPrice: number;
  description: string;
  banner: ImageItem | null;
  gallery: ImageItem[];
  highlights: string[];
  attributes: Record<string, AttributeValue>;
  isInStock: boolean;
  isReturnable: boolean;
  isCancelable: boolean;
  isReplacement: boolean;
  returnDays: number;
  replacementDays: number;
};

type ProductDetailsType = {
  prodcutVarientBoxRes: productVarientType[];
  categoryRes: any;
  productAttributeRes: productAttributeType[];
  productMediaRes: productMediaType[];
} & productType;

export default function EditProduct({
  productDetails,
}: any) {
  const router = useRouter();
  const { upload, uploading } = useFileUpload();
  const bannerRef = useRef<HTMLInputElement>(null);

  const { prodcutVarientBoxRes, categoryRes, productAttributeRes, productMediaRes, ...product }: ProductDetailsType = productDetails;

  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(categoryRes.map((c: any) => c.id));

  // Mapping Initial Data to Variant State
  const [variants, setVariants] = useState<any>({
    id: product?.id || "",
    isExisting: true,
    name: product.name || "",
    sku: product.sku || "",
    price: product.basePrice || 0,
    strikethroughPrice: product.strikethroughPrice || 0,
    description: product.description || "",
    banner: product.bannerImage
      ? { key: product.bannerImage, preview: product.bannerImage }
      : null,
    gallery: (productMediaRes || []).map((m: any) => ({
      key: m.mediaURL,
      preview: m.mediaURL,
    })),
    attributes: Object.fromEntries(
      (productAttributeRes || []).map((a: any) => [
        a.attribute,
        { id: a.id, value: a.value },
      ]),
    ),
    isInStock: product.isInStock ?? true,
    highlights: product.highlights || [],
  }
  );

  // const initialActiveIndex = initialVariants.findIndex(
  //   (v) => v.id === targetVariantId,
  // );
  // const [activeIndex, setActiveIndex] = useState(
  //   initialActiveIndex !== -1 ? initialActiveIndex : 0,
  // );
  const galleryRef = useRef<HTMLInputElement>(null);


  // Helper to update state
  const updateVariant = (index: number, updates: Partial<Variant>) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], ...updates };
    setVariants(newVariants);
  };



  const handleBanner = async (file?: File) => {
    if (!file) return;

    try {
      await validateImage(file, {
        maxSizeMB: 2,
        maxWidth: 2000,
        maxHeight: 2000,
        ratio: 1,
      });

      const { fileKey, fileUrl } = await upload(file, "product");

      // updateVariant(activeIndex, {
      //   banner: {
      //     key: fileKey,
      //     preview: fileUrl as any, // ✅ S3 URL
      //   },
      // });

      toast.success("Banner uploaded");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Multi-select Logic (Toggle)
  const toggleSpecAttribute = (key: string, val: string) => {
    const currentAttrValue = variants.attributes[key]?.value || "";
    let selectedArray = currentAttrValue ? currentAttrValue.split(",") : [];

    if (selectedArray.includes(val)) {
      selectedArray = selectedArray.filter((item: string) => item !== val);
    } else {
      selectedArray.push(val);
    }

    const newValue = selectedArray.join(",");
    // updateVariant(activeIndex, {
    //   attributes: {
    //     ...activeVariant.attributes,
    //     [key]: { ...activeVariant.attributes[key], value: newValue },
    //   },
    // });
  };

  const handleGallery = async (files: FileList | null) => {
    if (!files) return;

    for (const file of Array.from(files)) {
      try {
        await validateImage(file, {
          maxSizeMB: 2,
          maxWidth: 2000,
          maxHeight: 2000,
          ratio: 2000 / 2000,
        });
        const { preview, fileKey, fileUrl } = await upload(file, "product");
        const currentGallery = variants.gallery;
        // updateVariant(activeIndex, {
        //   gallery: [
        //     ...currentGallery,
        //     { key: fileKey, preview: fileUrl as any },
        //   ],
        // });
        toast.success("Image uploaded");
      } catch (err: any) {
        toast.info(err.message);
      }
    }
  };

  const setGalleryForActive = (action: React.SetStateAction<ImageItem[]>) => {
    const currentGallery = variants.gallery;
    const nextGallery =
      typeof action === "function" ? (action as any)(currentGallery) : action;
    // updateVariant(activeIndex, {
    //   gallery: nextGallery,
    // });
  };

  const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedCategories.length === 0)
      return toast.error("Select a category");

    const formData = new FormData();
    formData.append("id", variants.id);
    selectedCategories.forEach((catId) => formData.append("category[]", catId));

    const payload = variants.map((v: any) => ({
      ...v,
      id: v.isExisting ? v.id : undefined, // Old variants keep ID, new ones don't
      bannerImage: v.banner?.preview,
      media: v.gallery.map((g: any) => g.preview),
      highlights: v.highlights.filter((h: string) => h.trim().length > 0),
      attributes: Object.entries(v.attributes)
        .map(([attr, val]: [string, any]) => ({ attribute: attr, value: val.value }))
        .filter((a: any) => a.value.trim().length > 0),
    }));

    formData.append("variants", JSON.stringify(payload));

    try {
      await updateProduct(formData);
      toast.success("Product updated successfully!");
      router.push("/admin/product");
    } catch (err) {
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <form onSubmit={handleUpdateProduct}>
        <div className="flex justify-between items-center sticky top-0 z-10 py-4 bg-white border-b">
          <div>
            <h1 className="text-2xl font-bold">Edit Product</h1>
            <p className="text-sm text-gray-500"> {product.slug}</p>
          </div>
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/product")}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <MultiCategorySelect
                  selectedCategories={selectedCategories}
                  onCategoriesChange={setSelectedCategories}
                />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Product Name</Label>
                    <Input
                      required
                      value={variants.name}
                      onChange={(e) =>
                        setVariants({ ...variants, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>SKU</Label>
                    <Input
                      required
                      value={variants.sku}
                      onChange={(e) =>
                        setVariants({ ...variants, sku: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Price</Label>
                    <Input
                      type="number"
                      value={variants.price}
                      onChange={(e) =>
                        setVariants({ ...variants, price: Number(e.target.value) })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Strike Price</Label>
                    <Input
                      type="number"
                      value={variants.strikethroughPrice}
                      onChange={(e) =>
                        setVariants({ ...variants, strikethroughPrice: Number(e.target.value) })
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-8">
                    <Switch
                      checked={variants.isInStock}
                      onCheckedChange={(c) =>
                        setVariants({ ...variants, isInStock: c })
                      }
                    />
                    <Label>In Stock</Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={variants.description}
                    onChange={(e) =>
                      setVariants({ ...variants, description: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Highlights</Label>

                  <div className="flex flex-col gap-2">
                    {variants.highlights.map((h: string, i: number) => (
                      <div key={i} className="flex gap-2">
                        <Input
                          value={h}
                          onChange={(e) => {
                            const newHighlights = [...variants.highlights];
                            newHighlights[i] = e.target.value;
                            setVariants({ ...variants, highlights: newHighlights });
                          }}
                          placeholder="Enter highlight"
                        />

                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => {
                            const newHighlights =
                              variants.highlights.filter(
                                (_: string, idx: number) => idx !== i,
                              );
                            setVariants({ ...variants, highlights: newHighlights });
                          }}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setVariants({ ...variants, highlights: [...variants.highlights, ""] });
                      }}
                    >
                      + Add Highlight
                    </Button>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Banner Image</Label>
                  {/* <ImageUpload onUploadSuccess={handleBannerSuccess} /> */}
                  <div
                    onClick={() => bannerRef.current?.click()}
                    className="border-2 border-dashed rounded-xl h-48 flex items-center justify-center cursor-pointer relative overflow-hidden"
                  >
                    {!variants.banner ? (
                      <p>Click to upload banner</p>
                    ) : (
                      <img
                        src={variants.banner.preview}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>

                  <input
                    ref={bannerRef}
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleBanner(e.target.files?.[0])}
                  />
                  {variants.banner && (
                    <img
                      src={variants.banner.preview}
                      className="h-32 w-24 object-cover rounded-md border mt-2"
                      alt="Preview"
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* --- SPECIFICATIONS SECTION --- */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  Product Specifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Select Size (Multi-select)</Label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Small (240mm)",
                      "Medium (280mm)",
                      "Large (320mm)",
                      "Extra Large (360mm)",
                    ].map((s) => {
                      const isSelected = variants.attributes["size"]?.value
                        .split(",")
                        .includes(s);
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
                    {[
                      "Light Flow",
                      "Regular Flow",
                      "Heavy Flow",
                      "Overnight",
                    ].map((f) => {
                      const isSelected = variants.attributes["flow"]?.value
                        .split(",")
                        .includes(f);
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

            <GallerySection
              gallery={variants.gallery}
              galleryRef={galleryRef}
              handleGallery={handleGallery}
              setGallery={setGalleryForActive}
            />

            <AttributeSection
              productAttributes={variants.attributes}
              handleValueChange={(k, v) => {
                const current = variants.attributes;
                setVariants({ ...variants, attributes: { ...current, [k]: { ...current[k], value: v } } });
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
