# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., TypeScript 5.x or NEEDS CLARIFICATION]
**Primary Dependencies**: [e.g., React, router, query/cache library or NEEDS CLARIFICATION]
**Storage**: [if applicable, e.g., browser cache, local storage, files or N/A]
**Testing**: [e.g., vitest/jest + RTL + integration harness or NEEDS CLARIFICATION]
**Target Platform**: [e.g., modern browsers, mobile web]
**Project Type**: [e.g., web app]
**Performance Goals**: [feature budgets and constitution baseline alignment]
**Constraints**: [domain-specific constraints and non-goals]
**Scale/Scope**: [domain-specific scope assumptions]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Modularity: Does the plan keep clear `api -> adapters -> domain/state -> ui` boundaries?
- Fetch/Error Consistency: Are all data access paths routed via shared typed client and normalized
  error contract?
- UX States: Are loading, success, empty, error, and partial/degraded states defined per async
  flow?
- Normalized Data: Is there a canonical mapping from external API shape to internal domain model?
- Performance: Are global baseline budgets acknowledged and stricter per-feature budgets defined
  when needed?
- Test Discipline: Does implementation include both unit and integration coverage for changed
  behavior?

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., additional architectural layer] | [current need] | [why simpler layout is insufficient] |
| [e.g., extra state container] | [specific problem] | [why existing store/selectors are insufficient] |
