"use client";

import { useCallback, useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { getTodayDateKey } from "@/lib/date";
import { getInitialAppState, loadAppState, saveAppState } from "@/lib/storage";
import type {
  AppState,
  DailyReview,
  Habit,
  HabitCategory,
  HabitLog,
} from "@/types/app";

export type CreateHabitInput = {
  name: string;
  category?: HabitCategory;
  minimumGoal: string;
  badDayGoal: string;
};

export type SaveDailyReviewInput = {
  date?: string;
  score: number;
  wins: string;
  blockers: string;
  tomorrowMinimum: string;
};

export type UseVoltaAppReturn = {
  state: AppState;
  todayDateKey: string;
  activeHabits: Habit[];
  todayLogs: HabitLog[];
  badDayModeToday: boolean;
  isTodayVictory: boolean;
  toggleHabitCompletedToday: (habitId: string) => void;
  setBadDayModeForToday: (enabled: boolean) => void;
  toggleBadDayModeForToday: () => void;
  createHabit: (input: CreateHabitInput) => Habit | null;
  pauseHabit: (habitId: string) => void;
  reactivateHabit: (habitId: string) => void;
  deleteHabit: (habitId: string) => void;
  saveDailyReview: (input: SaveDailyReviewInput) => DailyReview;
};

export function useVoltaApp(): UseVoltaAppReturn {
  const [state, setState] = useState<AppState>(() => getInitialAppState());
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);
  const todayDateKey = useMemo(() => getTodayDateKey(), []);

  useEffect(() => {
    setState(loadAppState());
    setHasLoadedStorage(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedStorage) {
      return;
    }

    saveAppState(state);
  }, [hasLoadedStorage, state]);

  const activeHabits = useMemo(
    () => state.habits.filter((habit) => habit.active),
    [state.habits],
  );

  const todayLogs = useMemo(
    () => state.logs.filter((log) => log.date === todayDateKey),
    [state.logs, todayDateKey],
  );

  const badDayModeToday = Boolean(state.badDayModeByDate[todayDateKey]);

  const completedTodayCount = useMemo(
    () => todayLogs.filter((log) => log.completed).length,
    [todayLogs],
  );

  const isTodayVictory = badDayModeToday
    ? completedTodayCount >= 1
    : completedTodayCount >= 2;

  const toggleHabitCompletedToday = useCallback(
    (habitId: string) => {
      setState((current) => {
        const existingLog = findLog(current.logs, habitId, todayDateKey);
        const isBadDayModeEnabled = Boolean(current.badDayModeByDate[todayDateKey]);

        if (existingLog) {
          return {
            ...current,
            logs: current.logs.map((log) =>
              log.id === existingLog.id
                ? {
                    ...log,
                    completed: !log.completed,
                    usedBadDayMode: !log.completed ? isBadDayModeEnabled : log.usedBadDayMode,
                  }
                : log,
            ),
          };
        }

        return {
          ...current,
          logs: [
            ...current.logs,
            {
              id: createId("log"),
              habitId,
              date: todayDateKey,
              completed: true,
              usedBadDayMode: isBadDayModeEnabled,
              createdAt: new Date().toISOString(),
            },
          ],
        };
      });
    },
    [todayDateKey],
  );

  const setBadDayModeForToday = useCallback(
    (enabled: boolean) => {
      setState((current) => ({
        ...current,
        badDayModeByDate: {
          ...current.badDayModeByDate,
          [todayDateKey]: enabled,
        },
      }));
    },
    [todayDateKey],
  );

  const toggleBadDayModeForToday = useCallback(() => {
    setState((current) => ({
      ...current,
      badDayModeByDate: {
        ...current.badDayModeByDate,
        [todayDateKey]: !current.badDayModeByDate[todayDateKey],
      },
    }));
  }, [todayDateKey]);

  const createHabit = useCallback((input: CreateHabitInput) => {
    const name = input.name.trim();
    const minimumGoal = input.minimumGoal.trim();
    const badDayGoal = input.badDayGoal.trim();

    if (!name || !minimumGoal || !badDayGoal) {
      return null;
    }

    const habit: Habit = {
      id: createId("habit"),
      name,
      category: input.category ?? "other",
      minimumGoal,
      badDayGoal,
      active: true,
      createdAt: new Date().toISOString(),
    };

    setState((current) => ({
      ...current,
      habits: [...current.habits, habit],
    }));

    return habit;
  }, []);

  const pauseHabit = useCallback((habitId: string) => {
    setHabitActive(setState, habitId, false);
  }, []);

  const reactivateHabit = useCallback((habitId: string) => {
    setHabitActive(setState, habitId, true);
  }, []);

  const deleteHabit = useCallback((habitId: string) => {
    setState((current) => ({
      ...current,
      habits: current.habits.filter((habit) => habit.id !== habitId),
      logs: current.logs.filter((log) => log.habitId !== habitId),
    }));
  }, []);

  const saveDailyReview = useCallback(
    (input: SaveDailyReviewInput) => {
      const date = input.date ?? todayDateKey;
      const existingReview = state.reviews.find((review) => review.date === date);
      const review: DailyReview = {
        id: existingReview?.id ?? createId("review"),
        date,
        score: input.score,
        wins: input.wins.trim(),
        blockers: input.blockers.trim(),
        tomorrowMinimum: input.tomorrowMinimum.trim(),
        createdAt: existingReview?.createdAt ?? new Date().toISOString(),
      };

      setState((current) => ({
        ...current,
        reviews: upsertReview(current.reviews, review),
      }));

      return review;
    },
    [state.reviews, todayDateKey],
  );

  return {
    state,
    todayDateKey,
    activeHabits,
    todayLogs,
    badDayModeToday,
    isTodayVictory,
    toggleHabitCompletedToday,
    setBadDayModeForToday,
    toggleBadDayModeForToday,
    createHabit,
    pauseHabit,
    reactivateHabit,
    deleteHabit,
    saveDailyReview,
  };
}

function findLog(logs: HabitLog[], habitId: string, date: string) {
  return logs.find((log) => log.habitId === habitId && log.date === date);
}

function upsertReview(reviews: DailyReview[], review: DailyReview) {
  const exists = reviews.some((item) => item.date === review.date);

  if (!exists) {
    return [...reviews, review];
  }

  return reviews.map((item) => (item.date === review.date ? review : item));
}

function setHabitActive(
  setState: Dispatch<SetStateAction<AppState>>,
  habitId: string,
  active: boolean,
) {
  setState((current) => ({
    ...current,
    habits: current.habits.map((habit) =>
      habit.id === habitId ? { ...habit, active } : habit,
    ),
  }));
}

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
