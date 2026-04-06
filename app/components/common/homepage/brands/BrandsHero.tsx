type BrandHeroProps = {
  logo: string;
  title: string;
  subtitle: string;
  description: string;
  bgImage: string;
  primaryColor: string;
  secondaryColor: string;
};

export function BrandHero({
  logo,
  title,
  subtitle,
  description,
  bgImage,
  primaryColor,
  secondaryColor,
}: BrandHeroProps) {
  return (
    <section
      className="relative w-full h-[500px] flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black/20 absolute inset-0" />

      <div className="relative z-10 text-white space-y-4">
        <img src={logo} alt="logo" className="mx-auto h-36" />

        <h1 className="text-4xl font-serif font-bold">{title}</h1>

        <p className="text-lg">{subtitle}</p>

        <p className="max-w-xl mx-auto text-sm opacity-90">
          {description}
        </p>

        <div className="flex justify-center gap-4">
          <button
            className="px-6 py-2 rounded-full"
            style={{ backgroundColor: primaryColor }}
          >
            Shop Now
          </button>

          <button
            className="px-6 py-2 rounded-full  text-black"  
            style={{ backgroundColor: secondaryColor }}
          >
            All Brands
          </button>
        </div>
      </div>
    </section>
  );
}