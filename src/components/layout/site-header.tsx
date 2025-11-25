"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "Headline", href: "/#headline" },
  { label: "Terbaru", href: "/#latest" },
  { label: "Trending", href: "/#trending" },
  { label: "Kategori", href: "/#kategori" },
  { label: "Newsletter", href: "#newsletter" },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const nav = useMemo(() => NAV_ITEMS, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-slate-950 text-white shadow-lg shadow-slate-900/30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-0">
        <Link
          href="/"
          className="text-xl font-black uppercase tracking-[0.5em] text-white"
        >
          Newsletter
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            aria-label="Cari berita"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-white hover:text-white md:flex"
          >
            <Search className="h-4 w-4" />
          </button>
          <Button
            size="sm"
            variant="outline"
            className="border-white/30 bg-white/10 text-white hover:border-white hover:bg-white/20"
            asChild
          >
            <Link href="#newsletter">Berlangganan</Link>
          </Button>
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-slate-900/95 px-4 py-4 text-sm uppercase tracking-[0.3em] md:hidden">
          <nav className="flex flex-col gap-4">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/70 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#newsletter"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-full border border-white/20 px-4 py-2 text-center text-white"
            >
              Berlangganan
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
