import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-3 py-4 text-ink sm:px-5 sm:py-6 lg:px-6 xl:px-8">
      <div className="mx-auto flex w-full flex-col gap-5 sm:gap-6">
        {children}
      </div>
    </main>
  );
}
