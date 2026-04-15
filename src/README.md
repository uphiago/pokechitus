# Source Module Ownership

- `src/api/`: Network transport and endpoint wrappers only.
- `src/adapters/`: Provider payload to canonical model mapping.
- `src/domain/`: Canonical types, filtering, and error primitives.
- `src/state/`: Query hooks, persistence, and store-level orchestration.
- `src/ui/`: Presentation-only components and pages.
- `src/routes/`: Route assembly and page wiring.

Extension points:
- Add new provider payload mappers in `src/adapters/`.
- Add cross-screen selectors in `src/state/`.
- Keep UI components unaware of raw provider payload shapes.
