import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { LoginForm } from '@/components/auth/login-form';
import { AuthVisualPanel } from '@/components/auth/auth-visual-panel';

export default function LoginPage() {
  return (
    <div className="grid min-h-svh bg-background lg:grid-cols-2">
      <div className="auth-form-side relative flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Rocket className="size-4" />
            </div>
            Padlift
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="hidden h-full lg:block">
        <AuthVisualPanel />
      </div>
    </div>
  );
}
