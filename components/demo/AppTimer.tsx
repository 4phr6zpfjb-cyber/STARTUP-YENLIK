"use client";

interface Props {
  seconds: number;
  limitSeconds: number;
}

const format = (total: number) => {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

export const AppTimer = ({ seconds, limitSeconds }: Props) => {
  const pct = Math.min((seconds / limitSeconds) * 100, 120);
  const tone = pct > 100 ? "text-petal" : pct > 80 ? "text-butter-deep" : "text-text-primary";
  const fill = pct > 100 ? "bg-petal" : pct > 80 ? "bg-butter" : "bg-lavender";
  return (
    <div className="space-y-4 text-center">
      <p className={`text-5xl md:text-6xl font-bold tracking-tight ${tone}`} style={{ fontFamily: "monospace" }}>
        {format(seconds)}
      </p>
      <div className="h-2 overflow-hidden rounded bg-border">
        <div className={`h-full ${fill} transition-all duration-1000 linear`} style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
    </div>
  );
};
