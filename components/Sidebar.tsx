"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Home, PlusSquare, Settings, Users } from 'lucide-react';
import clsx from 'classnames';

const NavLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: any }) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link href={href} className={clsx('flex items-center gap-3 rounded-md px-3 py-2 text-sm', active ? 'bg-brand-50 text-brand-700' : 'hover:bg-gray-100 text-gray-700')}>
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  );
};

export function Sidebar() {
  return (
    <aside className="hidden md:block w-64 border-r bg-white">
      <div className="p-4">
        <div className="mb-4">
          <div className="text-xs font-semibold text-gray-500 mb-2">Navigation</div>
          <div className="space-y-1">
            <NavLink href="/" label="Dashboard" icon={Home} />
            <NavLink href="/calendar" label="Calendar" icon={Calendar} />
            <NavLink href="/composer" label="Composer" icon={PlusSquare} />
            <NavLink href="/accounts" label="Accounts" icon={Users} />
            <NavLink href="/settings" label="Settings" icon={Settings} />
          </div>
        </div>
      </div>
    </aside>
  );
}
