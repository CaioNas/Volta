import {
  DEFAULT_HABITS,
  type AppState,
  type DailyReview,
  type Habit,
  type HabitCategory,
  type HabitLog,
} from "@/types/app";

const APP_STORAGE_KEY = "volta-app-state-v1";

export function getInitialAppState(): AppState {
  return {
    habits: DEFAULT_HABITS.map((habit) => ({ ...habit })),
    logs: [],
    reviews: [],
    badDayModeByDate: {},
  };
}

export function loadAppState(): AppState {
  if (typeof window === "undefined") {
    return getInitialAppState();
  }

  const raw = safeGetItem(APP_STORAGE_KEY);

  if (!raw) {
    return getInitialAppState();
  }

  try {
    return normalizeAppState(JSON.parse(raw));
  } catch {
    return getInitialAppState();
  }
}

export function saveAppState(state: AppState): void {
  if (typeof window === "undefined") {
    return;
  }

  safeSetItem(APP_STORAGE_KEY, JSON.stringify(state));
}

export function resetAppState(): void {
  if (typeof window === "undefined") {
    return;
  }

  safeRemoveItem(APP_STORAGE_KEY);
}

function safeGetItem(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable or full. The app should keep working in memory.
  }
}

function safeRemoveItem(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Storage can be unavailable. Reset remains a no-op in that case.
  }
}

function normalizeAppState(value: unknown): AppState {
  if (!isRecord(value)) {
    return getInitialAppState();
  }

  const initialState = getInitialAppState();

  return {
    habits: normalizeHabits(value.habits, initialState.habits),
    logs: normalizeLogs(value.logs),
    reviews: normalizeReviews(value.reviews),
    badDayModeByDate: normalizeBadDayModeByDate(value.badDayModeByDate),
  };
}

function normalizeHabits(value: unknown, fallback: Habit[]): Habit[] {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const habits = value.filter(isHabit);

  return habits.length ? habits : fallback;
}

function normalizeLogs(value: unknown): HabitLog[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isHabitLog);
}

function normalizeReviews(value: unknown): DailyReview[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isDailyReview);
}

function normalizeBadDayModeByDate(value: unknown): Record<string, boolean> {
  if (!isRecord(value)) {
    return {};
  }

  return Object.entries(value).reduce<Record<string, boolean>>(
    (result, [dateKey, enabled]) => {
      if (isDateKey(dateKey) && typeof enabled === "boolean") {
        result[dateKey] = enabled;
      }

      return result;
    },
    {},
  );
}

function isHabit(value: unknown): value is Habit {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    isHabitCategory(value.category) &&
    typeof value.minimumGoal === "string" &&
    typeof value.badDayGoal === "string" &&
    typeof value.active === "boolean" &&
    typeof value.createdAt === "string"
  );
}

function isHabitLog(value: unknown): value is HabitLog {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.habitId === "string" &&
    isDateKey(value.date) &&
    typeof value.completed === "boolean" &&
    typeof value.usedBadDayMode === "boolean" &&
    typeof value.createdAt === "string"
  );
}

function isDailyReview(value: unknown): value is DailyReview {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    isDateKey(value.date) &&
    typeof value.score === "number" &&
    typeof value.wins === "string" &&
    typeof value.blockers === "string" &&
    typeof value.tomorrowMinimum === "string" &&
    typeof value.createdAt === "string"
  );
}

function isHabitCategory(value: unknown): value is HabitCategory {
  return (
    value === "study" ||
    value === "training" ||
    value === "personal" ||
    value === "organization" ||
    value === "other"
  );
}

function isDateKey(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
