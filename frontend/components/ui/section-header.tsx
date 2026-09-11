interface SectionHeaderProps {
  number?: string;
  title: string;
  className?: string;
}

export function SectionHeader({ number, title, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex items-baseline gap-3 mb-12 md:mb-16 ${className}`}>
      {number && (
        <span className="font-technical text-xs md:text-sm text-muted tracking-wider">
          {number}
        </span>
      )}
      <h2 className="text-xs md:text-sm uppercase tracking-[0.2em] text-muted font-medium">
        {title}
      </h2>
    </div>
  );
}
