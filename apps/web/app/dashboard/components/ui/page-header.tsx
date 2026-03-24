import { type ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  badge?: ReactNode;
}

export function PageHeader({ title, description, actions, badge }: PageHeaderProps) {
  return (
    <div className="sticky top-0 z-10 border-b border-border bg-background">
      <div className="flex h-14 items-center justify-between px-5">
        <div className="flex items-center gap-3 overflow-hidden">
          <h1 className="truncate text-sm font-semibold text-foreground">{title}</h1>
          {badge}
          {description && (
            <span className="hidden truncate text-sm text-dimmed-foreground sm:inline">{description}</span>
          )}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
