import Link from 'next/link';
import { Button } from '@/src/components/ui/button';

export default function GiveCtaSection() {
  return (
    <section className="py-16 sm:py-20 bg-color-soft border-t border-color-border">
      <div className="layout-container">
        <h2 className="h3 mb-3">Partner With Us</h2>
        <p className="text-sm leading-relaxed mb-6">Your generosity helps us reach more people with the good news of Jesus.</p>
        <Link href="/give"><Button>Give Now</Button></Link>
      </div>
    </section>
  );
}
