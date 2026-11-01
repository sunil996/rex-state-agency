interface SectionHeadingProps {
  number?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  number,
  title,
  subtitle,
  light = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 md:mb-14 ${className}`}>
      <div className="mb-3 flex items-baseline gap-3">
        {number ? (
          <span className="text-sm font-medium tracking-[0.2em] text-rex-gold">
            {number}
          </span>
        ) : null}
        <h2
          className={`font-display text-2xl font-semibold uppercase tracking-[0.08em] md:text-3xl ${
            light ? "text-white" : "text-rex-ink"
          }`}
        >
          {title}
        </h2>
      </div>
      {subtitle ? (
        <p
          className={`max-w-2xl text-base leading-relaxed md:text-lg ${
            light ? "text-white/70" : "text-rex-stone"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
