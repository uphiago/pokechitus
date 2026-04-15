# Tasks: Pokemon Search and Details

**Input**: Design documents from `/specs/001-pokemon-search-details/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Unit and integration tests are REQUIRED for all new or changed feature behavior.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and modular frontend skeleton

- [X] T001 Initialize Vite + React + TypeScript app scaffold in package.json
- [X] T002 Create layered source directories in src/api/.gitkeep, src/adapters/.gitkeep, src/domain/.gitkeep, src/state/.gitkeep, src/ui/pages/.gitkeep, src/ui/components/.gitkeep, src/routes/.gitkeep
- [X] T003 [P] Configure routing/query/test dependencies in package.json
- [X] T004 [P] Create base test folders and entry files in tests/unit/.gitkeep, tests/integration/.gitkeep, tests/e2e/.gitkeep

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core modular architecture and cross-story contracts that MUST be complete before user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Define canonical domain types for PokemonSummary, PokemonDetail, SearchSession, and FavoriteSet in src/domain/pokemon.ts
- [X] T006 [P] Implement centralized API client and provider endpoint wrappers in src/api/pokeApiClient.ts
- [X] T007 [P] Implement response-to-domain adapters and normalization helpers in src/adapters/pokemonAdapters.ts
- [X] T008 Implement unified error model and mapping utility in src/domain/errors.ts
- [X] T009 Implement favorites persistence repository with corruption recovery in src/state/favoritesStorage.ts
- [X] T010 Implement shared query key factory and fetch policy module in src/state/queryKeys.ts
- [X] T011 Define global async UX state components in src/ui/components/AsyncState.tsx
- [X] T012 Wire application shell, providers, and route placeholders in src/main.tsx and src/routes/index.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Find Pokemon Quickly (Priority: P1) 🎯 MVP

**Goal**: Deliver searchable, filterable, paginated Pokemon browse flow with explicit UX states

**Independent Test**: Search by name, apply filters, paginate results, and confirm loading/empty/error/success behavior without detail/favorites dependency

### Tests for User Story 1 (REQUIRED) ⚠️

- [X] T013 [P] [US1] Add unit tests for search/filter/pagination selectors in tests/unit/searchSessionSelectors.test.ts
- [X] T014 [P] [US1] Add integration tests for browse async states and pagination flow in tests/integration/browseFlow.test.tsx

### Implementation for User Story 1

- [X] T015 [P] [US1] Implement browse query state and selectors in src/state/searchSessionStore.ts
- [X] T016 [P] [US1] Implement filter model and filter option mapping in src/domain/filters.ts
- [X] T017 [US1] Implement browse service orchestration using client + adapters in src/state/usePokemonBrowseQuery.ts
- [X] T018 [US1] Build search/filter toolbar component in src/ui/components/BrowseFilters.tsx
- [X] T019 [US1] Build paginated Pokemon list and card modules in src/ui/components/PokemonList.tsx and src/ui/components/PokemonCard.tsx
- [X] T020 [US1] Compose browse page with all required async states in src/ui/pages/BrowsePage.tsx

**Checkpoint**: User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Inspect Pokemon Details (Priority: P2)

**Goal**: Deliver Pokemon detail flow with recoverable failure behavior and consistent data contract

**Independent Test**: Open detail from list, validate detail content, and verify retry path on retrieval failure

### Tests for User Story 2 (REQUIRED) ⚠️

- [X] T021 [P] [US2] Add unit tests for detail adapter defaults and error mapping in tests/unit/pokemonDetailAdapter.test.ts
- [X] T022 [P] [US2] Add integration tests for browse-to-detail navigation and retry state in tests/integration/detailFlow.test.tsx

### Implementation for User Story 2

- [X] T023 [P] [US2] Implement detail query hook and selector mapping in src/state/usePokemonDetailQuery.ts
- [X] T024 [US2] Build detail presentation component modules in src/ui/components/PokemonDetailPanel.tsx
- [X] T025 [US2] Build detail page with loading/error/partial rendering in src/ui/pages/DetailPage.tsx
- [X] T026 [US2] Register detail route integration in src/routes/index.tsx

**Checkpoint**: User Stories 1 and 2 should both work independently

---

## Phase 5: User Story 3 - Keep Favorite Pokemon (Priority: P3)

**Goal**: Deliver add/remove favorites behavior with local persistence and cross-view consistency

**Independent Test**: Toggle favorites in browse and detail, reload app, and verify persisted state restoration

### Tests for User Story 3 (REQUIRED) ⚠️

- [X] T027 [P] [US3] Add unit tests for favorites storage repository and recovery logic in tests/unit/favoritesStorage.test.ts
- [X] T028 [P] [US3] Add integration tests for cross-view favorite toggling and reload persistence in tests/integration/favoritesFlow.test.tsx

### Implementation for User Story 3

- [X] T029 [P] [US3] Implement favorites state actions/selectors in src/state/favoritesStore.ts
- [X] T030 [US3] Integrate favorite toggle controls into list and detail components in src/ui/components/PokemonCard.tsx and src/ui/components/PokemonDetailPanel.tsx
- [X] T031 [US3] Implement app startup favorites hydration and failure feedback in src/main.tsx
- [X] T032 [US3] Add persistence-failure notice component and wiring in src/ui/components/FavoritesPersistenceNotice.tsx

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cross-story hardening, modularity enforcement, and verification

- [X] T033 [P] Enforce import boundary rules for `api -> adapters -> domain/state -> ui` in eslint.config.js
- [X] T034 [P] Add performance verification checks for initial route and interaction hotspots in tests/integration/performanceBudgets.test.ts
- [X] T035 Validate quickstart scenarios and update commands in specs/001-pokemon-search-details/quickstart.md
- [X] T036 [P] Document module ownership and extension points in src/README.md
- [X] T037 Run full verification and capture results in specs/001-pokemon-search-details/verification-report.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: Depend on Foundational completion
  - US1 (P1) should be delivered first as MVP
  - US2 (P2) can proceed after foundational + US1 routing shell
  - US3 (P3) can proceed after foundational and should integrate with US1/US2 UI modules
- **Polish (Phase 6)**: Depends on completion of all targeted user stories

### User Story Dependency Graph

- **US1 (P1)** -> establishes browse/search/filter/pagination baseline
- **US2 (P2)** -> extends with detail retrieval and consumes shared entities
- **US3 (P3)** -> overlays favorites persistence across browse and detail

### Within Each User Story

- Unit and integration tests first
- State/domain modules before UI composition
- UI modules before page/route integration
- Story must pass independent validation before moving to next priority

### Parallel Opportunities

- Setup tasks marked `[P]` can run in parallel
- Foundational T006 and T007 can run in parallel after T005
- US1 test tasks T013/T014 can run in parallel
- US2 test tasks T021/T022 can run in parallel
- US3 test tasks T027/T028 can run in parallel
- Polish tasks T033, T034, and T036 can run in parallel

---

## Parallel Example: User Story 1

```bash
Task: "T013 [US1] tests/unit/searchSessionSelectors.test.ts"
Task: "T014 [US1] tests/integration/browseFlow.test.tsx"
Task: "T015 [US1] src/state/searchSessionStore.ts"
Task: "T016 [US1] src/domain/filters.ts"
```

## Parallel Example: User Story 2

```bash
Task: "T021 [US2] tests/unit/pokemonDetailAdapter.test.ts"
Task: "T022 [US2] tests/integration/detailFlow.test.tsx"
Task: "T023 [US2] src/state/usePokemonDetailQuery.ts"
```

## Parallel Example: User Story 3

```bash
Task: "T027 [US3] tests/unit/favoritesStorage.test.ts"
Task: "T028 [US3] tests/integration/favoritesFlow.test.tsx"
Task: "T029 [US3] src/state/favoritesStore.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate US1 independently before expanding scope

### Incremental Delivery

1. Deliver US1 (browse/search/filter/pagination)
2. Deliver US2 (detail + retry states)
3. Deliver US3 (favorites + persistence)
4. Run polish phase for boundary enforcement and performance verification

### Modularization Emphasis

- Keep business rules in `src/domain/` and `src/state/` modules, not in page components
- Restrict API payload handling to `src/api/` and `src/adapters/`
- Ensure UI components consume canonical models and selectors only
- Fail builds/tests when boundary rules are violated
