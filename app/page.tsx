"use client";
import { useEffect } from 'react';
import { useStore } from '../lib/store';
import { PlatformBadge } from '../components/PlatformBadge';

export default function DashboardPage() {
  const posts = useStore(s => s.posts);
  const accounts = useStore(s => s.accounts);
  const runSchedulerTick = useStore(s => s.runSchedulerTick);
  const simulateEngagementTick = useStore(s => s.simulateEngagementTick);

  useEffect(() => {
    const t = setInterval(() => { runSchedulerTick(); simulateEngagementTick(); }, 5000);
    return () => clearInterval(t);
  }, [runSchedulerTick, simulateEngagementTick]);

  const posted = posts.filter(p => p.status === 'posted');
  const scheduled = posts.filter(p => p.status === 'scheduled');

  const totals = posted.reduce((acc, p) => ({
    likes: acc.likes + p.metrics.likes,
    comments: acc.comments + p.metrics.comments,
    shares: acc.shares + p.metrics.shares,
  }), { likes: 0, comments: 0, shares: 0 });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="text-sm text-gray-500">Connected Accounts</div>
          <div className="text-2xl font-semibold mt-1">{accounts.filter(a => a.connected).length} / {accounts.length}</div>
          <div className="mt-2 flex gap-2 flex-wrap">
            {accounts.map(a => <PlatformBadge key={a.id} platform={a.platform} />)}
          </div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-500">Scheduled Posts</div>
          <div className="text-2xl font-semibold mt-1">{scheduled.length}</div>
          <div className="mt-2 text-xs text-gray-500">Auto-post runs every few seconds</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-500">Engagement (posted)</div>
          <div className="text-2xl font-semibold mt-1">{totals.likes} ?? {totals.comments} ?? {totals.shares} ??</div>
          <div className="mt-2 text-xs text-gray-500">Simulated metrics for demo</div>
        </div>
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Posts</h2>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {posts.slice(0,6).map(p => (
            <div key={p.id} className="border rounded-lg p-3">
              <div className="text-sm font-medium">{p.caption}</div>
              <div className="text-xs text-gray-500 line-clamp-2">{p.hashtags.join(' ')}</div>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                {p.platforms.map(pl => <PlatformBadge key={pl} platform={pl as any} />)}
                <span className={`badge ${p.status==='posted'?'badge-success':p.status==='scheduled'?'badge-warning':'badge-muted'}`}>{p.status}</span>
                {p.status==='posted' && (
                  <span className="text-xs text-gray-600">{p.metrics.likes} ?? {p.metrics.comments} ?? {p.metrics.shares} ??</span>
                )}
              </div>
            </div>
          ))}
          {posts.length===0 && <div className="text-sm text-gray-500">No posts yet. Create one from the Composer.</div>}
        </div>
      </div>
    </div>
  );
}
