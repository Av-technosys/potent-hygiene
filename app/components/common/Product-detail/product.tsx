/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { addToCart as addToCartAction } from "@/store/cartActions"; // Rename import
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SizeSelectorBox from "./sizeSelectorBox";
import { toast } from "sonner";
import { subscriptionPlans } from "@/const/globalconst";
import { getImageUrl } from "@/lib/imageUrl";
import {
  calculateMixBoxPricing,
  normalizeMixBoxRecipe,
  normalizePadSize,
  type MixBoxSelection,
  type SubscriptionType,
} from "@/lib/mixYourBox";
import { calculateCycleSyncSchedule } from "@/lib/cycleSync";

export default function ProductDetailPage({
  // categoryName,
  // variants,
  productInfo,
  themeColor,
}: any) {
  const variantsList = productInfo.productVariants || productInfo.prodcutVarientBoxRes || [];
  const defaultVariant = variantsList[0] || productInfo;
  
  const defaultSize = defaultVariant.size || "Medium (280mm)";
  const defaultFlow = defaultVariant.flowType || "Regular Flow";

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [selectedFlow, setSelectedFlow] = useState(defaultFlow);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>({});
  const [cycleSync, setCycleSync] = useState({
    lastPeriodDate: "",
    cycleLength: 28,
    periodLength: 5,
  });
  const [activeVariant, setActiveVariant] = useState(defaultVariant);
  const [bannerImage, setBannerImage] = useState<any>(
    activeVariant.image || productInfo.bannerImage
  );

  const [cartSizes, setCartSizes] = useState<any>([]);

  const [total, setTotal] = useState(0);

  // this two things come from backend , but for now we are using this static because schema me add nhi huwa hai..
  const isTypeBox = productInfo.hasVarientBox;
  const isQuantityChangable = productInfo.hasVarientBox ? false : true;

  // Size and Flow extraction logic from variantsList
  const sizes = Array.from(new Set(variantsList.map((v: any) => v.size).filter(Boolean))) as string[];
  const flows = Array.from(new Set(variantsList.map((v: any) => v.flowType).filter(Boolean))) as string[];

  const discount =
    activeVariant?.strikethroughPrice && activeVariant?.price
      ? Math.round(
        ((activeVariant.strikethroughPrice - activeVariant.price) /
          activeVariant.strikethroughPrice) *
        100,
      )
      : 0;

  const router = useRouter();

  const productId = productInfo.id;

  const subscriptionType = (selectedPlan?.subscriptionType ?? null) as SubscriptionType;
  const purchaseType = isSubscribed ? "subscription" : "one_time";
  const mixBoxRecipe = normalizeMixBoxRecipe(
    cartSizes
      .map((item: any): MixBoxSelection | null => {
        const size = normalizePadSize(item.name ?? "");
        return size ? { size, quantity: item.qty } : null;
      })
      .filter(Boolean) as MixBoxSelection[],
  );
  const cycleSyncSchedule =
    subscriptionType === "cycle_sync" && cycleSync.lastPeriodDate
      ? calculateCycleSyncSchedule(cycleSync)
      : null;
  const effectivePurchaseType =
    cycleSyncSchedule?.valid && !cycleSyncSchedule.shouldCreateSubscription
      ? "one_time"
      : purchaseType;
  const effectiveSubscriptionType =
    effectivePurchaseType === "subscription" ? subscriptionType : null;
  const mixBoxPricing = isTypeBox
    ? calculateMixBoxPricing({
      recipe: mixBoxRecipe,
      setPrice: activeVariant?.price || 0,
      purchaseType: effectivePurchaseType,
      subscriptionType: effectiveSubscriptionType,
    })
    : null;

  const addToCart = async () => {
    if (isTypeBox) {
      if (!mixBoxPricing?.valid) {
        toast.error(mixBoxPricing?.message ?? "Complete your box before adding it to cart.");
        return;
      }
    }

    if (subscriptionType === "cycle_sync") {
      if (!cycleSyncSchedule?.valid) {
        toast.error(cycleSyncSchedule?.message ?? "Enter valid Cycle Sync details.");
        return;
      }
    }

    await addToCartAction({
      productId: productInfo.id,
      productVariantId: activeVariant?.id,
      sku: activeVariant?.sku || `${selectedSize}-${selectedFlow}`,
      slug: productInfo?.slug || "",
      title: activeVariant?.name || productInfo?.name,
      price: isTypeBox && mixBoxPricing?.valid
        ? mixBoxPricing.price
        : activeVariant?.price || 0,
      selectedPlan: selectedPlan,
      isSubscribed: effectivePurchaseType === "subscription",
      image: activeVariant?.image || productInfo?.bannerImage || "/product.png",
      originalPrice: activeVariant?.strikethroughPrice,
      cartSizes: isQuantityChangable ? [] : cartSizes,
      mixBoxRecipe: isTypeBox ? mixBoxRecipe : undefined,
      totalPads: isTypeBox && mixBoxPricing?.valid ? mixBoxPricing.totalPads : undefined,
      boxCount: isTypeBox && mixBoxPricing?.valid ? mixBoxPricing.boxCount : undefined,
      freeLiners: isTypeBox && mixBoxPricing?.valid ? mixBoxPricing.freeLiners : undefined,
      purchaseType: effectivePurchaseType,
      subscriptionType: effectiveSubscriptionType,
      cycleSync:
        effectiveSubscriptionType === "cycle_sync"
          ? cycleSync
          : undefined,
      isQuantityChangable: isQuantityChangable,
      quantity: isTypeBox ? 1 : quantity,
      ...(isTypeBox ? { uuid: crypto.randomUUID() } : {}),
    });
  };

  const subscribeToCart = (plan: any) => {
    setSelectedPlan(plan);
    setIsSubscribed(plan !== null ? true : false);
    // Do not redirect to /cart. Wait for user to click Add to Cart.
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    const match = variantsList.find((v: any) => v.size === size && (selectedFlow ? v.flowType === selectedFlow : true));
    if (match) {
      setActiveVariant(match);
      if (match.image) setBannerImage(match.image);
    }
  };

  const handleFlowChange = (flow: string) => {
    setSelectedFlow(flow);
    const match = variantsList.find((v: any) => (selectedSize ? v.size === selectedSize : true) && v.flowType === flow);
    if (match) {
      setActiveVariant(match);
      if (match.image) setBannerImage(match.image);
    }
  };

  const handleVariantChange = (variant: any) => {
    setActiveVariant(variant);
    router.push(`/product-detail/${variant.slug}`);
  };

  const primaryColor = themeColor || "#168BA0";
  return (
    <div className="min-h-screen py-10">
      <div className=" grid grid-cols-1 md:grid-cols-5 md:gap-12 gap-y-6">
        {/* LEFT SIDE */}
        <div className=" md:sticky md:top-4  h-fit col-span-2">
          <div className="w-full h-auto relative ">
            <Image
              src={getImageUrl(bannerImage)}
              alt="Product"
              height={500}
              width={500}
              className="rounded-xl w-full h-auto object-cover"
            />
          </div>

          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full mt-8"
          >
            <CarouselContent className="">
              {productInfo?.productMediaRes?.map((item: any, index: number) => (
                <CarouselItem
                  key={index}
                  className="
                  basis-[28%]  
                  sm:basis-[36%]
                  lg:basis-[30%]"
                >
                  <div
                    onClick={() => setBannerImage(item?.mediaURL)}
                    className="cursor-pointer"
                  >


                    <Image src={getImageUrl(item?.mediaURL)} height={300} width={300} alt={item?.mediaURL} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Buttons */}
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6 col-span-3">
          {/* Tags */}
          <div className="flex gap-2">
            <span style={{ backgroundColor: themeColor.darkColor, color: productInfo.brand == "loway" ? themeColor.textColor : "white" }} className=" text-xs px-3 py-1 rounded-full">
              {productInfo.brand == "loway" ? "Looway" : "Ovy"}
            </span>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-2xl font-semibold">{activeVariant?.name}</h1>
            <p className="text-gray-500 text-sm">
              {activeVariant?.description}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 text-sm">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-medium">{activeVariant?.rating}</span>
            <span className="text-gray-500">
              | {activeVariant?.reviewCount} reviews
            </span>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap gap-2">
            {activeVariant?.highlights?.length ? (
              activeVariant.highlights.map((feature: string, index: number) => (
                <span
                  key={index}
                  className={`text-xs px-3 py-1 rounded-full ${themeColor.textColor} `}
                  style={
                    themeColor ? { backgroundColor: themeColor.lightColor } : {}
                  }
                >
                  {feature}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm">
                No highlights available
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            {isTypeBox && !mixBoxPricing?.valid ? (
              <span className="text-sm font-medium text-red-600">
                {mixBoxPricing?.message ?? "Build a valid box to see pricing."}
              </span>
            ) : (
              <span className="text-2xl font-bold text-[#168BA0]">
                Rs. {isTypeBox ? mixBoxPricing?.price : activeVariant?.price}
              </span>
            )}
            {!isTypeBox && activeVariant?.strikethroughPrice && (
              <>
                <span className="line-through text-gray-400">
                  ₹{activeVariant?.strikethroughPrice}
                </span>
                <span className="bg-[#DCFCE7] text-[#15803D] text-xs px-2 py-1 rounded-md">
                  Save {discount} %
                </span>
              </>
            )}
          </div>
          {/* {!isTypeBox && (
            <ProductVarient
              variants={variants}
              handleVariantChange={handleVariantChange}
              activeVariant={activeVariant}
              themeColor={themeColor}
            />
          )} */}

          {!isTypeBox && (
            <>
              {/* Size Selection */}
              <div>
                <p className="text-sm font-medium mb-2">Select size</p>

                <div className="flex flex-wrap gap-2">
                  {sizes.map((s: string) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleSizeChange(s)}
                      // className={`px-4 py-2 text-sm rounded-full border transition ${
                      //   selectedSize === s ? "text-white" : "bg-white"
                      // }`}
                      // style={{
                      //   backgroundColor:
                      //     selectedSize === s ? primaryColor : "white",
                      //   borderColor: primaryColor,
                      // }}

                      className={`px-4 py-2 text-sm rounded-full border transition ${selectedSize === s ? "text-white" : "bg-white"
                        }`}
                      style={{
                        backgroundColor:
                          selectedSize === s ? themeColor.darkColor : "white",
                        borderColor: themeColor.darkColor,
                        color:
                          selectedSize === s ? "white" : themeColor.textColor,
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>



              {/* Flow Type - NOW DYNAMIC */}
              <div>
                <p className="text-sm font-medium mb-2">Flow Type</p>
                <div className="flex flex-wrap gap-2">
                  {flows?.map((flow: any) => (
                    <button
                      key={flow}
                      type="button"
                      onClick={() => handleFlowChange(flow)}
                      className={`px-4 py-2 text-sm rounded-full border bg-${themeColor.darkColor} transition ${selectedFlow === flow ? "text-black" : "bg-white"
                        }`}
                      style={{
                        backgroundColor:
                          selectedFlow === flow
                            ? themeColor.darkColor
                            : "white",
                        borderColor: themeColor.darkColor,
                        color:
                          selectedFlow === flow ? "white" : themeColor.textColor,
                      }}
                    >
                      {flow}
                    </button>
                  ))}
                </div>
              </div>
              {/* Quantity */}
              <div>
                <p className="text-sm font-medium mb-2">Quantity</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-full">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {isTypeBox && (
            <SizeSelectorBox
              items={productInfo.prodcutVarientBoxRes}
              cartSizes={cartSizes}
              setCartSizes={setCartSizes}
              total={total}
              setTotal={setTotal}
              themeColor={themeColor}
            />
          )}

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={addToCart}
              disabled={Boolean(isTypeBox && !mixBoxPricing?.valid)}
              style={{ backgroundColor: themeColor.darkColor, color: productInfo.brand == "loway" ? themeColor.textColor : "white" }}
              className="flex-1 text-black py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            // style={{
            //   backgroundColor: themeColor.darkColor || "#168BA0",
            // }}
            >
              Add to Cart
            </button>
            <button className="flex-1 bg-black text-white py-3 rounded-xl">
              Buy Now
            </button>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
            <h2 className="font-semibold text-lg">Choose your Frequency</h2>

            <p className="text-sm text-gray-500">Delivered & Billed every</p>

            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                onClick={() =>
                  subscribeToCart(selectedPlan?.id === plan.id ? null : plan)
                }
                // className={`flex justify-between items-center border p-4 rounded-xl cursor-pointer ${
                //   selectedPlan?.id === plan.id
                //     ? "border-teal-600 bg-teal-50"
                //     : "border-gray-200"
                // }`}

                className={`flex justify-between items-center border p-4 rounded-xl cursor-pointer ${selectedPlan?.id === plan.id ? "bg-opacity-50" : ""
                  }`}
                style={{
                  borderColor:
                    selectedPlan?.id === plan.id
                      ? themeColor.darkColor
                      : "#e5e7eb", // gray-200 fallback
                  backgroundColor:
                    selectedPlan?.id === plan.id
                      ? themeColor.lightColor
                      : "transparent",
                }}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={selectedPlan?.id === plan.id}
                    readOnly
                  />

                  <span className="text-sm">{plan.label}</span>
                </div>

                <span className="font-medium">{plan.price}</span>
              </div>
            ))}

            {subscriptionType === "cycle_sync" && (
              <div className="grid gap-3 rounded-xl border border-gray-200 p-4">
                <input
                  type="date"
                  value={cycleSync.lastPeriodDate}
                  onChange={(event) =>
                    setCycleSync((current) => ({
                      ...current,
                      lastPeriodDate: event.target.value,
                    }))
                  }
                  className="rounded-md border px-3 py-2 text-sm"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    min={21}
                    max={45}
                    value={cycleSync.cycleLength}
                    onChange={(event) =>
                      setCycleSync((current) => ({
                        ...current,
                        cycleLength: Number(event.target.value),
                      }))
                    }
                    className="rounded-md border px-3 py-2 text-sm"
                    aria-label="Cycle length"
                  />
                  <input
                    type="number"
                    min={1}
                    value={cycleSync.periodLength}
                    onChange={(event) =>
                      setCycleSync((current) => ({
                        ...current,
                        periodLength: Number(event.target.value),
                      }))
                    }
                    className="rounded-md border px-3 py-2 text-sm"
                    aria-label="Period length"
                  />
                </div>
                {cycleSyncSchedule?.valid && (
                  <p className="text-sm text-gray-600">
                    {cycleSyncSchedule.message ??
                      `Expected arrival: ${cycleSyncSchedule.arrivalDate.toLocaleDateString()}`}
                  </p>
                )}
                {cycleSyncSchedule?.valid && cycleSyncSchedule.warning && (
                  <p className="text-sm text-amber-700">{cycleSyncSchedule.warning}</p>
                )}
                {cycleSyncSchedule && !cycleSyncSchedule.valid && (
                  <p className="text-sm text-red-600">{cycleSyncSchedule.message}</p>
                )}
              </div>
            )}

            <div className="flex justify-between items-center pt-4">
              {/* <span className="text-xl font-bold">₹239</span> */}

              {/* <button
                onClick={subscribeToCart}
                disabled={isSubscribed}
                className={`text-white px-6 py-3 rounded-xl transition duration-200 ${isSubscribed ? "bg-gray-400 cursor-not-allowed" : ""
                  }`}
                style={{
                  backgroundColor: isSubscribed ? "#9CA3AF" : themeColor,
                  cursor: isSubscribed ? "not-allowed" : "pointer",
                }}
              >
                {isSubscribed ? "Subscribed!" : "Subscribe"}
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductVarient({
  variants,
  handleVariantChange,
  activeVariant,
  themeColor,
}: {
  variants: any;
  handleVariantChange: any;
  activeVariant: any;
  themeColor?: any;
}) {
  return (
    <>
      {variants.length > 0 && (
        <div className=" space-y-2">
          <p className="font-medium text-gray-800">Variants</p>
          <div className=" flex flex-wrap gap-2">
            {variants.map((v: any, index: number) => (
              <div key={index} className="">
                <Button
                  variant={"outline"}
                  key={v.id}
                  onClick={() => handleVariantChange(v)}
                  className={cn(
                    `h-auto cursor-pointer  flex flex-col gap-2`,
                    v.id === activeVariant.id && "bg-gray-100",
                  )}
                >
                  <div className="w-28 h-28 relative rounded-md overflow-hidden">
                    <Image
                      src={getImageUrl(v.bannerImage)}
                      alt="product thumbnail"
                      fill
                      className="object-contain rounded-md"
                    />
                  </div>
                  <span className=" max-w-32 whitespace-break-spaces">
                    {v.name.replace(activeVariant.name, "").trim() || v.name}
                  </span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}


