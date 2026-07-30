# ESLint 10 security upgrade

## Goal

Eliminate the five high-severity development-dependency audit findings by upgrading the ESLint toolchain to a version that no longer resolves the vulnerable `minimatch` / `brace-expansion` chain.

## Scope

- Upgrade direct development dependencies `eslint` to `10.8.0` and `@eslint/js` to `10.0.1`.
- Update `package-lock.json` using npm so its resolved transitive dependencies match the secure toolchain.
- Keep the existing flat configuration in `eslint.config.js` unless ESLint 10 reports a concrete compatibility error.
- Retain React, Vite, TypeScript, Tailwind, runtime dependencies, source components, and static assets unchanged.

## Compatibility

The installed lint integrations accept ESLint 10:

- `eslint-plugin-react-hooks` accepts ESLint `^10.0.0`.
- `eslint-plugin-react-refresh` accepts ESLint `^9 || ^10`.
- `typescript-eslint` accepts ESLint `^10.0.0` and the project's TypeScript 5.9 version.

The existing config uses ESLint's flat-config API (`defineConfig`, `globalIgnores`) and `@eslint/js`; this remains the intended ESLint 10 configuration style.

## Verification

1. `npm.cmd run lint` exits successfully with no diagnostics.
2. `npm.cmd run build` completes TypeScript compilation and the Vite production build.
3. `npm.cmd audit --json` reports zero vulnerabilities.
4. `npm.cmd ls eslint @eslint/js --depth=0` resolves ESLint 10 and @eslint/js 10.

## Risks and rollback

ESLint 10 is a development-tool major release. The main risk is a rule/config compatibility failure, which is contained to linting and does not affect the built site's runtime. If linting cannot be made compatible without changing project code, restore the prior ESLint 9 and @eslint/js 9 package versions and their lockfile resolution.
