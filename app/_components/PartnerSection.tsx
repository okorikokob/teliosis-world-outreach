import { Heart, DollarSign, Box, Users, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PartnerSection() {
  const cards = [
    {
      title: "Give",
      description: "Your generosity fuels our mission. Every gift helps us reach more people with hope and love.",
      icon: <DollarSign className="h-7 w-7 text-white" />,
      iconBg: "bg-danger-500",
      btnText: "Give Now",
    },
    {
      title: "Serve",
      description: "Use your gifts and talents to make a difference. There's a place for everyone to serve.",
      icon: <Box className="h-7 w-7 text-white" />,
      iconBg: "bg-blue-500",
      btnText: "Find Your Team",
    },
    {
      title: "Partner",
      description: "Join our mission as a ministry partner. Together, we can accomplish more than alone.",
      icon: <Heart className="h-7 w-7 text-white" />,
      iconBg: "bg-orange-500",
      btnText: "Become a Partner",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      {/* Background Glow - Top Left */}
      <div className="bg-danger-500/20 absolute -top-24 -left-24 h-[500px] w-[500px] rounded-full blur-[120px]" />

      <div className="layout-container relative z-10">
        {/* --- Header Section --- */}
        <div className="mb-20 text-center">
          <div className="bg-danger-100 mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2">
            <Heart size={16} fill="currentColor" className="text-danger-500" />
            <span className="text-body-sm text-danger-500 font-semibold">Partner With Us</span>
          </div>
          <h2 className="text-heading-lg text-dark-500 mb-6">Be Part of Something Greater</h2>
          <p className="text-body-lg text-muted mx-auto max-w-2xl">
            When you partner with us, you're investing in transformed lives, stronger families, and a better community.
          </p>
        </div>

        {/* --- Card Grid --- */}
        <div className="mb-28 grid grid-cols-1 gap-8 md:grid-cols-3">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="group border-light-300 flex flex-col rounded-[2.5rem] border bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Icon Container */}
              <div className={`mb-10 flex h-16 w-16 items-center justify-center rounded-2xl ${card.iconBg} shadow-lg`}>
                {card.icon}
              </div>

              <h3 className="text-heading-sm text-dark-500 mb-4">{card.title}</h3>
              <p className="text-body-lg text-muted mb-10 flex-grow">{card.description}</p>

              {/* Dark-styled Action Button (no dark variant available) */}
              <Button
                variant="default"
                size="xl"
                className="bg-dark-500 w-full justify-center gap-2 text-white hover:bg-zinc-800"
              >
                {card.btnText}
                <ArrowRight size={18} />
              </Button>
            </div>
          ))}
        </div>

        {/* --- Testimonial Section --- */}
        <div className="relative overflow-hidden rounded-[3.5rem] bg-gray-500 px-6 py-20 text-center text-white md:px-20 lg:py-24">
          {/* Subtle Sparkle Background Decoration */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-20">
            <Sparkles size={120} strokeWidth={0.5} />
          </div>

          <div className="relative z-10">
            <div className="mb-10 flex justify-center opacity-60">
              <Sparkles size={40} />
            </div>

            <blockquote className="text-heading-md mx-auto max-w-4xl leading-relaxed">
              "Partnering with this church has been one of the most rewarding decisions of my life. Seeing lives
              transformed and knowing I played a small part in that—it's incredible."
            </blockquote>

            <div className="mt-14 flex flex-col items-center gap-4">
              {/* Avatar */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 text-xl font-black text-white shadow-xl shadow-black/20">
                MJ
              </div>
              <div>
                <p className="text-body-lg font-bold">Michael Johnson</p>
                <p className="text-body-sm text-white/70 uppercase">Partner since 2019</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
