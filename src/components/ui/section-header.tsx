import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  titleLead: string;
  titleHighlight: string;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  titleLead,
  titleHighlight,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(className)}>
      <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">{eyebrow}</p>
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
        {titleLead}
        <br />
        <span className="text-gradient">{titleHighlight}</span>
      </h2>
    </div>
  );
}
