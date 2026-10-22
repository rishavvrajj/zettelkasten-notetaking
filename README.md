<div align="center">

# Zettelkasten

**The minimalist knowledge workspace for deep thinkers.**  
*Obsidian-grade power meets Notion-inspired elegance.*

[Features](#-features) • [Architecture](#-architecture) • [Getting Started](#-getting-started) • [Tech Stack](#-tech-stack)

</div>

---

## ⚡ Overview

**Zettelkasten** is a high-performance, distraction-free knowledge management system designed for atomic note-taking, bi-directional linking, and visual mapping of ideas. Built with a unified dark aesthetic (`#1E1E1E`), it bridges the gap between structured documentation and fluid thought capture.

---

## 🌟 Features

- **Multi-Pane Obsidian Workspace (`/notes`)**
  - **Activity Bar & File Explorer**: Collapsible folder trees, folder-specific note creation, and real-time search.
  - **Tab Navigation**: Seamless multi-tab management with instant switching and closing.
  - **Distraction-Free Editor**: Separated H1 title input and clean plain text body editing with character tracking.
  - **Interactive Knowledge Graph**: SVG visualization rendering live bi-directional wiki-link connections and clickable nodes.
  - **Document Outline**: Automatic extraction and hierarchy rendering of note headings.
- **Notion-Style Marketing Landing Page (`/`)**
  - Premium presentation featuring hero preview, announcement banners, feature grids, social proof, and pricing tiers.
- **Local-First Persistence**
  - Instant client-side saving via `localStorage` with zero latency.

---

## 🛠️ Tech Stack

- **Core**: [Next.js 16](https://nextjs.org/) (App Router), React 19
- **Styling**: Tailwind CSS (Unified dark theme)
- **Language**: TypeScript
- **Icons & Graphics**: Custom SVG / Lucide-inspired iconography

---

## 🚀 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/rishavvrajj/note-taking.git
cd note-taking
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```text
src/
├── app/                  # Next.js App Router pages (landing & /notes workspace)
├── components/           # Obsidian workspace & UI components
│   ├── ObsidianEditor.tsx
│   ├── ObsidianSidebar.tsx
│   ├── ObsidianTabNav.tsx
│   ├── ObsidianActivityBar.tsx
│   └── ObsidianRightPanel.tsx
├── lib/                  # Graph generator, heading extractors, mock seed notes
└── types/                # TypeScript interfaces & types
```

---

## 📄 License

MIT License — built for the open-source community.
