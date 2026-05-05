"use client";

import { AppShell } from "@/components/AppShell";
import { DailyReviewForm } from "@/components/DailyReviewForm";
import { HabitManager } from "@/components/HabitManager";
import { Header } from "@/components/Header";
import { StatsCards } from "@/components/StatsCards";
import { TodayDashboard } from "@/components/TodayDashboard";
import { WeeklyScore } from "@/components/WeeklyScore";
import { useVoltaApp } from "@/hooks/useVoltaApp";

export default function Home() {
  const {
    activeHabits,
    badDayModeToday,
    createHabit,
    deleteHabit,
    isTodayVictory,
    pauseHabit,
    reactivateHabit,
    saveDailyReview,
    state,
    todayDateKey,
    todayLogs,
    toggleBadDayModeForToday,
    toggleHabitCompletedToday,
  } = useVoltaApp();
  const todayReview = state.reviews.find((review) => review.date === todayDateKey);

  return (
    <AppShell>
      <Header activeHabits={activeHabits} todayLogs={todayLogs} />

      <StatsCards
        logs={state.logs}
        badDayModeByDate={state.badDayModeByDate}
      />

      <TodayDashboard
        activeHabits={activeHabits}
        todayLogs={todayLogs}
        badDayModeToday={badDayModeToday}
        isTodayVictory={isTodayVictory}
        onToggleBadDayMode={toggleBadDayModeForToday}
        onToggleHabit={toggleHabitCompletedToday}
      />

      <WeeklyScore
        logs={state.logs}
        badDayModeByDate={state.badDayModeByDate}
      />

      <DailyReviewForm
        key={todayReview?.id ?? "new-review"}
        review={todayReview}
        onSave={saveDailyReview}
      />

      <HabitManager
        habits={state.habits}
        onCreateHabit={createHabit}
        onPauseHabit={pauseHabit}
        onReactivateHabit={reactivateHabit}
        onDeleteHabit={deleteHabit}
      />
    </AppShell>
  );
}
