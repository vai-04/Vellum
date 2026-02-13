# VELLUM — Decision Intelligence Archive

A cinematic Decision Intelligence Archive built with React, Vite, Zustand, and Framer Motion.

## Overview

Vellum is not a note app, not a productivity tool, not a chatbot. It is a **cognitive preservation system** that captures the full lifecycle of human thought:

- **Chaos** → Scribble Layer (spatial thinking canvas)
- **Structure** → Decision Ritual (structured decision creation)
- **Analysis** → Agentic AI Analysis (cognitive bias auditing, regret forecasting)
- **Commitment** → Blockchain Archive (immutable decision lineage)
- **Memory** → Timeline Archive (intellectual history)

## Features

### ✨ Current Implementation

- **Beautiful Start Page** with animated entry
- **Apple-style Login** with glass morphism
- **Light/Dark Mode Toggle** with smooth transitions
- **Scribble Canvas** - Spatial thinking board with drawing, text, and shapes
- **Decision Modal** - Ritual interface for structured decision creation
- **AI Intelligence Panel** - Structured analytical cards (not a chatbot)
  - Reasoning Architect
  - Cognitive Bias Auditor
  - Regret Probability Forecaster
  - Missed Variable Synthesizer
- **Archive Timeline** - Narrative vertical timeline of decisions
- **Blockchain Commitment** - Simulated immutable archive with golden thread animation
- **Prism Glyph** - Floating AI invocation icon with rotation and glow

### 🎨 Design System

- **Deep Jewel Anchors**: Royal Purple, Wine Obsidian, Imperial Jade, Tyrian Authority
- **Interaction Palette**: Lavender Frost, Arctic Blue Frost, Mint Cognition, etc.
- **Liquid Glass System**: Subtle blur, edge lighting, inner highlights, soft glows
- **Premium Typography**: Cormorant Garamond, Crimson Pro, Literata

## Tech Stack

- **React** 18.3+ with Hooks
- **Vite** for blazing fast development
- **Zustand** for state management
- **Framer Motion** for animations
- **React Router** for navigation
- **Lucide React** for icons

## Installation & Setup

1. **Install Dependencies**
```bash
cd vellum-app
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

The app will open at `http://localhost:3000`

3. **Build for Production**
```bash
npm run build
```

4. **Preview Production Build**
```bash
npm run preview
```

## Usage

### First Time Experience

1. **Start Page**: Click "Get Started"
2. **Login**: Enter any email and password (dummy auth)
3. **Dashboard**: You'll see two views:
   - **Scribble Layer**: Draw, add text, add shapes
   - **Archive Timeline**: View your decision history

### Creating a Decision

1. Click **"Create Decision"** button at bottom center
2. Fill in the Decision Ritual modal:
   - Decision title
   - Multiple options
   - Constraints
   - Your reasoning
3. Click **"Analyze Decision"**
4. AI Panel automatically opens with structured analysis

### AI Analysis

Click the **Prism Glyph** (floating icon, bottom right) to toggle the AI Panel. It shows:
- Reasoning structure analysis
- Detected cognitive biases
- Short-term and long-term regret probability
- Missed variables you should consider

### Committing Decisions

In the Archive Timeline, click **"Commit to Archive"** to permanently commit a decision with:
- Golden thread animation
- Timestamp
- Hash (simulated blockchain)

### Theme Toggle

Click the sun/moon icon in the top-right navbar to switch between light and dark modes.

## Project Structure

```
vellum-app/
├── src/
│   ├── components/
│   │   ├── features/
│   │   │   ├── ScribbleCanvas.jsx    # Spatial thinking canvas
│   │   │   ├── DecisionModal.jsx     # Decision creation ritual
│   │   │   ├── AIPanel.jsx           # AI analysis drawer
│   │   │   └── Timeline.jsx          # Archive timeline
│   │   ├── layout/
│   │   │   └── Navbar.jsx            # Top navigation
│   │   └── ui/
│   │       ├── VellumButton.jsx      # Glass button primitive
│   │       ├── VellumInput.jsx       # Glass input primitive
│   │       └── PrismGlyph.jsx        # AI invocation icon
│   ├── pages/
│   │   ├── StartPage.jsx             # Landing page
│   │   ├── LoginPage.jsx             # Authentication
│   │   └── Dashboard.jsx             # Main app
│   ├── store/
│   │   └── vellumStore.js            # Zustand global state
│   ├── styles/
│   │   └── global.css                # Theme & animations
│   ├── App.jsx                       # Router & theme
│   └── main.jsx                      # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## State Management

The app uses Zustand for global state:

- **Theme**: Light/dark mode
- **Auth**: Login/logout, user data
- **Decisions**: Array of all decisions
- **Scribbles**: Array of canvas elements
- **AI Analysis**: Current AI analysis data
- **UI State**: Modal and panel visibility

## Future Enhancements

- Real AI integration (Claude API)
- Actual blockchain commitment (testnet)
- Advanced scribble tools (more shapes, colors)
- Multi-agent AI orchestration
- Wallet authentication
- Export decisions to PDF
- Collaborative decisions
- Mobile app

## Design Philosophy

This is a **cognitive cathedral**, not a dashboard. Every interaction should feel:
- Cinematic
- Premium
- Atmospheric
- Intelligent
- Ceremonial

## License

Private project - All rights reserved.

---

Built with ✦ by the Vellum team
