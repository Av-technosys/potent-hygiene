import { getCategories } from "@/helper";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/imageUrl";

type Props = {
  title?: string;
  description?: string;
  slug?: string
};

export async function CategoryGrid({
  title = "Shop by Category",
  description = "Discover our range of premium feminine hygiene products, thoughtfully crafted for your comfort and wellness.",
  slug = ""
}: Props) {
  const allCategories = await getCategories();

  return (
    <section className="py-10 md:bg-[#F8F6F1]">
      <div className="container mx-auto md:px-16 px-4">

        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="md:text-4xl text-3xl font-serif font-bold text-[#333333]">
            {title}
          </h2>

          <p className="max-w-2xl mx-auto text-sm text-black/50 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {allCategories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.id}`}
              className="group block bg-white rounded-md p-3 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="relative h-auto w-full overflow-hidden rounded-md mb-4 flex items-center justify-center">
                <Image
                  unoptimized
                  src={getImageUrl(category.bannerImage || "/placeholder.jpg")}
                  alt={category.name || "Category"}
                  width={350}
                  height={350}
                  className="object-contain w-full h-auto transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="px-2 pb-2">
                <h3 className="text-lg font-semibold capitalize text-gray-600">
                  {category.name}
                </h3>

                <p className="text-xs line-clamp-3 text-gray-500">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
