# Agents.md — news-app-auto

## Project Overview

This is a React + Redux frontend application whose long-term goal is to serve as a **news UI** that leverages the OpenAI API to summarize daily and weekly news stories. The current codebase is a **template/demo app** that establishes the core architectural patterns every future feature must remain consistent with.

The app communicates with a backend via REST (axios) and real-time events (Socket.io). State is managed globally through Redux with redux-thunk for async operations.

---

## Tech Stack

| Concern | Library / Tool |
|---|---|
| UI | React 19 |
| State management | Redux 5 + redux-thunk |
| HTTP client | Axios (`src/store/services/apiClient.js`) |
| Real-time | Socket.io client (`src/store/services/socket.js`) |
| Build tool | Vite |
| Linting | ESLint |
| Containerization | Docker / docker-compose |

---

## Core Architectural Principles

### 1. Clarity Over Brevity
- Favor **verbose, descriptive variable and function names** over short abbreviations.
- A name should communicate intent without requiring a comment to explain it.
- ✅ `trimmedUserName`, `deserializePostUser`, `onCounterValue`
- ❌ `uName`, `deser`, `cb`

### 2. Simplicity and Readability First
- Write code that a developer unfamiliar with the feature can understand at a glance.
- Avoid clever one-liners when a straightforward multi-line version is clearer.
- Keep functions small and focused on a single responsibility.

### 3. Modular, Shareable Logic
- Extract logic that could apply to more than one resource (e.g., error normalization, API client configuration, socket singleton) into shared utilities rather than duplicating it.
- The `apiClient` and `getSocket` singleton are examples of this: one shared instance used everywhere.

---

## API Data Flow — The Golden Rule

All async API interactions **must** follow this exact flow:

```
Component → Container → Action (thunk) → Service → Serializer → API
                                                              ↓
Component ← Redux state ← Reducer ← Action dispatch ← Deserializer ← API response
```

Every async operation needs a **source of truth** in Redux for:
- **data** — the successfully fetched/created resource
- **loading** — boolean flag active during the request
- **error** — a human-readable error string or `null`

Reducer shape example (see `userReducer.js`):
```js
const initialState = {
  user: null,
  loading: false,
  error: null,
}
```

For resources that receive real-time updates via sockets, the socket event handler dispatches the same action types as the REST response so the reducer stays the source of truth (see `counterActions.js` / `counterReducer.js`).

---

## File & Folder Conventions

```
src/
  components/          # Dumb, presentational components
    <Resource>/
      <Resource>.jsx

  containers/          # Smart components — Redux + business logic
    <Resource>/
      <Resource>Container.jsx

  store/
    actionTypes.js     # All action type string constants
    index.js           # Redux store setup

    actions/
      <resource>Actions.js   # Thunks for one resource
      index.js               # Re-exports all actions

    reducers/
      <resource>Reducer.js   # Reducer for one resource slice
      index.js               # combineReducers root

    services/
      apiClient.js           # Shared axios instance
      socket.js              # Shared Socket.io singleton

      <resource>/
        <resource>Service.js         # HTTP calls for one resource
        serializers/
          <verb><Resource>.js        # Shape outgoing request body
        deserializers/
          <verb><Resource>.js        # Normalize incoming response
```

### Naming pattern for serializers / deserializers
Files are named after the HTTP verb + resource: `postUser.js`, `getCount.js`, `patchArticle.js`, etc. This makes it immediately clear which endpoint they belong to.

---

## Adding a New Resource

Follow these steps every time a new resource is introduced (e.g., `Article`, `Summary`, `Category`):

1. **Action types** — add `<RESOURCE>_REQUEST`, `<RESOURCE>_SUCCESS`, `<RESOURCE>_FAILURE` (and any extras like `<RESOURCE>_SET`) to `store/actionTypes.js`.

2. **Serializer(s)** — create `store/services/<resource>/serializers/<verb><Resource>.js` for each write operation that shapes a request body.

3. **Deserializer(s)** — create `store/services/<resource>/deserializers/<verb><Resource>.js` for each operation that normalizes a response.

4. **Service** — create `store/services/<resource>/<resource>Service.js`. Each exported function calls `apiClient`, runs the payload through the appropriate serializer/deserializer, and returns the normalized result.

5. **Actions** — create `store/actions/<resource>Actions.js` with thunks that `dispatch` request/success/failure action types and call the service. Export them from `store/actions/index.js`.

6. **Reducer** — create `store/reducers/<resource>Reducer.js` with `{ data/items, loading, error }` initial state. Register it in `store/reducers/index.js` via `combineReducers`.

7. **Container** — create `containers/<Resource>/<Resource>Container.jsx`. This component:
   - Uses `useSelector` to read slice state.
   - Uses `useDispatch` to fire actions.
   - Handles `useEffect` for any lifecycle-driven fetches or socket subscriptions.
   - Passes only plain props (data, callbacks, loading, error) to the presentational component.

8. **Component** — create `components/<Resource>/<Resource>.jsx`. This component:
   - Accepts props only — no Redux imports, no direct API calls.
   - Is responsible purely for rendering and local UI state (e.g., form field values, toggle visibility).

---

## Smart Containers vs. Dumb Components

| Responsibility | Container (`containers/`) | Component (`components/`) |
|---|---|---|
| Redux `useSelector` | ✅ | ❌ |
| Redux `useDispatch` | ✅ | ❌ |
| `useEffect` for fetches / subscriptions | ✅ | ❌ |
| Local UI state (`useState`) | Rarely | ✅ |
| JSX / rendering | Minimal (delegates to component) | ✅ |
| Reusable across features | ❌ | ✅ |

> **Exception:** Simple, purely UI components that are unlikely to need Redux bindings and are clearly shareable (e.g., a `Button`, `Spinner`, or `ErrorMessage`) do not need a container wrapper.

---

## Socket Real-Time Pattern

The Socket.io client is a **singleton** (`store/services/socket.js`). Never create a new `io()` connection outside of `getSocket()`.

- **Subscribe** in a container's `useEffect` via a thunk action (e.g., `subscribeToCounter`).
- The thunk returns an **unsubscribe function**; store it in a `useRef` and call it in the `useEffect` cleanup to avoid duplicate listeners.
- Server broadcasts are **the authoritative source** for live values. Optimistic local updates should be avoided unless explicitly required for UX.

```js
// Pattern (CounterContainer.jsx)
const unsubscribeRef = useRef(null)

useEffect(() => {
  unsubscribeRef.current = dispatch(actions.subscribeToResource())
  return () => unsubscribeRef.current?.()
}, [dispatch])
```

---

## Configuration & Environment Variables

All environment-specific values are centralized in `src/config.js`. Never scatter `import.meta.env` calls throughout the app.

| Variable | Purpose | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL for REST API | `/api` |
| `VITE_SOCKET_URL` | Socket.io server origin | `window.location.origin` |
| `VITE_SOCKET_PATH` | Socket.io path | `/socket.io` |

---

## Styling & Mobile Compatibility

- **Every component must be considered for mobile viewports** from the start — not retrofitted later.
- Use responsive units (`rem`, `%`, `vw`/`vh`) over fixed `px` where possible.
- Prefer flexbox or CSS grid for layout.
- Touch targets (buttons, inputs) should meet minimum size guidelines (≥ 44×44px).
- Avoid hover-only interactions; ensure equivalent tap/focus states exist.

---

## Long-Term Vision

The app is evolving into a **news aggregation and AI summarization UI**. When building toward that goal, keep in mind:

- News articles, daily summaries, and weekly digests will each be their own resources with dedicated Redux slices, services, and components.
- OpenAI API calls will be proxied through the backend — the frontend simply treats them as regular REST endpoints and follows the standard data flow.
- The real-time socket layer may be used to push newly summarized articles to connected clients without requiring a page refresh.
- All new features should ask: *"Does this pattern make sense if we have 10 more resources like it?"* If yes, follow the convention; if no, document why the exception exists.

