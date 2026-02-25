import { Target, Eye, Heart } from "lucide-react";

const MissionVisionSection = () => {
  const cards = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Our Mission",
      description:
        "To make disciples who love God, love people, and transform the world through the power of the Gospel.",
      iconBg: "bg-danger-100",
      iconColor: "text-danger-500",
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Our Vision",
      description:
        "A community where every person experiences the life-changing love of God-given Jesus Christ and discovers their purpose.",
      iconBg: "bg-danger-100",
      iconColor: "text-danger-500",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Our Values",
      description:
        "Faith, Love, Community, Service, Excellence, and Authenticity guide everything we do.",
      iconBg: "bg-danger-100",
      iconColor: "text-danger-500",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="layout-container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-light-200 p-10 transition-all hover:shadow-lg"
            >
              {/* Icon */}
              <div
                className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${card.iconBg}`}
              >
                <div className={card.iconColor}>{card.icon}</div>
              </div>

              {/* Title */}
              <h3 className="text-heading-sm text-dark-500 mb-4">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-body-lg text-muted leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
