"use client";
import { addDays, endOfMonth, format, getDate, isSameDay, startOfMonth, startOfWeek } from 'date-fns';
import { useStore } from '../lib/store';
import { PlatformBadge } from './PlatformBadge';

export function CalendarGrid() {
  const posts = useStore(s => s.posts);
  const now = new Date();
  const start = startOfWeek(startOfMonth(now), { weekStartsOn: 0 });
  const end = endOfMonth(now);

  const cells: Date[] = [];
  for (let d = start; d <= end; d = addDays(d, 1)) cells.push(d);

  return (
    <div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
          <div key={d} className="text-xs text-gray-500 text-center uppercase tracking-wide">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {cells.map((d) => (
          <div key={d.toISOString()} className="card p-2 min-h-[120px]">
            <div className="text-xs text-gray-500 mb-1">{format(d, 'MMM d')}</div>
            <div className="space-y-1">
              {posts.filter(p => p.scheduledAt && isSameDay(new Date(p.scheduledAt), d)).slice(0,3).map(p => (
                <div key={p.id} className="rounded-md border border-gray-200 p-2 bg-gray-50">
                  <div className="text-xs font-medium line-clamp-2">{p.caption}</div>
                  <div className="mt-1 flex gap-1 flex-wrap">
                    {p.platforms.map(pl => <PlatformBadge key={pl} platform={pl as any} />)}
                  </div>
                </div>
              ))}
              {posts.filter(p => p.scheduledAt && isSameDay(new Date(p.scheduledAt), d)).length > 3 && (
                <div className="text-xs text-gray-500">+ more</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
