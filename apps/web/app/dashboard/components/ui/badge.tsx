type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple';

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-muted text-muted-foreground',
  success: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400',
  warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400',
  error: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400',
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
}

export function Badge({ children, variant = 'default', dot }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]}`}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            variant === 'success' ? 'bg-green-600 dark:bg-green-400' :
            variant === 'warning' ? 'bg-yellow-600 dark:bg-yellow-400' :
            variant === 'error' ? 'bg-red-600 dark:bg-red-400' :
            variant === 'info' ? 'bg-blue-600 dark:bg-blue-400' :
            variant === 'purple' ? 'bg-purple-600 dark:bg-purple-400' :
            'bg-gray-500 dark:bg-gray-400'
          }`}
        />
      )}
      {children}
    </span>
  );
}
