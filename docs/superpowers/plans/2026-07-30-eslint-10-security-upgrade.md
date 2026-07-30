# ESLint 10 Security Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the ESLint development toolchain to eliminate the five reported high-severity dependency vulnerabilities without changing the website's runtime code.

**Architecture:** Keep the existing flat ESLint configuration and all application dependencies. Update only `eslint` and `@eslint/js` to their ESLint 10-compatible releases; npm will regenerate transitive lint dependencies in the lockfile. Verify security and compatibility using npm audit, ESLint, and the production build.

**Tech Stack:** npm, ESLint 10, @eslint/js 10, TypeScript 5.9, Vite 7, React 19.

---

## File structure

| Path | Change | Responsibility after change |
|---|---|---|
| `package.json` | Modify through npm | Declares ESLint 10 and @eslint/js 10 as development dependencies. |
| `package-lock.json` | Modify through npm | Locks the upgraded direct and transitive lint dependency tree. |
| `eslint.config.js` | Retain unless command reports incompatibility | Continues to define the project's flat lint configuration. |

### Task 1: Upgrade the ESLint toolchain

**Files:**
- Modify: `D:/MyWeb/prisma/package.json`
- Modify: `D:/MyWeb/prisma/package-lock.json`

- [ ] **Step 1: Record the pre-upgrade audit state**

Run:

```powershell
npm.cmd audit --json
```

Expected: five high-severity vulnerabilities attributed to ESLint 9's transitive `minimatch` / `brace-expansion` chain.

- [ ] **Step 2: Upgrade the two direct ESLint packages**

Run:

```powershell
npm.cmd install --save-dev eslint@10.8.0 @eslint/js@10.0.1
```

Expected: npm updates `package.json`, regenerates affected entries in `package-lock.json`, and reports no dependency-resolution error.

- [ ] **Step 3: Confirm the direct dependency versions**

Run:

```powershell
npm.cmd ls eslint @eslint/js --depth=0
```

Expected: top-level output includes `eslint@10.8.0` and `@eslint/js@10.0.1`.

### Task 2: Verify compatibility and vulnerability remediation

**Files:**
- Generated: `D:/MyWeb/prisma/dist/**` (Vite production output)

- [ ] **Step 1: Run the flat ESLint configuration**

Run:

```powershell
npm.cmd run lint
```

Expected: exit code 0 with no lint diagnostics. If it reports an ESLint 10 configuration incompatibility, stop and report the exact error before changing configuration.

- [ ] **Step 2: Run the complete production build**

Run:

```powershell
npm.cmd run build
```

Expected: TypeScript compilation and the Vite production build both finish successfully.

- [ ] **Step 3: Re-run the security audit**

Run:

```powershell
npm.cmd audit --json
```

Expected: `metadata.vulnerabilities.total` is `0`; the previous high-severity ESLint/minimatch/brace-expansion chain no longer appears.

- [ ] **Step 4: Confirm the change boundary**

Run:

```powershell
node -e "const p=require('./package.json'); console.log(JSON.stringify({dependencies:p.dependencies, eslint:p.devDependencies.eslint, eslintJs:p.devDependencies['@eslint/js']}, null, 2))"
```

Expected: the runtime `dependencies` object still contains only `framer-motion`, `lucide-react`, `react`, and `react-dom`; ESLint entries are upgraded in `devDependencies`.

## Commit note

This workspace has no `.git` directory, so no commit can be made. If it is later initialized as a repository, use the commit message:

```text
chore: upgrade eslint security toolchain
```
