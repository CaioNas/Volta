import { BadDayModeCard } from "@/components/BadDayModeCard";
import { HabitCard } from "@/components/HabitCard";
import type { Habit, HabitLog } from "@/types/app";

type TodayDashboardProps = {
  activeHabits: Habit[];
  todayLogs: HabitLog[];
  badDayModeToday: boolean;
  isTodayVictory: boolean;
  onToggleBadDayMode: () => void;
  onToggleHabit: (habitId: string) => void;
};

export function TodayDashboard({
  activeHabits,
  todayLogs,
  badDayModeToday,
  isTodayVictory,
  onToggleBadDayMode,
  onToggleHabit,
}: TodayDashboardProps) {
  const completedHabitIds = getCompletedHabitIds(todayLogs);
  const completedActiveHabits = activeHabits.filter((habit) =>
    completedHabitIds.has(habit.id),
  ).length;
  const totalActiveHabits = activeHabits.length;
  const progressPercentage = totalActiveHabits
    ? Math.round((completedActiveHabits / totalActiveHabits) * 100)
    : 0;

  return (
    <section className="rounded-lg border border-black/[0.08] bg-white/95 p-5 shadow-soft sm:p-7 lg:p-8">
      <div className="grid gap-5 lg:grid-cols-[1fr_minmax(360px,0.55fr)] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
            Hoje
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
            Um passo de hoje já ajuda a voltar.
          </h2>
          <p className="mt-3 text-sm leading-6 text-ink/65">
            {completedActiveHabits} de {totalActiveHabits} hábitos concluídos
          </p>
        </div>

        <BadDayModeCard active={badDayModeToday} onToggle={onToggleBadDayMode} />
      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-mist">
        <div
          className="h-full rounded-full bg-moss transition-all"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div
        className={`mt-6 rounded-lg border px-4 py-3 text-sm font-medium ${
          isTodayVictory
            ? "border-moss/30 bg-moss/10 text-moss"
            : "border-black/[0.08] bg-mist text-ink/72"
        }`}
      >
        {isTodayVictory
          ? "Hoje já conta. Você apareceu por você."
          : "Faça só o mínimo de hoje."}
      </div>

      <div className="mt-6 grid gap-3 xl:grid-cols-2 xl:gap-4">
        {activeHabits.length ? (
          activeHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              completed={completedHabitIds.has(habit.id)}
              badDayMode={badDayModeToday}
              onToggle={() => onToggleHabit(habit.id)}
            />
          ))
        ) : (
          <div className="rounded-lg border border-black/[0.08] bg-mist px-4 py-5 text-sm leading-6 text-ink/62">
            Nenhum hábito ativo agora. Reative um hábito pausado ou crie um novo
            recomeço no gerenciador.
          </div>
        )}
      </div>
    </section>
  );
}

function getCompletedHabitIds(todayLogs: HabitLog[]) {
  return new Set(
    todayLogs.filter((log) => log.completed).map((log) => log.habitId),
  );
}
