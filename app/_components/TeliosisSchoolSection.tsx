import Image from "next/image";
import { GraduationCap, BookOpen, Users, Award, Users2, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TeliosisSection() {
  const features = [
    {
      icon: <BookOpen size={20} />,
      text: "In-depth Biblical Studies",
      iconColor: "text-white",
      bgColor: "bg-gradient-to-br from-orange-500 to-orange-600",
    },
    {
      icon: <Users size={20} />,
      text: "Expert Instructors",
      iconColor: "text-white",
      bgColor: "bg-gradient-to-br from-pink-500 to-rose-600",
    },
    {
      icon: <Award size={20} />,
      text: "Certificate Programs",
      iconColor: "text-white",
      bgColor: "bg-gradient-to-br from-purple-500 to-violet-600",
    },
    {
      icon: <Users2 size={20} />,
      text: "Mentorship",
      iconColor: "text-white",
      bgColor: "bg-gradient-to-br from-pink-500 to-fuchsia-600",
    },
  ];

  return (
    <section className="bg-light-100 py-20">
      <div className="layout-container">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                <GraduationCap size={24} />
              </div>
              <span className="font-bold text-gray-900">Teliosis School</span>
            </div>
            <h2 className="text-heading-lg text-dark-500 mb-6">
              The Teliosis <br /> School of the <br /> Teaching Ministry
            </h2>

            <p className="text-body-lg text-muted max-w-xl">
              Deepen your understanding of Scripture and develop your teaching gifts through our comprehensive ministry
              training program. Whether you're called to teach, lead, or serve, Teliosis School equips you for effective
              ministry.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="border-light-300 flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 shadow-sm"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.bgColor} ${item.iconColor}`}
                  >
                    {item.icon}
                  </div>
                  <span className="text-body-sm text-dark-500 font-semibold">{item.text}</span>
                </div>
              ))}
            </div>

            <Button variant="gradient" size="xl" className="group">
              Enroll Now
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Right Image with Overlays */}
          <div className="relative">
            {/* Sparkle Icon - Top Right Overlap */}
            <div className="absolute -top-4 -right-4 z-20 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 text-white shadow-lg">
              <Sparkles size={32} />
            </div>

            {/* Main Image Wrapper */}
            <div className="relative overflow-hidden rounded-[2rem]">
              <Image
                src="/assets/teliosis-school.png"
                alt="Students in a classroom"
                width={800}
                height={600}
                className="h-[500px] w-full object-cover"
              />
            </div>

            {/* Stats Overlay - Bottom Overlap */}
            <div className="border-light-300 absolute -bottom-10 left-1/2 z-20 w-[90%] -translate-x-1/2 rounded-3xl border bg-white p-8 shadow-xl">
              <div className="divide-light-300 grid grid-cols-3 divide-x">
                <div className="text-center">
                  <div className="text-heading-md text-dark-500">500+</div>
                  <div className="text-body-sm text-muted uppercase">Graduates</div>
                </div>
                <div className="text-center">
                  <div className="text-heading-md text-dark-500">12+</div>
                  <div className="text-body-sm text-muted uppercase">Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-heading-md text-dark-500">8+</div>
                  <div className="text-body-sm text-muted uppercase">Instructors</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
