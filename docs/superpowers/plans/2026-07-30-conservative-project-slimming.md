# Conservative Project Slimming Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove only unused source/configuration artifacts and an unused Tailwind plugin, without changing site appearance or runtime behaviour.

**Architecture:** The React application remains untouched. Delete the unimported hook, unused stylesheet, and inactive shadcn generator metadata; then remove the unused Tailwind animation plugin both from Tailwind configuration and npm metadata. Verify the retained build pipeline through static searches, ESLint, and Vite's production build.

**Tech Stack:** React 19, TypeScript, Vite 7, Tailwind CSS 3, npm, ESLint 9.

---

## File structure

| Path | Change | Responsibility after change |
|---|---|---|
| `src/hooks/use-mobile.ts` | Delete | Removes an unimported hook that causes the sole lint error. |
| `src/App.css` | Delete | Removes an unused empty stylesheet. |
| `components.json` | Delete | Removes unused shadcn/ui generator metadata. |
| `tailwind.config.js` | Modify | Stops registering the unused `tailwindcss-animate` plugin. |
| `package.json` | Modify through npm | Removes the unneeded direct development dependency. |
| `package-lock.json` | Modify through npm | Keeps the lockfile consistent with `package.json`. |

### Task 1: Remove unreferenced local artifacts

**Files:**
- Delete: `D:/MyWeb/prisma/src/hooks/use-mobile.ts`
- Delete: `D:/MyWeb/prisma/src/App.css`
- Delete: `D:/MyWeb/prisma/components.json`

- [ ] **Step 1: Verify the candidates are unreferenced**

Run:

```powershell
rg -n --glob '!node_modules/**' --glob '!dist/**' "use-mobile|App\.css|components\.json" .
```

Expected: only declarations or unrelated Tailwind `@tailwind components` text; no import of `use-mobile`, `App.css`, or `components.json`.

- [ ] **Step 2: Delete the three audited artifacts**

Use a targeted patch that deletes exactly the three paths above. Do not delete any files in `public/`, `src/components/`, or `src/sections/`.

- [ ] **Step 3: Verify the deleted paths no longer exist**

Run:

```powershell
@('src/hooks/use-mobile.ts', 'src/App.css', 'components.json') | ForEach-Object {
  if (Test-Path -LiteralPath $_) { throw "Expected deleted: $_" }
}
```

Expected: command exits with code 0 and produces no output.

### Task 2: Remove the unused Tailwind animation plugin

**Files:**
- Modify: `D:/MyWeb/prisma/tailwind.config.js`
- Modify: `D:/MyWeb/prisma/package.json`
- Modify: `D:/MyWeb/prisma/package-lock.json`

- [ ] **Step 1: Verify no plugin utilities are used by application source**

Run:

```powershell
rg -n "animate-(accordion-down|accordion-up|caret-blink)|tailwindcss-animate" src index.html tailwind.config.js package.json
```

Expected: `tailwindcss-animate` occurs only in `tailwind.config.js` and `package.json`; no source utility class matches the plugin-generated animation names.

- [ ] **Step 2: Remove its Tailwind registration**

In `tailwind.config.js`, change:

```js
  plugins: [require("tailwindcss-animate")],
```

to:

```js
  plugins: [],
```

Keep all existing theme extensions, content globs, and `darkMode` settings unchanged.

- [ ] **Step 3: Remove the direct npm dependency and update lockfile**

Run:

```powershell
npm.cmd uninstall --save-dev tailwindcss-animate
```

Expected: `tailwindcss-animate` is removed from `devDependencies` in `package.json` and from direct-package sections of `package-lock.json`; no other top-level package changes occur.

- [ ] **Step 4: Verify package/config removal**

Run:

```powershell
rg -n "tailwindcss-animate" package.json package-lock.json tailwind.config.js src index.html
```

Expected: exit code 1 because the string is absent from all searched project files.

### Task 3: Verify the slimmed project

**Files:**
- Generated: `D:/MyWeb/prisma/dist/**` (Vite production output)

- [ ] **Step 1: Run lint**

Run:

```powershell
npm.cmd run lint
```

Expected: exit code 0 and no lint diagnostics. The former `react-hooks/set-state-in-effect` failure disappears because the unreferenced hook no longer exists.

- [ ] **Step 2: Build for production**

Run:

```powershell
npm.cmd run build
```

Expected: TypeScript project build and Vite production build complete successfully, generating `dist/index.html` and hashed assets under `dist/assets/`.

- [ ] **Step 3: Confirm retained visual assets remain available**

Run:

```powershell
@('dist/videos/hero-bg.mp4', 'dist/videos/feature-card.mp4', 'dist/fonts/fonts.css') | ForEach-Object {
  if (-not (Test-Path -LiteralPath $_)) { throw "Missing retained asset: $_" }
}
```

Expected: command exits with code 0 and produces no output.

- [ ] **Step 4: Record the change scope**

Report the three deleted artifacts, the removed development dependency, lint/build outcomes, and explicitly state that local fonts, images, videos, React components, and runtime dependencies were retained.

## Commit note

This workspace has no `.git` directory, so no commit can be made. If it is later initialized as a repository, use the commit message:

```text
chore: remove unused frontend artifacts
```
