# The Reading Engineer

The Reading Engineer is a premium, structurally immersive Library Analytics & Reviews platform built for archiving, tracking, and analyzing lifetime reading habits. It features a complete pipeline for Goodreads data ingestion, interactive data visualizations, deep-dive literary analysis pages, and a stunning dark-glassmorphic UI designed specifically to emulate the visual texture of physical books and premium editorial experiences.

## Features

- **Full Library Telemetry:** Securely ingest Goodreads reading exports natively into the MongoDB cloud database.
- **Library Analytics Grid:** Features detailed metric breakdowns including "Pages Absorbed" and "Average Rating" counters, supported by interactive Framer Motion animations.
- **Reading Velocity Tracker:** A dynamic area chart constructed using `recharts` to map reading cadence across the year.
- **Interactive Story & Review Archives:** Read detailed story analyses and personal book reviews through robust, premium text renderers with full Markdown support.
- **Premium Glassmorphic UI:** A dark, visually-stunning structural template equipped with custom SVG layout tearing (`TornEdge`), soft background gradients, and seamless infinite scroll cover marquees.
- **Responsive Architecture:** Fully rebuilt to guarantee perfect fluidity from large desktop spaces down to narrow mobile device constraints.

## Tech Stack

- **Frontend Core:** Next.js (App Router), React
- **Animations & Layout:** Framer Motion
- **Data Visualization:** Recharts
- **Styling:** CSS Modules / Vanilla CSS integrated with CSS-in-JS variables (`globals.css`)
- **Backend & API:** Next.js Server Actions & API Routes
- **Database:** MongoDB Atlas & Mongoose
- **Icons:** Lucide React

## Getting Started

First, make sure you have your environment variables set up properly in `.env.local`:

```
MONGODB_URI=your_mongodb_connection_string
ADMIN_PASSWORD=your_secure_admin_password
```

Then, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Analytics Data Ingestion

Included in the `/scripts` directory are standalone Node.js handlers meant to bootstrap the database using an exported Goodreads `.csv` data payload:

- `importGoodreads.js`: Ingests a raw Goodreads structural export directly into MongoDB.
- `fetchCovers.js`: Automatically proxies to the OpenLibrary API to backfill missing cover image payloads based on parsed ISBN matrices.

```bash
# Execute against your DB instance
node scripts/importGoodreads.js
```

## Structure

- `/app`: Next.js 14 App Router structural components, pages, and API endpoints. 
- `/components`: Modular frontend artifacts (e.g., `CoverMarquee`, `TornEdge`, `Navbar`, `Footer`, `IntroAnimation`).
- `/lib`: Utility instances such as the centralized `mongodb` connection utility.
- `/models`: Mongoose database schemas defining bounds for `GoodreadsBook`, `Review`, `Analysis`, etc.
- `/scripts`: One-off standalone ingestion pipelines.

## License

This project is tailored for personal archival use by The Reading Engineer but serves as an open structural template for advanced UI data rendering.
