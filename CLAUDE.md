# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server at http://localhost:3000
npm run build      # Production build (source maps disabled, outputs to /build)
npm test           # Jest in interactive watch mode
```

The build script at the repo root (`../build.sh`) sets `NODE_OPTIONS=--openssl-legacy-provider` before building — required for Node 22 compatibility.

The app is served at the `/todo` sub-path in production (see `"homepage": "/todo"` in package.json).

## Architecture

React 18 + TypeScript SPA using Create React App. State is managed entirely in Redux (Redux Toolkit + Thunk). The backend API lives at `https://cbox.info/todoapi` (configured in `public/config/config.json`).

### Directory layout

```
src/
├── controls/          # React UI components
├── data/
│   ├── controllers/   # main-component.tsx — maps app state to which component renders
│   ├── props/         # Prop interfaces for every component
│   ├── store/         # Redux store shape (store.ts)
│   ├── value/         # Domain value objects
│   └── server-data/   # API response types
├── reducer/
│   ├── actions/       # ~40 action creators (one file each)
│   ├── effects/       # Pure reducer helpers for complex state transitions
│   └── central-reducer.ts  # Dispatches all actions to the right effect
├── service/server.ts  # All HTTP calls (Fetch + Axios for file uploads)
└── util/              # Date formatting, search parsing, constants, logger
```

### Key patterns

**Routing is state-driven:** `data/controllers/main-component.tsx` reads from the Redux store and returns which React component to render. There is no React Router.

**Reducers are split by concern:** `central-reducer.ts` is a single switch statement that delegates each action to a function in `reducer/effects/`. Add new actions there and register them in `central-reducer.ts`.

**API calls flow:** component dispatches a thunk action → action calls `service/server.ts` → on success dispatches a result action (e.g. `ACTION_AFTER_LOGIN`) → reducer updates store.

**Multi-user:** The store holds a `persons[]` array and a `token` for the active user. `AddLogin` / `ACTION_AFTER_ADDITIONAL_LOGIN` manage switching between users.

### Notable dependencies

- `otpauth` — TOTP support for two-factor login
- `moment-timezone` — date parsing/display (hardcoded to `America/Toronto`)
- `axios` — used only for file uploads (progress tracking); everything else uses Fetch
- `universal-cookie` — session cookie management
