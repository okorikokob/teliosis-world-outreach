import { Users, Globe, Heart, Award } from "lucide-react";

const ImpactSection = () => {
  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      number: "200+",
      label: "Community Members",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      number: "3",
      label: "Campuses Planted",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      number: "6",
      label: "House Fellowship Centers",
    },
    {
      icon: <Award className="h-8 w-8" />,
      number: "300+",
      label: "Lives Impacted",
    },
  ];

  return (
    <section className="bg-dark-500 relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/impact.png')" }}>
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div className="layout-container relative z-10">
        <div className="mb-12 text-center sm:mb-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
            <span className="text-body-sm text-danger-500 font-medium">✦</span>
            <span className="text-body-sm font-medium text-white">Our Impact</span>
          </div>

          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Impacting lives through the Word and prayer
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
            Through discipleship, outreach, and the power of God, lives are being transformed in our communities and
            beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md transition-all duration-300 hover:bg-white/10 sm:p-8"
            >
              <div className="mb-5 flex justify-center">
                <div className="bg-danger-500 flex h-14 w-14 items-center justify-center rounded-2xl text-white sm:h-16 sm:w-16">
                  {stat.icon}
                </div>
              </div>

              <div className="mb-2 text-3xl font-semibold text-white sm:text-4xl">{stat.number}</div>

              <div className="text-sm text-white/70 sm:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
