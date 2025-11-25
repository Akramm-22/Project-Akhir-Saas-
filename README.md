<div align="center">

# Minimal Community — Blog & API

Web + API stack yang mereplikasi desain [Figma Minimal Blog Community](https://www.figma.com/design/qIjpbLlfZV1MjbTPMxy2AF/Minimal-Blog--Community-?node-id=0-1&p=f&t=67isWirKYtLtb5Kr-0) dengan peningkatan UI modern, animasi halus, serta koneksi data nyata antara Next.js (frontend) dan Express (backend).

</div>

## Tech Stack

- **Frontend:** Next.js 16 (App Router, TypeScript), Tailwind CSS v4, Framer Motion, Lucide Icons
- **Backend:** Express.js + TypeScript, Zod validation, Helmet + CORS
- **Tooling:** npm, ESLint (Next default), TS path alias, Radix Slot, Node 20+

## Project Structure

```
berita-islam/
├─ src/
│  ├─ app/                    # Next.js App Router
│  │  ├─ layout.tsx          # Root layout dengan metadata SEO
│  │  ├─ page.tsx            # Homepage
│  │  ├─ globals.css         # Global styles & Tailwind
│  │  └─ posts/
│  │     └─ [id]/
│  │        └─ page.tsx      # Dynamic post detail page
│  ├─ components/
│  │  ├─ layout/             # Header & Footer
│  │  │  ├─ site-header.tsx
│  │  │  └─ site-footer.tsx
│  │  ├─ sections/           # Page sections
│  │  │  ├─ hero-section.tsx
│  │  │  ├─ content-hub.tsx
│  │  │  ├─ community-section.tsx
│  │  │  └─ newsletter-section.tsx
│  │  └─ ui/                 # Reusable UI components
│  │     ├─ button.tsx
│  │     ├─ badge.tsx
│  │     └─ skeleton.tsx
│  └─ lib/                   # Utilities & API client
│     ├─ api.ts              # API functions
│     ├─ config.ts           # API endpoints config
│     ├─ types.ts            # TypeScript types
│     └─ utils.ts            # Helper functions
├─ public/                   # Static assets
├─ server/                   # Express API (TypeScript)
│  ├─ src/
│  │  ├─ app.ts             # Express app setup
│  │  ├─ index.ts           # Server entry point
│  │  ├─ config/            # Configuration
│  │  ├─ controllers/       # Route controllers
│  │  ├─ routes/            # API routes
│  │  ├─ services/          # Business logic
│  │  ├─ middleware/        # Express middleware
│  │  ├─ validators/        # Zod schemas
│  │  ├─ types/             # TypeScript types
│  │  └─ data/              # Mock data
│  ├─ package.json
│  └─ tsconfig.json
├─ next.config.ts
├─ package.json              # Frontend scripts/deps
└─ README.md
```

## Environment Variables

Buat file environment variables berikut:

- **Frontend `.env.local` (di root):**
  ```
  NEXT_PUBLIC_API_URL=http://localhost:5000/api
  ```

- **Backend `server/.env`:**
  ```
  PORT=5000
  NODE_ENV=development
  CORS_ORIGIN=http://localhost:3000
  ```

> **Catatan:** Buat file `.env.local` di root dan `.env` di folder `server/` secara manual dengan konten di atas. File `.env.example` tidak dapat dibuat otomatis karena pembatasan workspace.

## Getting Started

Clone repo lalu install dependensi frontend:

```bash
npm install
```

Install dependensi backend:

```bash
cd server
npm install
```

### Development

Jalankan API terlebih dahulu (default port `5000`):

```bash
cd server
npm run dev
```

Kemudian jalankan Next.js (default port `3000`):

```bash
npm run dev
```

Kunjungi `http://localhost:3000` untuk melihat UI yang sudah mengambil data dari `http://localhost:5000/api`.

### Production Build

```bash
# frontend
npm run build
npm start

# backend
cd server
npm run build
npm start
```

Deploy frontend ke Vercel/Node hosting apa pun, dan deploy folder `server` ke layanan Node (Railway, Render, dsb). Jangan lupa men-set `NEXT_PUBLIC_API_URL` di environment frontend agar menunjuk ke domain API produksi.

## API Reference

Semua endpoint diprefiks `http://<HOST>:<PORT>/api`.

| Method | Endpoint                    | Deskripsi                                    |
| ------ | --------------------------- | -------------------------------------------- |
| GET    | `/posts`                    | List artikel, dukung query `featured`, `category` |
| GET    | `/posts/:id`                | Detail artikel berdasarkan ID                |
| POST   | `/posts`                    | Membuat artikel baru (Zod validated)         |
| PUT    | `/posts/:id`                | Memperbarui artikel                          |
| DELETE | `/posts/:id`                | Menghapus artikel                            |
| POST   | `/newsletter/subscribe`     | Menyimpan subscriber newsletter              |
| GET    | `/health`                   | Cek status API                               |


