import { Heart } from "lucide-react";

const JourneySection = () => {
  return (
    <section className="bg-light-100 relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="layout-container">
        <div className="border-y border-gray-200 py-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr_1fr] lg:gap-12">
            {/* ───────── Column 1 ───────── */}
            <div className="space-y-6">
              <div className="border-danger-500/20 bg-danger-500/10 text-danger-500 inline-flex items-center gap-2 rounded-full border px-4 py-2">
                <Heart className="text-danger-500 h-4 w-4" fill="currentColor" />
                <span className="text-body-sm font-medium">Our Confession</span>
              </div>

              <h2 className="text-dark-500 text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
                This is the Teliosis you heard about and we&apos;re glad to have you here.
              </h2>
            </div>

            {/* ───────── Column 2 ───────── */}
            <div className="space-y-5 lg:border-l lg:border-gray-200 lg:pl-8">
              <p className="text-muted text-base leading-8 sm:text-lg">
                Teliosis is not only a fellowship of maturing saints, but very importantly a school — a school to
                disciple nations and train disciples to disciple others.
              </p>

              <p className="text-muted text-base leading-8 sm:text-lg">
                Our slogan at Teliosis is
                <span className="text-dark-500 font-semibold"> “Perfecting the Saints.”</span>
              </p>

              <div className="space-y-4 pt-2">
                <p className="text-dark-500 text-base font-semibold sm:text-lg">Our God-given vision is to:</p>

                <p className="text-muted text-base leading-8 sm:text-lg">
                  <span className="text-danger-500 mr-2 font-bold">1.</span>
                  Draw men and women all over the world into an intimate knowledge and fellowship with the Lord Jesus
                  Christ.
                </p>

                <p className="text-muted text-base leading-8 sm:text-lg">
                  <span className="text-danger-500 mr-2 font-bold">2.</span>
                  Teach them to know the reality of the power of the Word of God.
                </p>

                <p className="text-muted text-base leading-8 sm:text-lg">
                  <span className="text-danger-500 mr-2 font-bold">3.</span>
                  Show them how to live the God-life.
                </p>
              </div>
            </div>

            {/* ───────── Column 3 ───────── */}
            <div className="space-y-5 lg:border-l lg:border-gray-200 lg:pl-8">
              <p className="text-muted text-base leading-8 sm:text-lg">
                We accomplish all of these through intense and undistracted teaching of the Word, effectual prayers, and
                practical discipleship.
              </p>

              <p className="text-muted text-base leading-8 sm:text-lg">
                Teliosis World Outreach has campuses and fellowship centres all over the world.
              </p>

              <p className="text-muted text-base leading-8 sm:text-lg">
                We challenge you to stay with us for an uninterrupted 3-month period and see the Word of God totally
                transform your life.
              </p>

              <p className="text-dark-500 pt-6 text-lg font-bold sm:text-xl">
                Welcome to Teliosis World Outreach... Perfecting the Saints.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
