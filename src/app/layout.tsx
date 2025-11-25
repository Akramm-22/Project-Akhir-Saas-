import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://berita-islam.example.com"),
  title: {
    default: "Newsletter Islam | Berita, Analisis, dan Sorotan Umat",
    template: "%s | Newsletter Islam",
  },
  description:
    "Portal berita Islam modern dengan liputan politik, ekonomi syariah, teknologi, dan gaya hidup muslim.",
  openGraph: {
    title: "Newsletter Islam — Berita dan Analisis Terkini",
    description:
      "Portal berita Islam modern dengan liputan politik, ekonomi syariah, teknologi, dan gaya hidup muslim.",
    url: "https://berita-islam.example.com",
    siteName: "Newsletter Islam",
    images: [
      {
        url: "https://images.unsplash.com/photo-1488998527040-85054a85150e?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Newsletter Islam — Berita dan Analisis Terkini",
    description:
      "Portal berita Islam modern dengan liputan politik, ekonomi syariah, teknologi, dan gaya hidup muslim.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${jakarta.variable} ${playfair.variable} bg-slate-100 antialiased`}>
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,#04111f,#0a1d2f_60%,#0f172a)] pb-16">
          <SiteHeader />
          <main className="mx-auto w-full max-w-6xl -translate-y-12 space-y-12 px-4 pb-12 lg:px-0">
            {children}
          </main>
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
