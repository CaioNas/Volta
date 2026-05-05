import type { Habit, HabitLog } from "@/types/app";

type HeaderProps = {
  activeHabits: Habit[];
  todayLogs: HabitLog[];
};

export function Header({ activeHabits, todayLogs }: HeaderProps) {
  const completedHabitIds = getCompletedHabitIds(todayLogs);
  const completedActiveHabits = activeHabits.filter((habit) =>
    completedHabitIds.has(habit.id),
  ).length;
  const progressPercentage = activeHabits.length
    ? Math.round((completedActiveHabits / activeHabits.length) * 100)
    : 0;

  return (
    <header className="flex flex-col gap-5 rounded-lg border border-black/[0.08] bg-white/90 p-5 shadow-soft sm:flex-row sm:items-end sm:justify-between sm:p-7 lg:p-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss">
          Volta
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-normal text-ink sm:text-5xl">
          Volta
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-ink/68">
          Não é sobre perfeição. É sobre voltar com calma.
        </p>
      </div>

      <div className="w-full rounded-lg border border-black/[0.08] bg-mist px-4 py-3 sm:w-auto sm:min-w-52 lg:px-5 lg:py-4">
        <p className="text-sm text-ink/60">Progresso</p>
        <p className="mt-1 text-2xl font-semibold text-ink">{progressPercentage}%</p>
      </div>
    </header>
  );
}

function getCompletedHabitIds(todayLogs: HabitLog[]) {
  return new Set(
    todayLogs.filter((log) => log.completed).map((log) => log.habitId),
  );
}
