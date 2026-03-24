import Link from 'next/link';
import { Lock } from 'lucide-react';

export function SectionCard({
  title,
  icon: Icon,
  children,
  danger,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <div className={`settings-section-card ${danger ? 'settings-section-card-danger' : ''}`}>
      <div className={`settings-section-header ${danger ? 'settings-section-header-danger' : ''}`}>
        <Icon className={`h-4 w-4 ${danger ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground'}`} />
        <h2 className={`text-sm font-semibold ${danger ? 'text-red-600 dark:text-red-400' : 'text-foreground'}`}>
          {title}
        </h2>
      </div>
      <div className="settings-section-body">{children}</div>
    </div>
  );
}

export function FeatureGate({ allowed, feature, children }: {
  allowed: boolean;
  feature: string;
  children: React.ReactNode;
}) {
  if (allowed) return <>{children}</>;
  return (
    <div className="relative">
      <div className="pointer-events-none opacity-40">{children}</div>
      <div className="settings-feature-gate-overlay">
        <div className="settings-feature-gate-banner">
          <Lock className="h-4 w-4 shrink-0" />
          <span>{feature} requires an upgrade.</span>
          <Link href="/dashboard/settings" className="ml-2 shrink-0 font-medium underline">
            Upgrade
          </Link>
        </div>
      </div>
    </div>
  );
}

export function InputField({
  label,
  value,
  onChange,
  placeholder,
  readOnly,
  mono,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  mono?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`settings-input ${readOnly ? 'settings-input-readonly' : ''} ${mono ? 'font-mono' : ''}`}
      />
    </div>
  );
}
