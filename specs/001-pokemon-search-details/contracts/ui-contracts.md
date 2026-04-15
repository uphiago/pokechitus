# UI Contracts: Pokemon Search and Details

## Contract 1: Browse Experience
- Inputs:
  - Search text
  - Filter selections
  - Pagination actions (next/prev/page-select)
- Guarantees:
  - Results reflect active search/filter/page state.
  - UX states are explicit: loading, success, empty, error, partial.
  - Pagination controls prevent invalid navigation states.

## Contract 2: Detail Experience
- Inputs:
  - Pokemon selection from browse results
  - Retry action after retrieval failure
- Guarantees:
  - Detail view shows canonical entity fields for selected Pokemon.
  - Error state is recoverable via retry path.
  - Favorite status is consistent with browse view.

## Contract 3: Favorites Behavior
- Inputs:
  - Favorite toggle in browse cards and detail view
- Guarantees:
  - Toggle updates user-visible state immediately.
  - Persisted favorites are restored on application start.
  - Persistence failure returns clear feedback and non-blocking continuation.

## Contract 4: Persistence Format
- Storage scope:
  - Browser local storage for current browser profile.
- Stored value:
  - Serialized set/list of Pokemon identifiers.
- Recovery behavior:
  - Corrupt or unavailable storage falls back to empty favorites and user-visible warning.
