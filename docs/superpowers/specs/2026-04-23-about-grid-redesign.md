# About Grid Redesign

## Goal

Keep the current visual theme and transition behavior, but remap the About section content into the exact 1–5 card layout provided by the user.

## Layout Mapping

1. Top-left wide card: `About Me` with one combined paragraph only
2. Bottom-left tall card: `Beyond Code`
3. Bottom-middle small card: contact card with `SK` instead of `PS`
4. Top-right tall card: quote only
5. Bottom-right wide card: all stats arranged horizontally

## Constraints

- Preserve the same overall grid footprint as the reference layout
- Keep the existing cosmic/dark styling system
- Do not redesign unrelated sections
- Keep the About content readable on mobile by stacking naturally

## Verification

- `npm run build` must pass
- no `npm test` script exists, so build verification is the available automated check
