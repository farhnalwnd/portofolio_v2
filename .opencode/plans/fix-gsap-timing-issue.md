# Fix GSAP Animation & Timing Issues

## Context
The current implementation in `App.vue` has GSAP page transitions that animate the root element of each view. This interferes with child view GSAP animations, particularly ScrollTrigger measurements (like pinning and scrub). ScrollTrigger calculations run in `onMounted`, but at that time the parent element is still mid-transition (opacity 0→1, y 50→0), causing incorrect measurements.

## Plan

### 1. Remove Page Transitions in `App.vue`
- **Why:** The working commit (`c2dcb1f`) had no page transitions. Removing them ensures child GSAP animations can measure the DOM correctly without interference.
- **Action:**
  - Remove GSAP imports (`gsap`, `ScrollTrigger`).
  - Remove transition hooks (`onBeforeEnter`, `onEnter`, `onAfterEnter`, `onLeave`).
  - Remove `<transition>` wrapper and restore `<router-view />` directly in the template.

### 2. Fix Resize Timing Issue in `AboutView.vue`
- **Why:** `AboutView` uses `scrollWidth` in function callbacks for ScrollTrigger, but `scrollWidth` is calculated once on mount. If the window is resized, the horizontal scroll will use the *old* value, breaking the layout.
- **Action:**
  - Refactor `scrollWidth` calculation to be dynamic (inside the functions).
  - Update `x` and `end` properties in `AboutView.vue` to use functions that recalculate `scrollWidth` dynamically.

### 3. Final Verification
- Run `npm run lint` to ensure no unused imports or syntax errors.
- Verify that the build passes with `npm run build`.
