import { Instagram, Facebook, Pin } from 'lucide-react';

export function PlatformBadge({ platform }: { platform: 'instagram' | 'facebook' | 'pinterest' }) {
  const styles = {
    instagram: 'bg-pink-100 text-pink-700',
    facebook: 'bg-blue-100 text-blue-700',
    pinterest: 'bg-red-100 text-red-700',
  } as const;
  const Icon = platform === 'instagram' ? Instagram : platform === 'facebook' ? Facebook : Pin;
  return (
    <span className={`badge ${styles[platform]} capitalize`}>
      <Icon className="h-3.5 w-3.5" /> {platform}
    </span>
  );
}
