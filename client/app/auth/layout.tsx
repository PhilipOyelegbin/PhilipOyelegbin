import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative isolate flex min-h-[calc(100vh-8rem)] flex-1 items-center justify-center overflow-hidden bg-[#0a0a0c] px-6 py-16 sm:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#7c3aed]/10 blur-3xl" />
        <div className="absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-[#ff6b35]/10 blur-3xl" />
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(210,187,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(210,187,255,0.04)_1px,transparent_1px)] bg-size-[48px_48px]"
          aria-hidden="true"
        />
      </div>
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </main>
  );
}
