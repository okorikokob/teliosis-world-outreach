import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import events from '@/src/data/events.json';
import { formatDate } from '@/src/lib/utils';

export default function UpcomingEventSection() {
  const nextEvent = events[0];
  return (
    <section className="py-12 sm:py-16">
      <div className="layout-container">
        <h2 className="h3 mb-4">Upcoming Event</h2>
        {nextEvent ? (
          <Link href="/events" className="card card-interactive block">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="h4">{nextEvent.title}</h3>
                <p className="text-sm text-gray-600">{formatDate(nextEvent.start)}{nextEvent.location ? ` • ${nextEvent.location}` : ''}</p>
              </div>
              <Button className="self-start sm:self-auto" variant="ghost">View Details</Button>
            </div>
          </Link>
        ) : (
          <p className="text-sm">No upcoming events. Check back soon.</p>
        )}
      </div>
    </section>
  );
}
