import Image from "next/image";
import { Users } from "lucide-react";

const LeadershipSection = () => {
  const leaders = [
    {
      name: "Pastor E.A Adebayo",
      role: "Senior Pastor",
      description: "Leading with vision and compassion for 25 years",
      image: "/assets/pastor-adeboye.png",
    },
    {
      name: "Sarah Williams",
      role: "Worship Pastor",
      description: "Creating spaces for authentic worship and encounter",
      image: "/assets/faith.png",
    },
    {
      name: "David Chen",
      role: "Youth Pastor",
      description: "Empowering the next generation to live boldly",
      image: "/assets/joshua.jpg",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="layout-container">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="bg-light-200 mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2">
            <Users className="text-dark-500 h-5 w-5" />
            <span className="text-body-sm text-dark-500 font-medium">Leadership Team</span>
          </div>
          <h2 className="text-heading-lg text-dark-500 mb-4">Meet Our Leadership</h2>
          <p className="text-body-lg text-muted mx-auto max-w-2xl">
            Dedicated servants called to shepherd and guide our community
          </p>
        </div>

        {/* Leadership Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {leaders.map((leader, idx) => (
            <div key={idx} className="group">
              {/* Image Card */}
              <div className="relative mb-6 overflow-hidden rounded-3xl">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  width={400}
                  height={500}
                  className="h-[500px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Role Badge */}
                <div className="absolute bottom-6 left-6">
                  <span className="text-body-sm text-danger-500 font-semibold">{leader.role}</span>
                  <h3 className="text-heading-sm mt-2 text-white">{leader.name}</h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-body-lg text-muted">{leader.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
