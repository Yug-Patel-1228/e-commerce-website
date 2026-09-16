export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow ? <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-accent">{eyebrow}</p> : null}
      <h2 className="serif text-4xl leading-tight md:text-6xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-sm leading-7 text-muted md:text-base">{subtitle}</p> : null}
    </div>
  );
}
