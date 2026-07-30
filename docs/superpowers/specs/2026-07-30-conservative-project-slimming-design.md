# Conservative project slimming

## Goal

Reduce maintenance overhead without changing the site's visual design, runtime behaviour, media assets, or local fonts.

## Scope

Remove only artifacts whose absence is proven not to affect the current application:

- `src/hooks/use-mobile.ts`, which has no imports and is the sole lint failure.
- `src/App.css`, which has no imports and contains no active styles.
- `components.json`, a shadcn/ui generator configuration that is not used by source code, build tooling, or an installed shadcn workflow.
- `tailwindcss-animate` and its `tailwind.config.js` registration, because no source file uses its utility classes or animation names.

Update `package.json` and `package-lock.json` together when removing the dependency.

## Explicit non-goals

- Do not alter React components, page content, animations, routes, or asset paths.
- Do not remove or subset local fonts.
- Do not remove image or video assets.
- Do not add new runtime or testing dependencies.

## Verification

1. Confirm the removed paths and `tailwindcss-animate` string are absent from the project source and configuration.
2. Run `npm.cmd run lint`; it must complete with no findings.
3. Run `npm.cmd run build`; TypeScript compilation and the Vite production build must succeed.
4. Compare the production JavaScript and CSS asset output with the pre-change build to confirm no unexpected runtime-bundle increase.

## Risk and rollback

The only behaviour-affecting candidate is `tailwindcss-animate`. The source audit found no use of the plugin's classes, so removing it should not alter generated CSS used by the site. If an unscanned external HTML fragment later requires its classes, restore the package and the `plugins` registration in `tailwind.config.js`.
