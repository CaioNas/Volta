import { formatDateLabel, getWeekDays } from "@/lib/date";
import type { AppState } from "@/types/app";

type WeeklyScoreProps = {
  logs: AppState["logs"];
  badDayModeByDate: AppState["badDayModeByDate"];
};

type DayStatus = "Vitória mínima" | "Parcial" | "Sem registro";

export function WeeklyScore({ logs, badDayModeByDate }: WeeklyScoreProps) {
  const weekDays = getWeekDays();
  const daySummaries = weekDays.map((day) => {
    const completedCount = countCompletedHabits(logs, day.dateKey);
    const badDayMode = Boolean(badDayModeByDate[day.dateKey]);
    const victoryGoal = badDayMode ? 1 : 2;
    const status = getDayStatus(completedCount, victoryGoal);

    return {
      dateKey: day.dateKey,
      label: formatDateLabel(day.dateKey),
      completedCount,
      status,
    };
  });
  const victoryCount = daySummaries.filter(
    (day) => day.status === "Vitória mínima",
  ).length;
  const daysWithRecords = daySummaries.filter(
    (day) => day.status !== "Sem registro",
  ).length;

  return (
    <section className="rounded-lg border border-black/[0.08] bg-white/95 p-5 shadow-soft sm:p-7 lg:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-moss">
            Semana
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">Semana de volta</h2>
        </div>
        <div className="rounded-lg border border-black/[0.08] bg-mist px-4 py-3">
          <p className="text-sm text-ink/60">Vitórias mínimas</p>
          <p className="mt-1 text-2xl font-semibold text-ink">{victoryCount}/7</p>
        </div>
      </div>

      {daysWithRecords === 0 ? (
        <p className="mt-5 rounded-lg border border-black/[0.08] bg-mist px-4 py-3 text-sm leading-6 text-ink/62">
          A semana ainda está sem registro. Um hábito marcado já começa o recomeço.
        </p>
      ) : null}

      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-7 xl:gap-3">
        {daySummaries.map((day) => (
          <div
            key={day.dateKey}
            className={`min-h-24 rounded-lg border p-3 transition ${
              day.status === "Vitória mínima"
                ? "border-moss/30 bg-moss/10"
                : day.status === "Parcial"
                  ? "border-clay/25 bg-clay/5"
                  : "border-black/[0.08] bg-white"
            }`}
          >
            <p className="text-sm font-semibold text-ink">{day.label}</p>
            <p
              className={`mt-2 text-sm font-medium ${
                day.status === "Vitória mínima"
                  ? "text-moss"
                  : day.status === "Parcial"
                    ? "text-clay"
                    : "text-ink/45"
              }`}
            >
              {day.status}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-5 text-sm font-medium text-ink/65">
        {victoryCount} de 7 dias aparecendo por você
      </p>
    </section>
  );
}

function countCompletedHabits(logs: AppState["logs"], dateKey: string) {
  const completedHabitIds = new Set(
    logs
      .filter((log) => log.date === dateKey && log.completed)
      .map((log) => log.habitId),
  );

  return completedHabitIds.size;
}

function getDayStatus(completedCount: number, victoryGoal: number): DayStatus {
  if (completedCount >= victoryGoal) {
    return "Vitória mínima";
  }

  if (completedCount > 0) {
    return "Parcial";
  }

  return "Sem registro";
}
