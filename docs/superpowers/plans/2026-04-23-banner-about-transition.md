# Banner About Transition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Blend the banner and About sections in light mode so the handoff feels continuous instead of resetting abruptly.

**Architecture:** Reuse the banner's existing warm atmospheric treatment at the section boundary, then fade the About section's own surface in lower down. Keep the change scoped to the About wrapper and shared light-theme CSS so card internals and dark mode stay stable.

**Tech Stack:** React, JSX, Tailwind utility classes, global CSS in `src/index.css`, Vite build verification

---

### Task 1: Adjust About section structure for overlap and transition ownership

**Files:**
- Modify: `src/components/sections/AboutMe.jsx`

- [ ] **Step 1: Confirm the current About section wrapper and blend entry points**

Run: `rg -n "about-cosmic-section|about-cosmic-surface|py-20|py-24" src/components/sections/AboutMe.jsx`
Expected: matches for the section wrapper and the existing bottom cosmic surface.

- [ ] **Step 2: Update the wrapper to support a seamless banner handoff**

Apply this shape in `src/components/sections/AboutMe.jsx`:

```jsx
<section
  id="about"
  className="about-cosmic-section relative left-1/2 -mt-20 w-screen -translate-x-1/2 overflow-hidden bg-[#05050a] px-4 pb-20 pt-28 text-white md:px-8 md:pb-24 md:pt-32"
>
```

This pulls the section upward into the hero handoff while preserving enough top padding for the content.

- [ ] **Step 3: Add an explicit top transition layer inside About**

Insert this immediately inside the section, before the existing `cosmic-starfield` layer:

```jsx
<div className="about-transition-veil" aria-hidden="true" />
```

This layer owns the blend from the hero glow into the About background.

- [ ] **Step 4: Verify the JSX still builds mentally and structurally**

Check that the section still contains:
- transition veil
- starfield
- noise
- orbs
- bottom cosmic surface
- existing content grid

Expected: no card markup changes required.

### Task 2: Add the light-mode transition blend in CSS

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Write the failing verification command**

Run: `npm run build`
Expected: PASS before the CSS change, establishing a clean baseline for the visual-only edit.

- [ ] **Step 2: Add About-specific blend rules**

Add these rules near the existing About and cosmic section styles in `src/index.css`:

```css
.about-cosmic-section {
  margin-top: clamp(-7rem, -10vw, -4.5rem);
  padding-top: clamp(8rem, 14vw, 10rem);
}

.about-transition-veil {
  position: absolute;
  inset: 0 0 auto 0;
  z-index: 0;
  height: clamp(220px, 30vw, 360px);
  pointer-events: none;
  background:
    radial-gradient(
      ellipse at 50% 0%,
      rgba(248, 113, 113, 0.26),
      transparent 58%
    ),
    linear-gradient(
      180deg,
      rgba(5, 5, 10, 0),
      rgba(5, 5, 10, 0.72) 82%,
      rgba(5, 5, 10, 0.96) 100%
    );
}
```

This keeps dark mode atmospheric while establishing a dedicated transition layer.

- [ ] **Step 3: Add light-mode-specific handoff behavior**

Add these rules in the `html:not(.dark)` section of `src/index.css`:

```css
html:not(.dark) .about-cosmic-section {
  background: transparent;
}

html:not(.dark) .about-transition-veil {
  background:
    radial-gradient(
      ellipse at 50% 4%,
      rgba(248, 113, 113, 0.22),
      rgba(248, 113, 113, 0.08) 34%,
      transparent 62%
    ),
    linear-gradient(
      180deg,
      rgba(247, 243, 238, 0) 0%,
      rgba(247, 243, 238, 0.72) 58%,
      rgba(247, 243, 238, 0.96) 82%,
      #f7f3ee 100%
    );
}
```

This prevents the pale reset at the top and fades the section surface in gradually.

- [ ] **Step 4: Soften the About local background so it starts lower**

Update the light-mode About surface rule:

```css
html:not(.dark) .about-cosmic-surface {
  opacity: 0.72;
  filter: saturate(0.9);
}
```

This keeps the lower atmospheric shape without competing with the transition.

### Task 3: Verify build and review the diff

**Files:**
- Modify: `src/components/sections/AboutMe.jsx`
- Modify: `src/index.css`

- [ ] **Step 1: Run the build after the implementation**

Run: `npm run build`
Expected: PASS with no JSX/CSS errors.

- [ ] **Step 2: Inspect the focused diff**

Run: `git diff -- src/components/sections/AboutMe.jsx src/index.css`
Expected: diff limited to the section wrapper, transition layer, and CSS blend rules.

- [ ] **Step 3: Summarize the result**

Confirm:
- About no longer hard-resets at the top in light mode
- banner glow visually carries into the About section
- dark mode behavior remains intact

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/AboutMe.jsx src/index.css docs/superpowers/specs/2026-04-23-banner-about-transition-design.md docs/superpowers/plans/2026-04-23-banner-about-transition.md
git commit -m "feat: blend banner into about section"
```
