"use client";

import { signOut } from "next-auth/react";
import { MobileMenu } from "@/components/layout/mobile-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white px-4 py-4 md:px-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <MobileMenu />

          <div className="min-w-0">
            <p className="truncate text-[11px] font-medium uppercase tracking-wide text-slate-500 md:text-xs">
              Painel administrativo
            </p>
            <h2 className="truncate text-base font-semibold text-slate-900 md:text-xl">
              Sistema de Obras
            </h2>
          </div>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="hidden rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 md:inline-flex"
        >
          Sair
        </button>
      </div>
    </header>
  );
}