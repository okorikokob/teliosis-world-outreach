import { Heart, DollarSign, Box, Users, ArrowRight, Sparkles } from "lucide-react";

export default function PartnerSection() {
  const cards = [
    {
      title: "Give",
      description: "Your generosity fuels our mission. Every gift helps us reach more people with hope and love.",
      icon: <DollarSign className="h-7 w-7 text-white" />,
      iconBg: "bg-[#D92D20]", // Vibrant Red
      btnText: "Give Now",
    },
    {
      title: "Serve",
      description: "Use your gifts and talents to make a difference. There's a place for everyone to serve.",
      icon: <Box className="h-7 w-7 text-white" />,
      iconBg: "bg-[#2970FF]", // Vibrant Blue
      btnText: "Find Your Team",
    },
    {
      title: "Partner",
      description: "Join our mission as a ministry partner. Together, we can accomplish more than alone.",
      icon: <Heart className="h-7 w-7 text-white" />,
      iconBg: "bg-[#F79009]", // Vibrant Orange
      btnText: "Become a Partner",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      {/* Background Glow - Top Left */}
      <div className="absolute -top-24 -left-24 h-[500px] w-[500px] rounded-full bg-pink-200/50 blur-[120px]" />

      <div className="layout-container relative z-10">
        {/* --- Header Section --- */}
        <div className="mb-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50 px-4 py-1.5 text-[11px] font-black tracking-widest text-rose-600 uppercase">
            <Heart size={12} fill="currentColor" />
            Partner With Us
          </div>
          <h2 className="mb-6 text-5xl font-black tracking-tight text-zinc-900 md:text-6xl">
            Be Part of Something Greater
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-gray-500">
            When you partner with us, you're investing in transformed lives, stronger families, and a better community.
          </p>
        </div>

        {/* --- Card Grid --- */}
        <div className="mb-28 grid grid-cols-1 gap-8 md:grid-cols-3">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="group flex flex-col rounded-[2.5rem] border border-gray-100 bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Icon Container */}
              <div
                className={`mb-10 flex h-16 w-16 items-center justify-center rounded-2xl ${card.iconBg} shadow-lg shadow-black/5`}
              >
                {card.icon}
              </div>

              <h3 className="mb-4 text-2xl font-black text-zinc-900">{card.title}</h3>
              <p className="mb-10 flex-grow text-[15px] leading-relaxed text-gray-500">{card.description}</p>

              {/* Dark Action Button */}
              <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1D1B18] py-4.5 text-sm font-bold text-white transition-all hover:bg-zinc-800 active:scale-[0.98]">
                {card.btnText}
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* --- Testimonial Section --- */}
        <div className="relative overflow-hidden rounded-[3.5rem] bg-[#939393] px-6 py-20 text-center text-white md:px-20 lg:py-24">
          {/* Subtle Sparkle Background Decoration */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-20">
            <Sparkles size={120} strokeWidth={0.5} />
          </div>

          <div className="relative z-10">
            <div className="mb-10 flex justify-center opacity-60">
              <Sparkles size={40} />
            </div>

            <blockquote className="mx-auto max-w-4xl text-2xl leading-[1.3] font-bold md:text-4xl">
              "Partnering with this church has been one of the most rewarding decisions of my life. Seeing lives
              transformed and knowing I played a small part in that—it's incredible."
            </blockquote>

            <div className="mt-14 flex flex-col items-center gap-4">
              {/* Avatar with Orange-Red Gradient */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F04438] to-[#F79009] text-xl font-black text-white shadow-xl shadow-black/20">
                MJ
              </div>
              <div>
                <p className="text-lg font-bold">Michael Johnson</p>
                <p className="text-sm font-medium tracking-widest text-white/50 uppercase">Partner since 2019</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
