import { getTodayDateKey, getWeekDays } from "@/lib/date";
import type { AppState } from "@/types/app";

type StatsCardsProps = {
  logs: AppState["logs"];
  badDayModeByDate: AppState["badDayModeByDate"];
};

type DayStats = {
  completedCount: number;
  hasRecord: boolean;
  victory: boolean;
};

export function StatsCards({ logs, badDayModeByDate }: StatsCardsProps) {
  const todayDateKey = getTodayDateKey();
  const completedToday = countCompletedHabits(logs, todayDateKey);
  const weekStats = getWeekDays().map((day) =>
    getDayStats(logs, badDayModeByDate, day.dateKey),
  );
  const weeklyVictories = weekStats.filter((day) => day.victory).length;
  const daysWithRecords = weekStats.filter((day) => day.hasRecord).length;
  const weeklyReturns = countReturns(weekStats);

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-4">
      <StatCard
        label="Hábitos de hoje"
        value={completedToday}
        helper="feitos até agora"
      />
      <StatCard
        label="Vitórias mínimas"
        value={weeklyVictories}
        helper="dias em que você apareceu"
      />
      <StatCard
        label="Dias com registro"
        value={daysWithRecords}
        helper="na semana atual"
      />
      <StatCard
        label="Retornos"
        value={weeklyReturns}
        helper="recomeços depois de pausa"
      />
    </section>
  );
}

type StatCardProps = {
  label: string;
  value: number;
  helper: string;
};

function StatCard({ label, value, helper }: StatCardProps) {
  return (
    <article className="rounded-lg border border-black/[0.08] bg-white/90 p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-black/15 sm:p-5 lg:p-6">
      <p className="text-sm font-medium text-ink/58">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-ink">{value}</p>
      <p className="mt-1 text-xs font-medium text-ink/45">{helper}</p>
    </article>
  );
}

function getDayStats(
  logs: AppState["logs"],
  badDayModeByDate: AppState["badDayModeByDate"],
  dateKey: string,
): DayStats {
  const completedCount = countCompletedHabits(logs, dateKey);
  const victoryGoal = badDayModeByDate[dateKey] ? 1 : 2;

  return {
    completedCount,
    hasRecord: completedCount > 0,
    victory: completedCount >= victoryGoal,
  };
}

function countCompletedHabits(logs: AppState["logs"], dateKey: string) {
  return new Set(
    logs
      .filter((log) => log.date === dateKey && log.completed)
      .map((log) => log.habitId),
  ).size;
}

function countReturns(days: DayStats[]) {
  return days.reduce((total, day, index) => {
    if (index === 0) {
      return total;
    }

    return !days[index - 1].victory && day.victory ? total + 1 : total;
  }, 0);
}
