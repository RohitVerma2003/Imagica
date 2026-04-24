interface Props {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (val: number) => void;
  unit?: string;
}

export default function Slider({
  label,
  value,
  min,
  max,
  onChange,
  unit = "",
}: Props) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-slate-400">
        <span>{label}</span>
        <span className="text-orange-400 font-medium">
          {value} {unit}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-orange-500"
      />
    </div>
  );
}