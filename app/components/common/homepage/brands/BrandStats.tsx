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
  className="py-10 px-6 md:px-16 bg-cover bg-center"
  style={{
    backgroundImage: `url(${props.image})`,
  }}
>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          {/* LEFT: Stats Cards */}
          <div>
            <h2 className="text-white text-2xl font-bold mb-6">Our Stats and USP</h2>
            <div className="grid grid-cols-2 gap-3">
              {props.stats.map((s, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-xl shadow-sm flex flex-col min-h-[140px] justify-start"
                >
                  <h3 className="text-3xl font-extrabold text-[#C08497] mb-2">
                    {s.value}
                  </h3>
                  <p className="text-[13px] leading-snug text-gray-800 font-medium">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Bullets & Product Image */}
          <div className="flex flex-row items-end justify-between lg:pl-10 h-full">
            <ul className="text-white space-y-1.5 text-base font-medium list-disc list-inside pb-4">
              {props.bullets.map((bullet, idx) => (
                <li key={idx} className="drop-shadow-sm">
                  {bullet}
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