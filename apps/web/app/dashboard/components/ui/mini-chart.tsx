interface MiniChartProps {
  data: number[];
  color?: string;
  height?: number;
}

export function MiniChart({ data, color = '#3b82f6', height = 32 }: MiniChartProps) {
  if (data.length === 0) return null;

  const max = Math.max(...data, 1);
  const barWidth = 100 / data.length;

  return (
    <svg
      viewBox={`0 0 100 ${height}`}
      className="w-full"
      style={{ height }}
      preserveAspectRatio="none"
    >
      {data.map((value, i) => {
        const barHeight = (value / max) * height;
        return (
          <rect
            key={i}
            x={i * barWidth + barWidth * 0.15}
            y={height - barHeight}
            width={barWidth * 0.7}
            height={barHeight}
            rx={1}
            fill={color}
            opacity={0.6 + (i / data.length) * 0.4}
          />
        );
      })}
    </svg>
  );
}
