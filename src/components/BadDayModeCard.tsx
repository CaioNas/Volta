type BadDayModeCardProps = {
  active: boolean;
  onToggle: () => void;
};

export function BadDayModeCard({ active, onToggle }: BadDayModeCardProps) {
  return (
    <section
      className={`h-full rounded-lg border p-4 transition sm:min-w-72 lg:p-5 ${
        active ? "border-clay/30 bg-clay/10" : "border-black/[0.08] bg-mist"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-ink">Modo dia difícil</h2>
          <p className="mt-2 text-sm leading-6 text-ink/65">
            Hoje você não precisa dar conta de tudo. Só precisa manter um fio.
          </p>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className={`flex h-8 w-14 shrink-0 items-center rounded-full p-1 transition hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-clay/20 ${
            active ? "bg-clay" : "bg-ink/20"
          }`}
          aria-pressed={active}
          aria-label={active ? "Desativar modo dia difícil" : "Ativar modo dia difícil"}
        >
          <span
            className={`h-6 w-6 rounded-full bg-white shadow-sm transition ${
              active ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {active ? (
        <p className="mt-4 rounded-lg border border-clay/20 bg-white/80 px-3 py-2 text-sm font-medium text-clay">
          O mínimo de hoje ainda conta.
        </p>
      ) : null}
    </section>
  );
}
