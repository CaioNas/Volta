"use client";

import { useState } from "react";
import {
  HABIT_CATEGORIES,
  type Habit,
  type HabitCategory,
} from "@/types/app";
import type { CreateHabitInput } from "@/hooks/useVoltaApp";

type HabitManagerProps = {
  habits: Habit[];
  onCreateHabit: (input: CreateHabitInput) => Habit | null;
  onPauseHabit: (habitId: string) => void;
  onReactivateHabit: (habitId: string) => void;
  onDeleteHabit: (habitId: string) => void;
};

const categoryOptions = Object.entries(HABIT_CATEGORIES) as Array<
  [HabitCategory, string]
>;

export function HabitManager({
  habits,
  onCreateHabit,
  onPauseHabit,
  onReactivateHabit,
  onDeleteHabit,
}: HabitManagerProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<HabitCategory>("other");
  const [minimumGoal, setMinimumGoal] = useState("25 minutos");
  const [badDayGoal, setBadDayGoal] = useState("5 minutos");
  const [error, setError] = useState("");

  const activeHabits = habits.filter((habit) => habit.active);
  const pausedHabits = habits.filter((habit) => !habit.active);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      setError("Informe o nome do hábito.");
      return;
    }

    const created = onCreateHabit({
      name,
      category,
      minimumGoal: minimumGoal.trim() || "25 minutos",
      badDayGoal: badDayGoal.trim() || "5 minutos",
    });

    if (!created) {
      setError("Informe o nome do hábito.");
      return;
    }

    setName("");
    setCategory("other");
    setMinimumGoal("25 minutos");
    setBadDayGoal("5 minutos");
    setError("");
  }

  function handleDelete(habit: Habit) {
    const confirmed = window.confirm(`Remover o hábito "${habit.name}"?`);

    if (confirmed) {
      onDeleteHabit(habit.id);
    }
  }

  return (
    <section className="rounded-lg border border-black/[0.08] bg-white/95 p-5 shadow-soft sm:p-7 lg:p-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-moss">
          Hábitos
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">
          Ajuste seus recomeços.
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
        <div className="grid gap-4 lg:grid-cols-4">
          <Field label="Nome">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-12 rounded-lg border border-black/[0.08] bg-white px-3 text-sm outline-none transition placeholder:text-ink/35 focus:border-moss/40 focus:ring-4 focus:ring-moss/20"
              placeholder="Novo hábito"
            />
          </Field>

          <Field label="Categoria">
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as HabitCategory)}
              className="h-12 rounded-lg border border-black/[0.08] bg-white px-3 text-sm outline-none transition focus:border-moss/40 focus:ring-4 focus:ring-moss/20"
            >
              {categoryOptions.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Meta mínima normal">
            <input
              value={minimumGoal}
              onChange={(event) => setMinimumGoal(event.target.value)}
              className="h-12 rounded-lg border border-black/[0.08] bg-white px-3 text-sm outline-none transition focus:border-moss/40 focus:ring-4 focus:ring-moss/20"
            />
          </Field>

          <Field label="Meta para dia difícil">
            <input
              value={badDayGoal}
              onChange={(event) => setBadDayGoal(event.target.value)}
              className="h-12 rounded-lg border border-black/[0.08] bg-white px-3 text-sm outline-none transition focus:border-moss/40 focus:ring-4 focus:ring-moss/20"
            />
          </Field>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            className="rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-moss focus:outline-none focus:ring-4 focus:ring-moss/20"
          >
            Criar hábito
          </button>
          {error ? <p className="text-sm font-medium text-clay">{error}</p> : null}
        </div>
      </form>

      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        <HabitGroup
          title="Ativos"
          emptyMessage="Nenhum hábito ativo agora. Reative um hábito pausado ou crie um novo ponto de volta."
          habits={activeHabits}
          actionLabel="Pausar"
          onAction={onPauseHabit}
          onDelete={handleDelete}
        />
        <HabitGroup
          title="Pausados"
          emptyMessage="Nenhum hábito pausado. Quando precisar de espaço, você pode pausar sem apagar."
          habits={pausedHabits}
          actionLabel="Reativar"
          onAction={onReactivateHabit}
          onDelete={handleDelete}
        />
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  children: React.ReactNode;
};

function Field({ label, children }: FieldProps) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}

type HabitGroupProps = {
  title: string;
  emptyMessage: string;
  habits: Habit[];
  actionLabel: string;
  onAction: (habitId: string) => void;
  onDelete: (habit: Habit) => void;
};

function HabitGroup({
  title,
  emptyMessage,
  habits,
  actionLabel,
  onAction,
  onDelete,
}: HabitGroupProps) {
  return (
    <div className="rounded-lg border border-black/[0.08] bg-mist p-4">
      <h3 className="text-base font-semibold text-ink">{title}</h3>

      <div className="mt-3 grid gap-3">
        {habits.length ? (
          habits.map((habit) => (
            <div
              key={habit.id}
              className="rounded-lg border border-black/[0.08] bg-white p-3 transition hover:border-black/15"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="font-semibold text-ink">{habit.name}</p>
                  <p className="mt-1 text-sm text-ink/58">
                    {HABIT_CATEGORIES[habit.category]}
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => onAction(habit.id)}
                    className="rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-xs font-semibold text-ink transition hover:border-moss/40 hover:text-moss focus:outline-none focus:ring-4 focus:ring-moss/20"
                  >
                    {actionLabel}
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(habit)}
                    className="rounded-lg border border-clay/25 bg-white px-3 py-2 text-xs font-semibold text-clay transition hover:bg-clay/10 focus:outline-none focus:ring-4 focus:ring-clay/20"
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="rounded-lg border border-black/[0.08] bg-white px-3 py-4 text-sm leading-6 text-ink/55">
            {emptyMessage}
          </p>
        )}
      </div>
    </div>
  );
}
