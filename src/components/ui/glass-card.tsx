import { cn } from "@/lib/utils";

interface GlassCardProps {
  variant?: "default" | "amber";
  size?: "default" | "sm";
  className?: string;
  children: React.ReactNode;
}

export function GlassCard({
  variant = "default",
  size = "default",
  className,
  children,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        variant === "amber" ? "glass-amber" : "glass",
        size === "sm" ? "rounded-xl" : "rounded-2xl",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardLabelProps {
  variant?: "default" | "primary";
  className?: string;
  children: React.ReactNode;
}

export function CardLabel({ variant = "default", className, children }: CardLabelProps) {
  return (
    <p
      className={cn(
        "text-xs font-mono tracking-widest uppercase",
        variant === "primary" ? "text-primary/70" : "text-muted-foreground",
        className
      )}
    >
      {children}
    </p>
  );
}
