# Data Model: Pokemon Search and Details

## Entity: PokemonSummary
- Description: Canonical list entity shown in browse/search results.
- Fields:
  - `id` (string): Stable Pokemon identifier.
  - `name` (string): Display name used in search and cards.
  - `types` (string[]): Type labels for filtering.
  - `spriteUrl` (string | null): List image reference.
  - `isFavorite` (boolean): Derived favorite state for UI.
- Validation rules:
  - `id` and `name` are required and non-empty.
  - Unknown or missing optional fields default safely (`types=[]`, `spriteUrl=null`).

## Entity: PokemonDetail
- Description: Canonical detail entity for a selected Pokemon.
- Fields:
  - `id` (string)
  - `name` (string)
  - `types` (string[])
  - `height` (number | null)
  - `weight` (number | null)
  - `abilities` (string[])
  - `stats` (Array<{ name: string; value: number }>)
  - `isFavorite` (boolean)
- Validation rules:
  - `id`, `name`, and `types` must be present for successful rendering.
  - Non-critical missing values are represented as null/empty collections.

## Entity: SearchSession
- Description: User-controlled browse query state.
- Fields:
  - `query` (string)
  - `filters` (object)
  - `page` (number)
  - `pageSize` (number)
- Validation rules:
  - `page >= 1`
  - `pageSize` constrained to supported UI values.
  - Invalid filters are ignored and reset to defaults.

## Entity: FavoriteSet
- Description: Persisted favorite Pokemon identifiers.
- Fields:
  - `ids` (string[])
  - `lastUpdatedAt` (string, ISO timestamp)
- Validation rules:
  - Duplicate IDs removed on write.
  - Invalid payloads in storage recover to empty set.

## Relationships
- `PokemonSummary.id` <-> `PokemonDetail.id` (1:1 identity link).
- `FavoriteSet.ids` overlays both summary and detail entities to compute `isFavorite`.
- `SearchSession` scopes which `PokemonSummary` records are visible.

## State Transitions
- Browse:
  - `idle -> loading -> success | empty | error | partial`
- Detail:
  - `idle -> loading -> success | error | partial`
- Favorites:
  - `unfavorited -> favorited` on add
  - `favorited -> unfavorited` on remove
  - `persist-error` surfaced when write fails; in-memory state may roll back per UX policy.
