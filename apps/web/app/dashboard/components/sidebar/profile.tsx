'use client';

import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Settings, LogOut, Shield, Sun, Moon, ChevronsUpDown } from 'lucide-react';
import { signOut } from '@/app/(auth)/actions';
import { isAdmin } from '@/lib/admin';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Profile {
  name: string | null;
  email: string;
  avatarUrl: string | null;
}

export function SidebarProfile({ profile }: { profile: Profile }) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const initials =
    profile.name?.charAt(0)?.toUpperCase() ??
    profile.email.charAt(0).toUpperCase();

  return (
    <div className="sidebar-profile">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" className="sidebar-profile-trigger">
            <Avatar className="h-8 w-8">
              {profile.avatarUrl && <AvatarImage src={profile.avatarUrl} alt={profile.name ?? 'User'} />}
              <AvatarFallback className="bg-muted text-sm font-medium text-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {profile.name ?? 'User'}
              </p>
              <p className="truncate text-xs text-muted-foreground">{profile.email}</p>
            </div>
            <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="start" className="w-56">
          <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
            <Settings className="h-4 w-4" />
            Account
          </DropdownMenuItem>
          {isAdmin(profile.email) && (
            <DropdownMenuItem onClick={() => router.push('/dashboard/admin')}>
              <Shield className="h-4 w-4" />
              Admin
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()} variant="destructive">
            <LogOut className="h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
