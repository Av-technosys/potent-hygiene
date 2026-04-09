"use client";
import {useEffect } from "react";

export default function SizeSelectorBox({ items,cartSizes,setCartSizes,total,setTotal }: any) {
  const MAX = 12;

  useEffect(() => {
    const formatted = items.map((item: any, index: number) => ({
      name: item,
      id: index + 1,
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
          return { ...item, qty: item.qty - 1 };
        }
      }
      return item;
    });

    setCartSizes(newSizes);
    setTotal(newSizes.reduce((acc:any, item:any) => acc + item.qty, 0));
  };


  return (
    <div className="space-y-2  bg-white rounded-xl shadow p-4 sm:p-6">
      <h2 className="text-center text-lg font-semibold mb-4">
        Customize your box
      </h2>

      <div className="space-y-4">
        {cartSizes?.map((item: any, index: any) => (
         
          <div key={item.id || index}>
            <div className="flex items-center justify-between">
              {/* LEFT */}
              <p className="text-sm sm:text-base font-medium">{item.name}</p>

              {/* RIGHT */}
              <div className="flex items-center gap-3">
                <button
                disabled={total <= 0}
                    onClick={() => updateQty(item.id, "dec")}
                  className="text-lg px-2 text-gray-500"
                >
                  −
                </button>

                <span className="font-semibold">{item.qty}</span>

                <button
                disabled={total >= 12}
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
      <div className="mt-5 bg-teal-100 text-teal-800 flex justify-between px-4 py-3 rounded-lg text-sm">
        <span>Your box contains</span>
        <span className="font-semibold">
          {total} / {MAX} Pads
        </span>
      </div>
    </div>
  );
}
