import Image from "next/image";
import { Users } from "lucide-react";

const leaders = [
  {
    name: "Pastor Peter E. Nwoji",
    role: "Lead Pastor / Teacher",
    description:
      "Serving with a passion to raise disciples through the teaching of God’s Word, prayer, and practical ministry.",
    image: "/assets/pastor-peter-nwoji.jpg",
  },
  {
    name: "Pastor Name",
    role: "Associate Pastor",
    description:
      "Committed to shepherding lives and strengthening the church through faithful service and discipleship.",
    image: "/assets/pastor-2.jpg",
  },
  {
    name: "Pastor Name",
    role: "Pastor",
    description: "Dedicated to building believers and advancing the mission of Teliosis World Outreach.",
    image: "/assets/pastor-3.jpg",
  },
  {
    name: "Pastor Name",
    role: "Pastor",
    description: "Serving with compassion, wisdom, and a heart for people and spiritual growth.",
    image: "/assets/pastor-4.jpg",
  },
  {
    name: "Pastor Name",
    role: "Pastor",
    description: "Focused on discipleship, ministry support, and raising believers into maturity in Christ.",
    image: "/assets/pastor-5.jpg",
  },
  {
    name: "Pastor Name",
    role: "Pastor",
    description: "Passionate about helping people grow in faith, prayer, and the knowledge of God’s Word.",
    image: "/assets/pastor-6.jpg",
  },
];

const LeadershipSection = () => {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="layout-container">
        <div className="mb-12 text-center sm:mb-16">
          <div className="border-danger-500/20 bg-danger-500/10 text-danger-500 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2">
            <Users className="h-4 w-4" />
            <span className="text-body-sm font-medium">Pastoral Team</span>
          </div>

          <h2 className="text-dark-500 mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">Meet Our Pastors</h2>

          <p className="text-muted mx-auto max-w-2xl text-base leading-7 sm:text-lg">
            Faithful servants called to teach, shepherd, and guide our community in truth, prayer, and love.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {leaders.map((leader, idx) => (
            <div
              key={idx}
              className="bg-light-200 group h-full overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  width={500}
                  height={600}
                  className="h-[360px] w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-[400px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                <div className="absolute inset-x-4 bottom-6 left-6 sm:right-5 sm:bottom-5 sm:left-5">
                  <p className="text-danger-500 text-xs font-semibold sm:text-sm">{leader.role}</p>
                  <h3 className="mt-1 text-lg leading-tight font-semibold text-white sm:text-2xl">{leader.name}</h3>
                </div>
              </div>

              <div className="flex h-full flex-col p-6">
                <p className="text-muted text-base leading-7">{leader.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
