"use client";

import { Play, Calendar, Clock, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const RecentSermons = () => {
  const sermons = [
    {
      title: "Walking in Faith",
      speaker: "Pastor Michael Johnson",
      date: "January 21, 2024",
      duration: "42:15",
      description: "Exploring what it means to trust God in uncertain times.",
      series: "Faith Foundations",
    },
    {
      title: "The Power of Prayer",
      speaker: "Pastor Sarah Williams",
      date: "January 14, 2024",
      duration: "38:20",
      description: "Understanding how prayer transforms our relationship with God.",
      series: "Prayer Life",
    },
    {
      title: "Love Your Neighbor",
      speaker: "Pastor Michael Johnson",
      date: "January 7, 2024",
      duration: "45:30",
      description: "Practical ways to show Christ's love in our community.",
      series: "Living the Gospel",
    },
    {
      title: "Finding Purpose",
      speaker: "Pastor David Chen",
      date: "December 31, 2023",
      duration: "40:10",
      description: "Discovering God's calling for your life in the new year.",
      series: "New Year Series",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="layout-container">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <h2 className="text-heading-md text-dark mb-4">Recent Sermons</h2>
          <p className="text-body-md text-muted font-normal">Listen to our latest messages and teachings</p>
        </div>

        {/* Sermon List Stack (Wide Layout) */}
        <div className="flex flex-col gap-6">
          {sermons.map((sermon, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-start gap-8 rounded-[2rem] border border-gray-100 bg-gray-50 p-6 transition-all hover:bg-gray-100 md:flex-row md:items-center md:p-8 lg:p-10"
            >
              {/* Play Button - Notice the outline Play icon instead of filled */}
              <button className="bg-danger-500 shadow-danger-500/20 flex size-20 shrink-0 items-center justify-center rounded-full text-white shadow-xl transition-transform hover:scale-105 active:scale-95">
                <Play className="ml-1 size-8" strokeWidth={1.5} />
              </button>

              {/* Sermon Details */}
              <div className="flex-1 space-y-4">
                {/* Meta Data Row */}
                <div className="text-label text-muted flex flex-wrap items-center gap-6">
                  <span className="bg-primary-100 text-primary-500 rounded-full px-4 py-1.5 text-[12px] font-bold tracking-wide">
                    {sermon.series}
                  </span>
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span>{sermon.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4" />
                    <span>{sermon.duration}</span>
                  </div>
                </div>

                {/* Title & Speaker */}
                <div>
                  <h3 className="text-heading-sm text-dark mb-1">{sermon.title}</h3>
                  <div className="text-body-sm text-muted">
                    by <span className="font-medium text-gray-700">{sermon.speaker}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-body-sm text-muted">{sermon.description}</p>
              </div>

              {/* Action Button */}
              <div className="w-full shrink-0 md:w-auto">
                <Button
                  size="xl"
                  variant="secondary"
                  className="text-dark w-full rounded-full bg-gray-200 font-bold hover:bg-gray-300 md:w-auto"
                >
                  <Download className="mr-2 size-5" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentSermons;
