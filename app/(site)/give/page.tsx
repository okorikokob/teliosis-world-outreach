import { Button } from '@/src/components/ui/button';

export const metadata = { title: 'Give' };

export default function GivePage() {
  return (
  <div className="layout-container layout-container--narrow py-10 sm:py-14">
      <h1 className="h1 mb-4 text-[--color-primary]">Give</h1>
      <p className="mb-6 text-sm leading-relaxed">
        Your generosity fuels missions, community impact, and the spread of the gospel. This page will soon allow secure online giving.
      </p>
      <div className="flex gap-4">
        <Button disabled>Give Now (Coming Soon)</Button>
        <Button variant="ghost">Why We Give</Button>
      </div>
    </div>
  );
}
