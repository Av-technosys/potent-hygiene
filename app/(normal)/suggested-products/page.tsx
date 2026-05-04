"use client";
import AddToWishlist from "@/app/components/common/category/addToWishlist";
import { Button } from "@/components/ui/button";
import { getQuizSuggestedProducts } from "@/helper";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { addToCart as addToCartAction } from "@/store/cartActions";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const SuggestedProducts = () => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const userAnswers = JSON.parse(
          localStorage.getItem("quizAnswers") || "[]",
        );
        const data: any = await getQuizSuggestedProducts(userAnswers);
        setProducts(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const addToCart = async (product: any) => {
    await addToCartAction({
      productId: product.id,
      sku: "default",
      slug: product.slug || "",
      title: product.name,
      image: product.bannerImage || "/product.png",
      price: product.basePrice || 0,
      originalPrice: product.strikethroughPrice,
      quantity: 1,
      isQuantityChangable: true,
    });
  };

  return (
    <div className="max-w-6xl mx-auto mb-5">
      <button
        type="button"
        className="my-2 flex items-center gap-1 border border-gray-300 rounded-md px-3 py-2 cursor-pointer  text-gray-700 hover:bg-gray-100"
        onClick={() => {
          localStorage.removeItem("quizAnswers");
          setProducts([]);
          setLoading(true);

          router.push("/quiz");
        }}
      >
        <ArrowLeft />
        Retake Quiz
      </button>
      <div className="text-xl text-gray-600 font-semibold my-5">
        Showing {products.length} Products for Result “All Products”
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 h-full gap-6 flex-1">
        {loading ? (
          <div className="text-center py-20 text-gray-500">
            Fetching your personalised product picks...
          </div>
        ) : products.length > 0 ? (
          products?.map((value: any) => (
            <div
              key={value.id}
              className="flex relative flex-col rounded-md p-3 shadow-md bg-white"
            >
              {/* Wishlist */}
              <AddToWishlist product={value} />
              {/* Discount */}
              {value.strikethroughPrice && (
                <div className="absolute right-2 top-2 z-10">
                  <div className="rounded-xl bg-[#168BA0] px-2 py-1 text-[10px] font-bold text-white">
                    SALE
                  </div>
                </div>
              )}

              {/* Image */}
              <Link
                className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-50"
                href={`/product-detail/${value.slug}`}
              >
                <Image
                  src={value.bannerImage || "/product.png"}
                  alt={value.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  unoptimized
                />
              </Link>

              {/* Badge */}
              <span className="w-fit absolute bottom-31 left-1 rounded-full bg-[#10B981] px-2 py-0.5 text-[10px] text-white">
                Bestseller
              </span>

              {/* Content */}
              <div className="mt-4 flex flex-col space-y-3 px-1 rounded-lg">
                <h3 className="text-sm font-bold text-gray-800 line-clamp-1">
                  {value.name}
                </h3>

                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold text-gray-900">
                    ₹{value.basePrice}
                  </span>

                  {value.strikethroughPrice && (
                    <span className="text-xs line-through text-gray-400">
                      ₹{value.strikethroughPrice}
                    </span>
                  )}
                </div>

                {value.hasVarientBox ? (
                  <Link href={`/product-detail/${value.slug}`}>
                    <Button className="w-full rounded-md bg-[#168BA0] py-5 text-sm font-semibold text-white hover:bg-[#146e71]">
                      Add to Cart
                    </Button>
                  </Link>
                ) : (
                  <Button
                    className="w-full rounded-md bg-[#168BA0] py-5 text-sm font-semibold text-white hover:bg-[#146e71]"
                    onClick={() => addToCart(value)}
                  >
                    Add to Cart
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-500">
            No products found
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestedProducts;
