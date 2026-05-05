"use client";

import { useState } from "react";
import type { DailyReview } from "@/types/app";
import type { SaveDailyReviewInput } from "@/hooks/useVoltaApp";

type DailyReviewFormProps = {
  review?: DailyReview;
  onSave: (input: SaveDailyReviewInput) => DailyReview;
};

export function DailyReviewForm({ review, onSave }: DailyReviewFormProps) {
  const [score, setScore] = useState(review?.score ?? 5);
  const [wins, setWins] = useState(review?.wins ?? "");
  const [blockers, setBlockers] = useState(review?.blockers ?? "");
  const [tomorrowMinimum, setTomorrowMinimum] = useState(
    review?.tomorrowMinimum ?? "",
  );
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSave({
      score,
      wins,
      blockers,
      tomorrowMinimum,
    });
    setSaved(true);
  }

  return (
    <section className="rounded-lg border border-black/[0.08] bg-white/95 p-5 shadow-soft sm:p-7 lg:p-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-clay">
          Revisão diária
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">
          Guarde o que ajuda a voltar.
        </h2>
        {!review ? (
          <p className="mt-3 rounded-lg border border-black/[0.08] bg-mist px-4 py-3 text-sm leading-6 text-ink/62">
            Ainda não há revisão salva hoje. Escreva só o suficiente para lembrar
            do próximo passo.
          </p>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4 xl:grid-cols-3 xl:items-start">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-ink">Nota do dia</span>
          <div className="flex flex-col gap-3 rounded-lg border border-black/[0.08] bg-mist p-4 sm:flex-row sm:items-center">
            <input
              type="range"
              min="0"
              max="10"
              value={score}
              onChange={(event) => setScore(Number(event.target.value))}
              className="w-full accent-moss"
            />
            <input
              type="number"
              min="0"
              max="10"
              value={score}
              onChange={(event) => setScore(clampScore(Number(event.target.value)))}
              className="h-11 w-20 rounded-lg border border-black/[0.08] bg-white px-3 text-center text-sm font-semibold outline-none transition focus:border-moss/40 focus:ring-4 focus:ring-moss/20"
              aria-label="Nota do dia de 0 a 10"
            />
          </div>
        </label>

        <ReviewTextarea
          label="O que eu fiz bem hoje?"
          value={wins}
          onChange={setWins}
        />
        <ReviewTextarea
          label="O que deixou o dia mais difícil?"
          value={blockers}
          onChange={setBlockers}
        />
        <ReviewTextarea
          label="Qual é o mínimo de amanhã?"
          value={tomorrowMinimum}
          onChange={setTomorrowMinimum}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center xl:col-span-3">
          <button
            type="submit"
            className="rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-moss focus:outline-none focus:ring-4 focus:ring-moss/20"
          >
            Salvar revisão
          </button>

          {saved ? (
            <p className="text-sm font-medium text-moss">
              Revisão salva. Amanhã tem um ponto de partida.
            </p>
          ) : null}
        </div>
      </form>
    </section>
  );
}

type ReviewTextareaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function ReviewTextarea({ label, value, onChange }: ReviewTextareaProps) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-ink">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={3}
        className="min-h-28 resize-y rounded-lg border border-black/[0.08] bg-white px-3 py-3 text-sm leading-6 text-ink outline-none transition placeholder:text-ink/35 focus:border-moss/40 focus:ring-4 focus:ring-moss/20"
      />
    </label>
  );
}

function clampScore(value: number) {
  if (Number.isNaN(value)) {
    return 0;
  }

  return Math.min(10, Math.max(0, value));
}
