"use client";
import { useStore } from '../../lib/store';
import { PlatformBadge } from '../../components/PlatformBadge';

export default function AccountsPage() {
  const accounts = useStore(s => s.accounts);
  const toggle = useStore(s => s.toggleAccount);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Connected Accounts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {accounts.map(a => (
          <div key={a.id} className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium capitalize">{a.name}</div>
                <div className="mt-1"><PlatformBadge platform={a.platform} /></div>
              </div>
              <button
                className={`btn ${a.connected? 'btn-danger':'btn-primary'}`}
                onClick={() => toggle(a.id, !a.connected)}
              >
                {a.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
            <div className="mt-3 text-sm text-gray-500">
              {a.connected ? 'Connected and ready to post (simulated).'
                : 'Not connected. Connect to include in scheduling.'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
