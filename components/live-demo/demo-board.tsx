interface LiveDemoBoardProps {
  title: string;
  subtitle: string;
  cells: string[];
  disabled?: boolean;
  statusTone?: 'neutral' | 'active' | 'success' | 'danger';
  onCellClick?: (index: number) => void;
}

const statusToneClassName: Record<NonNullable<LiveDemoBoardProps['statusTone']>, string> = {
  neutral: 'border-border2 bg-surface2 text-muted',
  active: 'border-[rgba(47,156,235,0.35)] bg-[rgba(47,156,235,0.1)] text-accent',
  success: 'border-[rgba(61,214,140,0.35)] bg-[rgba(61,214,140,0.1)] text-green',
  danger: 'border-[rgba(240,164,41,0.35)] bg-[rgba(240,164,41,0.1)] text-amber',
};

export function LiveDemoBoard({
  title,
  subtitle,
  cells,
  disabled = false,
  statusTone = 'neutral',
  onCellClick,
}: LiveDemoBoardProps) {
  return (
    <div className="rounded-[8px] border border-border bg-[rgba(8,12,16,0.6)] p-3 sm:p-4">
      <div className="mb-3 flex items-start justify-between gap-3 sm:mb-4">
        <div>
          <h3 className="font-display text-[16px] font-semibold tracking-[-0.02em] text-text sm:text-[18px]">{title}</h3>
          <p className="mt-1 text-[12px] text-muted sm:text-[13px]">{subtitle}</p>
        </div>
        <div className={`rounded-[999px] border px-2 py-1 text-[10px] font-medium sm:px-2.5 sm:text-[11px] ${statusToneClassName[statusTone]}`}>{disabled ? 'Locked' : 'Live'}</div>
      </div>

      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        {cells.map((value, index) => (
          <button
            key={`${title}-${index}`}
            type="button"
            disabled={disabled || !onCellClick}
            onClick={() => onCellClick?.(index)}
            className="aspect-square min-h-[72px] rounded-[6px] border border-border2 bg-surface2 font-display text-[clamp(26px,10vw,42px)] font-semibold tracking-[-0.04em] text-text transition hover:border-accent2 hover:bg-[rgba(47,156,235,0.08)] disabled:cursor-not-allowed disabled:hover:border-border2 disabled:hover:bg-surface2 sm:min-h-[88px]"
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}
