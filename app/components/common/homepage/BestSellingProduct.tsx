// /* eslint-disable @typescript-eslint/no-explicit-any */
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { getBestSellingProducts } from "@/helper";
// import BestsellingCard from "./BestSellingCard";

// export default async function BestsellingProducts() {
//   const products = await getBestSellingProducts();

//   return (
//     <section className="py-10 md:bg-[#F8F6F1] overflow-hidden">
//       <div className="container mx-auto px-4 md:px-16">
//         <div className="text-center mb-8 md:mb-12">
//           <h2 className="md:text-4xl text-3xl font-serif font-bold">
//             Best Selling Products
//           </h2>
//         </div>

//         <div className="grid md:grid-cols-4 gap-6">
//           {products.map((product: any) => (
//             <BestsellingCard key={product.id} product={product} />
//           ))}
//         </div>

//         <div className="mt-8 flex justify-center">
//           <Link href="/shop">
//             <Button variant="outline">View All Products</Button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getBestSellingProducts } from "@/helper";
import BestsellingCard from "./BestSellingCard";

type Props = {
  title?: string;
  
  buttonColor?: string;
};

export default async function BestsellingProducts({
  title = "Best Selling Products",
 
  buttonColor = "#168BA0",
}: Props) {
  const products = await getBestSellingProducts();

  return (
    <section
      className="py-10 overflow-hidden"
      style={{ backgroundColor: "#F8F6F1" }}
    >
      <div className="container mx-auto px-4 md:px-16">
        
        {/* Title */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="md:text-4xl text-3xl font-serif font-bold">
            {title}
          </h2>
        </div>

        {/* Products */}
        <div className="grid md:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <BestsellingCard key={product.id} product={product} buttonColor={buttonColor} />
          ))}
        </div>

        {/* Button */}
        <div className="mt-8 flex justify-center">
          <Link href="/shop">
            <Button
              className="rounded-full px-6"
              style={{
                borderColor: buttonColor,
                color: buttonColor,
              }}
              variant="outline"
            >
              View All Products
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}