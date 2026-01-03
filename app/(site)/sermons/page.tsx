import { promises as fs } from 'fs';
import path from 'path';

import { formatDate } from '@/src/lib/utils';
import type { Sermon } from '@/src/types/content';

async function getSermons(): Promise<Sermon[]> {
  const file = await fs.readFile(path.join(process.cwd(), 'src/data/sermons.json'), 'utf-8');
  return JSON.parse(file) as Sermon[];
}

export const metadata = { title: 'Sermons' };

export default async function SermonsPage() {
  const sermons = await getSermons();
  return (
  <div className="layout-container layout-container--wide py-10 sm:py-14">
      <h1 className="h1 mb-6 text-[--color-primary]">Sermons</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sermons.map(s => (
          <div key={s.id}>
            <h3 className="font-semibold mb-1">{s.title}</h3>
            <p className="text-sm opacity-70 mb-2">{formatDate(s.date)} • {s.speaker}</p>
            {s.summary && <p className="text-sm line-clamp-3">{s.summary}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
