import { Target, Eye, Heart } from "lucide-react";

const MissionVisionSection = () => {
  const cards = [
    {
      icon: <Target className="h-7 w-7 sm:h-8 sm:w-8" />,
      title: "Our Mission",
      description:
        "We preach the Gospel of the Kingdom, make disciples through the consistent teaching of God’s Word, establish outreach centers for discipleship, raise believers through prayer and practical ministry training, demonstrate the power of the Holy Spirit, and care for the disadvantaged in our communities.",
      iconBg: "bg-danger-100",
      iconColor: "text-danger-500",
    },
    {
      icon: <Eye className="h-7 w-7 sm:h-8 sm:w-8" />,
      title: "Our Vision",
      description:
        "To draw men and women all over the world into an intimate knowledge and fellowship with the Lord Jesus Christ; to teach them the reality of the power of the Word of God; and to show them how to live the God-life.",
      iconBg: "bg-danger-100",
      iconColor: "text-danger-500",
    },
    {
      icon: <Heart className="h-7 w-7 sm:h-8 sm:w-8" />,
      title: "Our Values",
      description:
        "At Teliosis, our lives and ministry are shaped by intimacy with Jesus, the power of God’s Word, effectual prayer, practical discipleship, the demonstration of the Holy Spirit, and love expressed through service to others.",
      iconBg: "bg-danger-100",
      iconColor: "text-danger-500",
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="layout-container">
        <div className="mb-10 max-w-2xl">
          <div className="border-danger-500/20 bg-danger-500/10 text-danger-500 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2">
            <span className="text-body-sm font-medium">What We Believe</span>
          </div>

          <h2 className="text-dark-500 text-3xl font-semibold tracking-tight sm:text-4xl">
            Our mission, vision, and values
          </h2>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-light-200 h-full rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8"
            >
              <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${card.iconBg}`}>
                <div className={card.iconColor}>{card.icon}</div>
              </div>

              <h3 className="text-dark-500 mb-3 text-2xl font-semibold">{card.title}</h3>

              <p className="text-muted text-base leading-7">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
