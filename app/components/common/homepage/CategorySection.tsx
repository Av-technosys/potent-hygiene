// components/sections/category-grid.tsx
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: 1,
    title: "Sanitary Pads",
    description: "Ultra Soft Protection",
    image: "/category1.png", // Replace with your exported images
    bgColor: "bg-[#E5D9F2]", // Light purple
  },
  {
    id: 2,
    title: "Sanitary Pads",
    description: "Reusable Comfort",
    image: "/category2.png", 
    bgColor: "bg-[#FFF2D8]", // Light peach/cream
  },
  {
    id: 3,
    title: "Pantyliners",
    description: "Daily Freshness",
    image: "/category3.png",
    bgColor: "bg-[#FFD6EC]", // Light pink
  },
  {
    id: 4,
    title: "Combo Pack",
    description: "Complete Care Kit",
    image: "/category4.png",
    bgColor: "bg-[#E5D9F2]", // Light purple
  },
];

export function CategoryGrid() {
  return (
    <section className="py-10 bg-[#FDFCF9]">
      <div className="container mx-auto px-16">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl font-serif font-bold text-[#2C5F63]">Shop by Category</h2>
          <p className="max-w-2xl mx-auto text-sm text-gray-500 leading-relaxed">
            Discover our range of premium feminine hygiene products, 
            thoughtfully crafted for your comfort and wellness.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/category/${category.id}`}
              className="group block bg-white rounded-4xl p-3 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className={`relative aspect-square w-full overflow-hidden rounded-4xl  mb-4 flex items-center justify-center`}>
                <Image
                  src={category.image}
                  alt={category.title}
                  width={350}
                  height={350}
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Text Content */}
              <div className="px-2 pb-2">
                <h3 className="text-lg font-semibold grayscale-25 text-gray-600">{category.title}</h3>
                <p className="text-xs text-gray-500">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}