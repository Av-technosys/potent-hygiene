/* eslint-disable @typescript-eslint/no-explicit-any */
import { createWishlist, removeItemFromWishlist } from "@/helper";
import { Heart } from "lucide-react";
import { toast } from "sonner";

const AddToWishlist = ({ productVarientId, wishlist, setWishlist }: any) => {


  const toggleWishlist = async (productVarientId: any) => {



    const isInWishlist = wishlist.includes(productVarientId);

    if (isInWishlist) {
      const response = await removeItemFromWishlist(productVarientId);
      if (response.success) {
        toast.success(response.message);
        setWishlist((prev: string[]) =>
          prev.filter((id) => id !== productVarientId),
        );
         window.dispatchEvent(new Event("wishlistUpdated"));
      } else {
        toast.error(response.message);
      }
    } else {
      const response = await createWishlist(productVarientId);
      if (response.success) {
        toast.success(response.message);
        setWishlist((prev: string[]) => [...prev, productVarientId]);
         window.dispatchEvent(new Event("wishlistUpdated"));
      } else {
        toast.error(response.message);
      }
    }
  };

  const isActive = wishlist.includes(productVarientId);

  return (
    <>

      <button
        onClick={() => toggleWishlist(productVarientId)}
        className="absolute left-2 top-2 z-10 rounded-full bg-white p-1.5 text-gray-400 shadow-sm"
      >
        <Heart
          className={`h-4 w-4 ${isActive ? "fill-red-500 text-red-500" : ""}`}
        />
      </button>
    </>
  );
};

export default AddToWishlist;
