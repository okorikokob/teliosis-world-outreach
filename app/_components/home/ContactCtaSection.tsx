import Link from 'next/link';
import { Button } from '@/src/components/ui/button';

export default function ContactCtaSection() {
  return (
    <section className="py-12 sm:py-16">
      <div className="layout-container layout-container--narrow">
        <h2 className="h3 mb-3">Have Questions?</h2>
        <p className="text-sm leading-relaxed mb-6">We’d love to connect. Send us a message and our team will respond shortly.</p>
        <Link href="/contact"><Button variant="ghost">Contact Us</Button></Link>
      </div>
    </section>
  );
}
