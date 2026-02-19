import { Waves } from "lucide-react";

export default function InteractionBadge({ level, max, isActive }) {
  const percentage = (level / max) * 100;

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-ocean-900/60 rounded-xl border border-ocean-700/30">
      <Waves size={16} className="text-ocean-400" />

      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-ocean-300 font-medium">
            Nivel {level}/{max}
          </span>
          {!isActive && (
            <span className="text-xs text-amber-400 font-semibold">
              Sesión completada
            </span>
          )}
        </div>

        <div className="w-full h-1.5 bg-ocean-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${percentage}%`,
              background: isActive
                ? "linear-gradient(90deg, #0ea5e9, #38bdf8)"
                : "linear-gradient(90deg, #f59e0b, #fbbf24)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
