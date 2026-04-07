type Props =
  | {
      variant: "stats";
      stats: { value: string; label: string }[];
      bullets: string[];
      image: string; // The product overlay image
      gradientFrom: string;
      gradientTo: string;
    }
  | {
      variant: "banner";
      title: string;
      highlight: string;
      subtitle: string;
      image: string;
      bgColor: string;
    };

export function BrandStats(props: Props) {
  if (props.variant === "stats") {
    return (
      <section
        className="relative py-8 md:py-12 px-6 md:px-16 overflow-hidden min-h-100 max-h-screen flex items-center"
        style={{
          backgroundImage: `url(${props.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-4xl mx-auto w-full grid lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col md:mr-12">
            <h2 className="text-white text-3xl md:text-4xl font-serif font-semibold mb-6">
              Our Stats and USP
            </h2>

            <div className="grid grid-cols-2 gap-4 md:gap-6 items-start">
              {/* Left Column */}
              <div className="flex flex-col gap-4 md:gap-6">
                {props.stats.slice(0, 2).map((s, i) => (
                  <div
                    key={i}
                    className="bg-white p-4 md:p-6 rounded-2xl shadow-xl flex flex-col max-w-[180px] min-h-[140px] md:min-h-[160px] justify-center"
                  >
                    <h3 className="text-2xl md:text-4xl font-bold text-[#AF71A7] mb-1">
                      {s.value}
                    </h3>
                    <p className="text-[12px] md:text-[14px] leading-tight text-gray-700 font-medium">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Right Column - Staggered Down */}
              <div className="flex flex-col gap-4 md:gap-6 mt-8 md:mt-12">
                {props.stats.slice(2, 4).map((s, i) => (
                  <div
                    key={i}
                    className="bg-white p-4 md:p-6 rounded-2xl shadow-xl flex flex-col max-w-[180px] min-h-[140px] md:min-h-[160px] justify-center"
                  >
                    <h3 className="text-2xl md:text-4xl font-bold text-[#AF71A7] mb-1">
                      {s.value}
                    </h3>
                    <p className="text-[12px] md:text-[14px] leading-tight text-gray-700 font-medium">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* List Section - Positioned to leave visual space for products */}
          <div className="lg:pl-16 flex flex-col justify-center">
            <ul className="text-white space-y-4 text-lg md:text-xl font-medium list-none">
              {props.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 drop-shadow-md">
                  <span className="h-2 w-2 bg-white rounded-full shrink-0 mt-2.5" />
                  <span className="leading-snug">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }

  // 🔵 BANNER VARIANT
  return (
    <section
      className="py-24 px-4 md:px-16 text-white"
      style={{
        backgroundColor: props.bgColor,
        backgroundImage: `url(${props.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-xl space-y-4">
        <h2 className="text-4xl font-bold">
          {props.title}{" "}
          <span className="text-yellow-400">{props.highlight}</span>
        </h2>
        <p className="text-lg">{props.subtitle}</p>
      </div>
    </section>
  );
}
