'use client';

import { Rocket } from 'lucide-react';
import Link from 'next/link';
import { SidebarNav } from './nav';
import { SidebarProfile } from './profile';
import './styles.css';

interface Profile {
  id: string;
  name: string | null;
  email: string;
  avatarUrl: string | null;
  plan: string;
}

export function Sidebar({ profile }: { profile: Profile }) {
  return (
    <aside className="sidebar-root">
      <div className="sidebar-logo">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <Rocket className="h-5 w-5 text-blue-500" />
          <span className="text-lg font-bold tracking-tight text-foreground">Padlift</span>
        </Link>
      </div>
      <SidebarNav email={profile.email} />
      <SidebarProfile profile={profile} />
    </aside>
  );
}
