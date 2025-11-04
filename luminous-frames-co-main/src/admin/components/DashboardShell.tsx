import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function DashboardShell({
  children,
  className,
  title,
  description,
  ...props
}: DashboardShellProps) {
  return (
    <div className="flex-1 space-y-4 px-8 pt-6" {...props}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          {title && <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>}
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className={cn("space-y-4", className)}>
        <Card className="p-6">{children}</Card>
      </div>
    </div>
  );
}