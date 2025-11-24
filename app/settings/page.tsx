"use client";
import { useStore } from '../../lib/store';

export default function SettingsPage() {
  const clear = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('agentic-social-store');
      window.location.reload();
    }
  };
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Settings</h1>
      <div className="card p-4 space-y-3">
        <div className="text-sm text-gray-600">Data</div>
        <button className="btn btn-danger" onClick={clear}>Reset all local data</button>
        <div className="text-xs text-gray-500">This app stores data locally in your browser for demo purposes.</div>
      </div>
      <div className="card p-4 space-y-3">
        <div className="text-sm text-gray-600">About</div>
        <div className="text-sm text-gray-700">Agentic Social Manager ? demo multi-platform scheduler inspired by Hootsuite/Buffer.</div>
      </div>
    </div>
  );
}
