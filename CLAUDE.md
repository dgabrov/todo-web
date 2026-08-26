# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + Redux todo web application bootstrapped with Create React App. It's a TypeScript project with server integration for persisting todo items, handling user authentication, and managing multiple people's todo lists.

## Development Setup & Commands

### Common Commands
- `npm start` — Start dev server at http://localhost:3000 (uses NODE_OPTIONS for legacy OpenSSL provider)
- `npm test` — Run tests in watch mode (interactive)
- `npm run build` — Production build with source maps disabled
- `npm run eject` — One-way operation to expose webpack config (don't use unless necessary)

### Running Single Tests
The project uses Create React App's test runner. To run a single test file in watch mode:
```bash
npm test -- path/to/test-file.test.ts --watch
```

### Why NODE_OPTIONS Flag
The `NODE_OPTIONS=--openssl-legacy-provider` flag is set in `npm start` and `npm build` scripts to support the older OpenSSL provider, required by the current webpack/React version.

## Architecture

### Redux State Management Pattern

The app uses **Redux with Redux Thunk** middleware for async operations. Data flows through a unified pattern:

1. **Actions** (`src/reducer/actions/`) — Pure action creators that define state changes
2. **Effects** (`src/reducer/effects/`) — Thunk creators that handle async logic and side effects
3. **Reducer** (`src/reducer/central-reducer.ts`) — Single reducer that handles all actions
4. **Store** (`src/data/store/`) — Centralized state tree

### Data Flow Example
When saving a todo:
1. UI component dispatches `createEffectSaveTodo(editData)`
2. Effect makes API call to `server.ts`
3. API response triggers `createActionAfterUpdateTodo` to update state
4. State change causes connected component to re-render

### Key Directories

- **`src/controls/`** — React components (Header, Todo, EditTodo, Login, Bulk, etc.)
- **`src/data/`** — TypeScript interfaces and value objects
  - `store/` — Store shape and initialization
  - `props/` — Component prop types and selectors
  - `value/` — Data transfer objects (TodoData, EditTodoData, etc.)
  - `config/` — Configuration and API endpoints
- **`src/reducer/`** — Redux setup
  - `central-reducer.ts` — Main reducer dispatching to action handlers
  - `actions/` — Action creators and reducers (e.g., `action-add-todo-item.ts` exports both `createActionAddTodoItem` and `createReducerAddTodoItem`)
  - `effects/` — Async operations (e.g., `effect-save-todo.ts` calls server and dispatches follow-up actions)
- **`src/service/`** — Server communication layer using fetch API
- **`src/util/`** — Utility functions
  - `constants.ts` — App constants (messageRefreshMs, VERSION_NUMBER, defaultPriority)
  - `store-util.ts` — Redux helpers (processError)
  - `date/` — Date parsing and formatting utilities
  - `search/` — Search parsing logic

### Action Pattern

Each action file exports:
- `ACTION_CONSTANT` — String constant
- `createAction*` — Action creator function
- `createReducer*` — Pure reducer function (takes current store and action, returns updated store)

Example:
```typescript
export const ACTION_ADD_TODO_ITEM = 'ACTION_ADD_TODO_ITEM';
export const createActionAddTodoItem = (): ActionAddTodoItem => ({type: ACTION_ADD_TODO_ITEM})
export const createReducerAddTodoItem = (store, action): Store => ({...store, ...{edit, state}})
```

### Effect Pattern

Effects are Redux Thunk middleware functions. They:
1. Take `dispatch` and `getStore` arguments
2. Perform async work (typically API calls via `server.ts`)
3. Dispatch follow-up actions with results
4. Catch errors and dispatch `createActionSendMessage` for error display

Example:
```typescript
export const createEffectSaveTodo = (data) => (dispatch, getStore) => {
    processEffectSaveTodo(dispatch, getStore, data)
        .catch(err => dispatch(createActionSendMessage(true, processError(err))))
}
```

### Server Integration

`src/service/server.ts` handles all HTTP communication:
- Wraps fetch API with common headers and authentication
- Attaches bearer token from config
- Throws on HTTP 400+ responses
- Used by effects to fetch/update data

## Component Connection Pattern

Components use `react-redux` `connect` HOC to:
1. Map store state to props via `storeToProps` selector
2. Map dispatch to props via `dispatch` callback binder

Example (from App.tsx):
```typescript
const storeToProps = (store: Store): AppPropsData => ({state: store.state})
const dispatch = (dispatch: any): AppPropsCallback => ({
    refreshMessages: () => dispatch(createActionRefreshMessages())
})
export default connect(storeToProps, dispatch)(App)
```

## Important Implementation Details

### Message Refresh Loop
App.tsx sets up an interval (from `messageRefreshMs` constant) that calls `createActionRefreshMessages()` to refresh message state periodically.

### Error Handling
Error messages are dispatched to store via `createActionSendMessage(isError: boolean, message: string)` and displayed in the UI.

### UUID Generation
Uses the `uuid` library (v1) for generating unique todo item IDs when creating new items.

### Authentication
User tokens are stored in `config` and attached to all API requests in the authorization header. Uses browser cookies via `universal-cookie` package.

## TypeScript Configuration

- Target: ES5 (legacy support)
- Module: ESNext
- JSX: React (not JSX Factory)
- Strict mode enabled
- No emit (type-checking only, actual compilation via Create React App)

## Version & Build Info

- VERSION_NUMBER is logged to console on startup (src/constants.ts)
- GENERATE_SOURCEMAP=false for production builds to reduce bundle size
- App deployed at `/todo` path (homepage in package.json)

## Redux DevTools

Redux DevTools browser extension is integrated for debugging. Check browser DevTools in development to inspect state and action history.
