import Link from 'next/link';
import { Button } from '@/src/components/ui/button';

export default function MissionSection() {
  return (
    <section className="py-12 sm:py-16 border-t border-color-border">
      <div className="layout-container layout-container--narrow">
        <h2 className="h3 mb-3">Our Mission</h2>
        <p className="text-sm leading-relaxed mb-4">
          Teliosis World Outreach exists to proclaim the gospel, disciple believers, and serve our community in the love of Christ.
        </p>
        <Link href="/about" className="inline-block"><Button variant="ghost">Learn More</Button></Link>
      </div>
    </section>
  );
}
