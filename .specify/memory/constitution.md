<!--
Sync Impact Report
- Version change: 0.0.0-template -> 1.0.0
- Modified principles:
  - [PRINCIPLE_1_NAME] -> I. Modular and Testable Frontend Units
  - [PRINCIPLE_2_NAME] -> II. Consistent Data Fetching and Error Handling
  - [PRINCIPLE_3_NAME] -> III. Test Discipline (Unit + Integration)
  - [PRINCIPLE_4_NAME] -> IV. Clear UX State Contracts
  - [PRINCIPLE_5_NAME] -> V. Normalized Domain Data
  - Added: VI. Simple and Predictable Architecture
- Added sections:
  - Technical Standards
  - Delivery and Review Workflow
- Removed sections:
  - Placeholder-only sections from template
- Templates requiring updates:
  - ✅ updated: .specify/templates/plan-template.md
  - ✅ updated: .specify/templates/spec-template.md
  - ✅ updated: .specify/templates/tasks-template.md
  - ✅ updated: .specify/templates/agent-file-template.md
  - ⚠ pending: .specify/templates/commands/*.md (directory not present in this repository)
- Follow-up TODOs:
  - None
-->

# PokeCheetos Constitution

## Core Principles

### I. Modular and Testable Frontend Units
Each feature MUST be implemented as small, composable React + TypeScript units with explicit
inputs and outputs. UI components MUST avoid embedded data-fetching side effects unless they are
dedicated container components. Business logic MUST live in testable modules (hooks, services,
selectors, adapters) and MUST be independently unit-testable.

Rationale: Clear boundaries reduce regressions and enable focused testing.

### II. Consistent Data Fetching and Error Handling
All PokeAPI access MUST flow through a shared typed client layer and a single query strategy
(cache keys, retries, timeout, cancellation, and stale policy). Components MUST NOT call `fetch`
directly for domain data. Errors MUST be normalized into stable categories and surfaced through a
single UI contract.

Rationale: A single fetch/error path prevents divergent behavior and improves debuggability.

### III. Test Discipline (Unit + Integration)
All new or changed feature work MUST include both unit tests and integration tests before merge.
Unit tests MUST cover transformation logic, selectors, and boundary behavior. Integration tests
MUST validate user flows including loading, success, empty, and error outcomes.

Rationale: Combined test levels catch logic defects and cross-layer regressions.

### IV. Clear UX State Contracts
Every async user journey MUST define and render explicit UI states: loading, success, empty,
error, and partial/degraded data where applicable. State transitions MUST be predictable and free
of ambiguous placeholders.

Rationale: Explicit states improve usability and reduce support ambiguity.

### V. Normalized Domain Data
PokeAPI responses consumed by the app MUST be normalized into canonical domain models before UI
consumption. The UI layer MUST read through typed selectors/view-model mappers rather than raw API
shapes. Data duplication MUST be minimized through normalized storage and derived selectors.

Rationale: Normalization prevents shape drift and simplifies multi-screen reuse.

### VI. Simple and Predictable Architecture
The frontend architecture MUST remain intentionally minimal: `api -> adapters -> domain/state ->
ui`. Dependencies MUST flow inward without circular imports. New abstractions MUST be justified by
repeated need across at least two features or by measurable complexity reduction.

Rationale: Simple architecture accelerates delivery and onboarding.

## Technical Standards

- TypeScript strict mode MUST be enabled.
- Shared API client contracts MUST define request/response typing and error mapping.
- Query keys and cache invalidation strategy MUST be centralized.
- Baseline performance budgets MUST be tracked globally:
  - Initial route JS budget SHOULD be <= 250 KB gzipped.
  - Initial meaningful render on mid-tier mobile SHOULD be <= 2.5s in local production build.
  - Re-render hotspots MUST be measured when interaction latency exceeds 100ms.
- Feature plans MAY define stricter budgets than these global baselines.

## Delivery and Review Workflow

- Every plan MUST pass a Constitution Check before implementation starts.
- Every specification MUST document data normalization strategy, UX state matrix, and error-path
  acceptance scenarios.
- Every task list MUST contain explicit tasks for normalized data mapping, fetch/error policy,
  UX-state coverage, performance verification, and both unit + integration testing.
- Pull requests MUST include evidence: tests executed, UX states verified, and performance budget
  status against baseline or stricter feature targets.

## Governance

This constitution supersedes local conventions when conflicts arise.

Amendment process:
- Changes MUST be proposed in writing with rationale and migration impact.
- At least one reviewer MUST verify template/documentation sync impact.
- Ratified amendments MUST update version and `Last Amended` date in the same change.

Versioning policy:
- MAJOR: Backward-incompatible principle/governance redefinition or removal.
- MINOR: New principle/section or materially expanded normative guidance.
- PATCH: Clarifications that do not change normative requirements.

Compliance expectations:
- Planning and review artifacts MUST explicitly confirm constitution compliance.
- Any temporary exception MUST include expiration date and owner.

**Version**: 1.0.0 | **Ratified**: 2026-04-15 | **Last Amended**: 2026-04-15
