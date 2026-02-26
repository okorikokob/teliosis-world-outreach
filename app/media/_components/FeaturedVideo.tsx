import { Youtube, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const FeaturedVideo = () => {
  return (
    <section className="bg-gray-50 py-12 md:py-24">
      <div className="layout-container">
        {/* Using your custom Shadcn Card with a large border radius */}
        <Card className="shadow-light-200 mx-auto max-w-4xl rounded-[2.5rem] border-0 bg-white px-6 py-16 text-center md:px-16 md:py-24">
          <CardContent className="flex flex-col items-center p-0">
            {/* YouTube/Play Icon Badge - Using your danger/red utilities to signify YouTube */}
            <div className="bg-danger-100 text-danger-500 mb-8 flex size-24 items-center justify-center rounded-full shadow-sm">
              <Youtube size={48} strokeWidth={1.5} />
            </div>

            {/* Text Content */}
            <h2 className="text-heading-md text-dark mb-4">Watch Our Latest Service</h2>
            <p className="text-body-lg text-muted mx-auto mb-10 max-w-xl font-normal">
              Missed Sunday service? You can watch our latest sermons, worship sessions, and special events directly on
              our YouTube channel.
            </p>

            {/* Action Button - asChild allows the Button to act as an <a> tag */}
            <Button
              variant="brand"
              size="xl"
              className="shadow-danger-500/30 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
              asChild
            >
              <a
                href={process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL || "https://www.youtube.com/@yourchurchhandle"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Watch on YouTube
                <Play className="size-5" fill="currentColor" strokeWidth={0} />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FeaturedVideo;
