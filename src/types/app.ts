export type HabitCategory =
  | "study"
  | "training"
  | "personal"
  | "organization"
  | "other";

export type Habit = {
  id: string;
  name: string;
  category: HabitCategory;
  minimumGoal: string;
  badDayGoal: string;
  active: boolean;
  createdAt: string;
};

export type HabitLog = {
  id: string;
  habitId: string;
  date: string;
  completed: boolean;
  usedBadDayMode: boolean;
  createdAt: string;
};

export type DailyReview = {
  id: string;
  date: string;
  score: number;
  wins: string;
  blockers: string;
  tomorrowMinimum: string;
  createdAt: string;
};

export type AppState = {
  habits: Habit[];
  logs: HabitLog[];
  reviews: DailyReview[];
  badDayModeByDate: Record<string, boolean>;
};

export const HABIT_CATEGORIES: Record<HabitCategory, string> = {
  study: "Estudo",
  training: "Treino",
  personal: "Pessoal",
  organization: "Organização",
  other: "Outro",
};

export const DEFAULT_HABITS: Habit[] = [
  {
    id: "study-programming",
    name: "Estudar programação",
    category: "study",
    minimumGoal: "Estudar por 25 minutos",
    badDayGoal: "Ler ou revisar um conceito",
    active: true,
    createdAt: "2026-05-05T00:00:00.000Z",
  },
  {
    id: "training-movement",
    name: "Treinar ou se movimentar",
    category: "training",
    minimumGoal: "Treinar ou caminhar por 20 minutos",
    badDayGoal: "Alongar por 2 minutos",
    active: true,
    createdAt: "2026-05-05T00:00:00.000Z",
  },
  {
    id: "personal-development",
    name: "Desenvolvimento pessoal",
    category: "personal",
    minimumGoal: "Ler, refletir ou praticar algo útil",
    badDayGoal: "Anotar uma ideia importante",
    active: true,
    createdAt: "2026-05-05T00:00:00.000Z",
  },
  {
    id: "organize-something",
    name: "Organizar algo",
    category: "organization",
    minimumGoal: "Organizar um item, arquivo ou espaço",
    badDayGoal: "Guardar uma coisa fora do lugar",
    active: true,
    createdAt: "2026-05-05T00:00:00.000Z",
  },
];
