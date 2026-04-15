# Research: Pokemon Search and Details

## Decision 1: Build Tooling and App Runtime
- Decision: Use Vite with React + TypeScript as the feature runtime.
- Rationale: Fast local iteration, straightforward static web deployment, and strong TypeScript
  support for typed domain contracts.
- Alternatives considered: CRA (slower startup and legacy defaults), Next.js (adds SSR/routing
  complexity outside current scope).

## Decision 2: Data Fetching and Caching
- Decision: Use a centralized typed API client plus TanStack Query for request lifecycle and cache
  policy.
- Rationale: Matches constitution requirement for consistent fetch behavior, retry policy, stale
  handling, and predictable loading/error UX states.
- Alternatives considered: Component-level fetch calls (breaks consistency), custom cache layer
  (more maintenance overhead for equivalent outcomes).

## Decision 3: Normalized Domain Modeling
- Decision: Normalize provider payloads into canonical `PokemonSummary` and `PokemonDetail`
  entities keyed by Pokemon identifier.
- Rationale: Prevents UI coupling to provider payload shape and simplifies favorite-state overlays
  across list and detail screens.
- Alternatives considered: Raw payload pass-through (high coupling), ad hoc per-screen mapping
  (duplicate logic).

## Decision 4: Favorites Persistence
- Decision: Persist favorites in browser localStorage as an identifier set scoped to browser
  profile.
- Rationale: Satisfies feature requirement for persistence without introducing accounts or backend
  storage.
- Alternatives considered: Session-only memory (does not persist reload), remote persistence
  (out of scope).

## Decision 5: UI State Contracts
- Decision: Enforce explicit rendering states for loading, success, empty, error, and
  partial/degraded across browse and detail flows.
- Rationale: Directly required by constitution and spec acceptance criteria.
- Alternatives considered: Generic fallback state (ambiguous and harder to test).

## Decision 6: Test Strategy
- Decision: Require unit tests for adapters/selectors/state transitions and integration tests for
  primary browse/detail/favorite journeys.
- Rationale: Aligns with constitution test discipline and supports confidence on cross-layer
  behavior.
- Alternatives considered: Integration-only tests (slower diagnosis), unit-only tests (misses flow
  wiring issues).
