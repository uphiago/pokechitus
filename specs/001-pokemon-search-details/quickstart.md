# Quickstart: Pokemon Search and Details

## Prerequisites
- Node.js 20+
- npm 10+

## Setup
1. Install dependencies:
   - `npm install`
2. Start development server:
   - `npm run dev`
3. Open the local URL printed by Vite (default `http://localhost:5173`).

## Verification Flow
1. Search for a Pokemon by name and confirm results update.
2. Apply type filters and confirm only matching results remain.
3. Navigate pagination and verify state retention.
4. Open a Pokemon detail view and verify key information loads.
5. Trigger retrieval failure and verify recoverable error UX with retry.
6. Toggle favorites from list and detail views.
7. Reload app and verify favorites persist in same browser profile.

## Test and Quality Commands
1. Run tests:
   - `npm run test:run`
2. Run lint:
   - `npm run lint`
3. Build production bundle:
   - `npm run build`

## Acceptance Gate
- Feature is ready when verification flow passes and all quality commands above are green.
