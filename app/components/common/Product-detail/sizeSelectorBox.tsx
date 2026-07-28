"use client";
import { useEffect } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/imageUrl";
import {
  MIX_BOX_MAX_PADS,
  MIX_BOX_PAD_UNIT,
  getMixBoxAdjustmentMessage,
  normalizeMixBoxRecipe,
  normalizePadSize,
  validateMixBoxRecipe,
} from "@/lib/mixYourBox";

export default function SizeSelectorBox({
  items,
  cartSizes,
  setCartSizes,
  total,
  setTotal,
  themeColor,
}: any) {
  const MAX = MIX_BOX_MAX_PADS;

  useEffect(() => {
    const formatted = items.map((item: any, index: number) => ({
      name: item.name,
      description: item.description,
      image: item.image,
      id: item.id,
      qty: 0,
    }));

    setCartSizes(formatted);
  }, []);


  const updateQty = (id: number, type: string) => {
    const newSizes = cartSizes.map((item: any) => {
      if (item.id === id) {
        if (type === "inc") {
          return { ...item, qty: item.qty + 1 };
        } else {
          return { ...item, qty: Math.max(0, item.qty - 1) };
        }
      }
      return item;
    });

    setCartSizes(newSizes);
    setTotal(newSizes.reduce((acc: any, item: any) => acc + item.qty, 0));
  };

  const validation = validateMixBoxRecipe(
    normalizeMixBoxRecipe(
      cartSizes
        .map((item: any) => {
          const size = normalizePadSize(item.name ?? "");
          return size ? { size, quantity: item.qty } : null;
        })
        .filter(Boolean),
    ),
  );

  return (
    <div style={{borderColor: themeColor.darkColor}} className="space-y-2 border bg-white rounded-xl shadow p-4 sm:p-6">
      <h2 className="text-center text-lg font-semibold mb-4">
        Customize your box
      </h2>

      <div className="space-y-4">
        {cartSizes?.map((item: any, index: any) => (
          <div key={item.id || index}>
            <div className="flex items-center justify-between">
              {/* LEFT */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div
                    className={`relative w-10 h-10 rounded-full overflow-hidden border`}
                    style={{ borderColor: themeColor.darkColor }}
                  >
                    <Image
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm sm:text-base font-medium">
                    {item.name}
                  </span>
                </div>
                <p>{item.description}</p>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3">
                <button
                  disabled={item.qty <= 0}
                  onClick={() => updateQty(item.id, "dec")}
                  className="text-lg px-2 text-gray-500"
                >
                  −
                </button>

                <span className="font-semibold">{item.qty}</span>

                <button
                  disabled={total >= MAX}
                  onClick={() => updateQty(item.id, "inc")}
                  className={`text-lg px-2 ${
                    total >= MAX ? "text-gray-300" : "text-teal-600"
                  }`}
                >
                  +
                </button>
              </div>
            </div>

            <hr className="mt-3 border-gray-200" />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        className="mt-5 flex justify-between px-4 py-3 rounded-lg text-sm"
        style={{
          backgroundColor: themeColor.lightColor,
          color: themeColor.textColor,
        }}
      >
        <span>Your box contains</span>
        <span className="font-semibold">
          {total} Pads
        </span>
      </div>

      <p className={`text-sm ${validation.valid ? "text-green-700" : "text-red-600"}`}>
        {validation.valid
          ? `${total / MIX_BOX_PAD_UNIT} box${total === MIX_BOX_PAD_UNIT ? "" : "es"} selected.`
          : getMixBoxAdjustmentMessage(total)}
      </p>
    </div>
  );
}
