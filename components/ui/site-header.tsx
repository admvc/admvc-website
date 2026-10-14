// components/ui/site-header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MEMBERS_AREA_URL, SITE_NAME } from "@/lib/constants";

type NavItem = { href: string; label: string };

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav: NavItem[] = [
    { href: "/", label: "Inicio" },
    { href: "/sobre", label: "Sobre" },
    { href: "/congregacoes", label: "Congregacoes" },
    { href: "/ministerios", label: "Ministerios" },
    { href: "/agenda", label: "Agenda" },
    { href: "/permanecer", label: "Permanecer" },
    { href: "/contato", label: "Contato" }
  ];

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-soft bg-bg/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-12 w-12 md:h-14 md:w-14 overflow-hidden rounded-2xl border border-soft bg-bg2">
            <Image
              src="/images/logo_admvc.png"
              alt={`${SITE_NAME} - Logo`}
              fill
              sizes="(max-width: 768px) 48px, 56px"
              className="object-contain"
              priority
            />
          </div>
          <div className="leading-tight">
            <div className="text-base font-semibold text-fg">{SITE_NAME}</div>
            <div className="text-xs text-muted2">Figueira da Foz - Leiria - Barcelos</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-5">
          {nav.map((i) => (
            <Link key={i.href} href={i.href}
              className={`text-sm transition ${pathname === i.href ? "text-fg font-semibold" : "text-muted hover:text-fg"}`}>
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={MEMBERS_AREA_URL} className="btn btn-primary hidden sm:inline-flex"
            target="_blank" rel="noopener noreferrer">
            Area de Membros
          </a>
          <button type="button" onClick={() => setOpen(v => !v)}
            className="md:hidden inline-flex items-center justify-center rounded-xl border border-soft bg-bg2 px-3 py-2 text-fg"
            aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Fechar menu" : "Abrir menu"}>
            <span className="text-lg" aria-hidden="true">{open ? "\u2715" : "\u2630"}</span>
          </button>
        </div>
      </div>

      <div id="mobile-nav" className={`md:hidden border-t border-soft bg-bg/95 backdrop-blur ${open ? "block" : "hidden"}`}>
        <div className="mx-auto w-full max-w-6xl px-4 py-4 space-y-3">
          <div className="grid gap-2">
            {nav.map((i) => (
              <Link key={i.href} href={i.href} onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm ${
                  pathname === i.href ? "border-soft bg-bg2 text-fg font-semibold" : "border-soft bg-bg2/50 text-muted hover:text-fg"
                }`}>
                <span>{i.label}</span>
              </Link>
            ))}
          </div>
          <a href={MEMBERS_AREA_URL} className="btn btn-primary w-full justify-center"
            target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            Area de Membros
          </a>
        </div>
      </div>
    </header>
  );
}
