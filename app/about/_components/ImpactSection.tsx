import { Users, Globe, Heart, Award } from "lucide-react";

const ImpactSection = () => {
  const stats = [
    {
      icon: <Users className="h-8 w-8" />,
      number: "5,000+",
      label: "Community Members",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      number: "15",
      label: "Churches Planted",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      number: "100+",
      label: "Active Ministries",
    },
    {
      icon: <Award className="h-8 w-8" />,
      number: "50K+",
      label: "Lives Impacted",
    },
  ];

  return (
    <section className="bg-dark-500 relative overflow-hidden py-24">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/impact.png')" }}>
        <div className="bg-dark-500/80 absolute inset-0" />
      </div>

      <div className="layout-container relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
            <span className="text-body-sm text-danger-500 font-medium">✦</span>
            <span className="text-body-sm font-medium text-white">Our Impact</span>
          </div>
          <h2 className="text-heading-lg mb-4 text-white">Making a Difference</h2>
          <p className="text-body-lg mx-auto max-w-2xl text-white/80">Together, we're transforming lives</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md transition-all hover:bg-white/10"
            >
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="bg-danger-500 flex h-16 w-16 items-center justify-center rounded-2xl text-white">
                  {stat.icon}
                </div>
              </div>

              {/* Number */}
              <div className="text-heading-lg mb-2 text-white">{stat.number}</div>

              {/* Label */}
              <div className="text-body-md text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
