import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-slate-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 lg:flex-row lg:px-0">
        <div className="flex-1 space-y-4">
          <p className="text-sm uppercase tracking-[0.4em] text-white/60">Newsletter</p>
          <h3 className="text-3xl font-semibold leading-tight">
            Berita Islam terbaru, analisis geopolitik, dan liputan sosial dari penjuru
            Nusantara.
          </h3>
          <p className="text-sm text-white/70">
            Dikelola oleh tim redaksi independen dengan jejaring koresponden pesantren,
            kampus, dan komunitas muslim muda.
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-8 lg:flex-row">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
              Kanal
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {[
                { label: "Headline", href: "/#headline" },
                { label: "Berita Terbaru", href: "/#latest" },
                { label: "Trending", href: "/#trending" },
                { label: "Kategori", href: "/#kategori" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
              Kantor Redaksi
            </h4>
            <p className="mt-4 text-sm text-white/80">
              Jl. KH. Wahid Hasyim No.17
              <br />
              Jakarta Pusat, Indonesia
            </p>
            <p className="mt-2 text-sm text-white/50">editor@newsletter.id</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
              Ikuti Kami
            </h4>
            <div className="mt-4 flex gap-4 text-white/70">
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs uppercase tracking-[0.3em] text-white/50">
        © {new Date().getFullYear()} Newsletter • Semua hak cipta dilindungi
      </div>
    </footer>
  );
}
