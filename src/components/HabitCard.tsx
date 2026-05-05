import { HABIT_CATEGORIES, type Habit } from "@/types/app";

type HabitCardProps = {
  habit: Habit;
  completed: boolean;
  badDayMode: boolean;
  onToggle: () => void;
};

export function HabitCard({ habit, completed, badDayMode, onToggle }: HabitCardProps) {
  return (
    <article
      className={`min-h-36 rounded-lg border p-4 transition sm:p-5 ${
        completed
          ? "border-moss/35 bg-mist"
          : "border-black/[0.08] bg-white hover:border-moss/35 hover:bg-mist/40"
      }`}
    >
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={onToggle}
          className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md border text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-moss/20 ${
            completed
              ? "border-moss bg-moss text-white"
              : "border-black/20 bg-white text-transparent hover:border-moss"
          }`}
          aria-pressed={completed}
          aria-label={
            completed
              ? `Desmarcar ${habit.name} por enquanto`
              : `Marcar ${habit.name} como feito hoje`
          }
        >
          ✓
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <h3 className="text-base font-semibold text-ink">{habit.name}</h3>
            <span className="w-fit rounded-full border border-black/[0.08] bg-white/75 px-2.5 py-1 text-xs font-medium text-ink/62">
              {HABIT_CATEGORIES[habit.category]}
            </span>
          </div>

          <p className="mt-2 text-sm leading-6 text-ink/62">
            {badDayMode ? habit.badDayGoal : habit.minimumGoal}
          </p>

          <p
            className={`mt-3 text-xs font-medium ${
              completed ? "text-moss" : "text-ink/45"
            }`}
          >
            {completed ? "Feito hoje" : "Aberto para hoje"}
          </p>
        </div>
      </div>
    </article>
  );
}
