# ⌨️ Unified Developer Keyboard Shortcuts Cheat Sheet

A premium, keyboard-centric interactive cheat sheet designed for rapid context-switching. Automatically adapts keybindings based on your active operating system while prioritizing core frontend and software engineering platforms.

**🔗 Live Demo:** [https://frontend-dev-shortcuts.vercel.app/](https://frontend-dev-shortcuts.vercel.app/)

---

## ⚡ Core Features

* **Dynamic OS Detection & Localization:** Automatically detects and translates system key notations on load (e.g., mapping `ctrl` to `⌘ Cmd` and `alt` to `⌥ Opt` on macOS). Includes native macOS `control` overrides for precise bindings.
* **Interactive OS Switcher:** Allows developers to preview shortcut combinations for **Windows**, **macOS**, and **Linux** dynamically with a single toggle.
* **Core Dev Priority Filters:** On load, the interface focuses exclusively on Frontend and general engineering categories (VS Code, Edge/Chrome, Git, Vimium). General productivity and creative design applications (Office, Adobe Creative Suite) can be unlocked instantly via the **Show Productivity & Design Apps** panel.
* **Instant Keyboard Navigation:** Press `/` anywhere on the screen to focus the global fuzzy-search bar immediately.
* **Atomic Architecture:** Highly modular layout separating atomic styling primitives (`Button`, `Card`, `Kbd`) from isolated feature-specific selectors and grids.

---

## 🛠️ Technology Stack

* **Framework:** [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite](https://vitejs.dev/) (Ultra-fast HMR)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Modern CSS-first approach, natively compiled)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Formatting Utilities:** `clsx` & `tailwind-merge`

---

## 📂 Project Architecture

The codebase utilizes an **Atomic and Domain-Driven design** to isolate reusable UI wrappers from dynamic state logic:

```text
src/
├── data/                      # Structured shortcut datasets
│   └── shortcuts.json         # Master database with OS overrides
├── utils/
│   ├── os.ts                  # OS detection & key symbol translator
│   └── cn.ts                  # Tailwind class merge utility
├── components/
│   ├── ui/                    # Reusable atomic elements (Atoms)
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Kbd.tsx            # Realistic keyboard keycap container
│   └── features/              # Feature specific modules (Molecules/Organisms)
│       └── shortcuts/
│           ├── components/    # Sub-components isolated to shortcut filtering
│           │   ├── CategoryFilter.tsx
│           │   ├── SearchBar.tsx
│           │   ├── ShortcutCard.tsx
│           │   └── ShortcutList.tsx
│           ├── hooks/         # Custom dynamic filtering hooks
│           │   └── useShortcuts.ts
│           └── types.ts       # Structural TypeScript definitions
├── App.tsx                    # Main viewport layout container
├── main.tsx
└── index.css                  # Tailwind imports
```

---

## 🚀 Getting Started

To spin up a local development environment or compile a production bundle:

### 1. Installation
Install your node modules using clean installations:
```bash
npm ci
```

### 2. Development Mode
Run the local Vite HMR server:
```bash
npm run dev
```
Open your browser to `http://localhost:5173`.

### 3. Build & Compile
Run the TypeScript compiler and optimize output for production delivery:
```bash
npm run build
```
The compiled output will generate in the `/dist` directory, ready to deploy seamlessly on Vercel or Netlify.
