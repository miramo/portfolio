// @ts-check
// Vendored from mattpocock/skills, setup-ts-deep-modules (MIT), then adapted to
// test files that sit beside their source. See .claude/rules/domain.md.

const R = "src/packages";

// `index.ts` is the only door into a package. Privacy rests on that name rather than on a
// subfolder, so a spec can sit beside the file it specifies without opening it up.
const ENTRY_POINT = `^${R}/[^/]+/index\\.ts$`;
const ANY_PACKAGE_FILE = `^${R}/[^/]+/`;
const TEST_FILE = `^${R}/[^/]+/[^/]+\\.test\\.tsx?$`;

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "entrypoint-boundary-from-app",
      comment:
        "App/root code reaches a package through its index.ts and nothing else. Every other file in a package is private, wherever it sits.",
      severity: "error",
      from: { pathNot: `^${R}/` },
      to: { path: ANY_PACKAGE_FILE, pathNot: ENTRY_POINT },
    },
    {
      name: "entrypoint-boundary-across-packages",
      comment:
        "A package's own files import each other freely, but may reach OTHER packages only through their entry points, never their internals.",
      severity: "error",
      from: { path: `^${R}/([^/]+)/`, pathNot: TEST_FILE },
      to: {
        path: ANY_PACKAGE_FILE,
        pathNot: [`^${R}/$1/`, ENTRY_POINT],
      },
    },
    {
      name: "tests-through-entrypoints",
      comment:
        "A spec sits beside the file it specifies but goes through index.ts like everyone else. Importing the neighbouring file would bind the spec to an implementation instead of a behaviour.",
      severity: "error",
      from: { path: TEST_FILE },
      to: { path: ANY_PACKAGE_FILE, pathNot: [ENTRY_POINT, TEST_FILE] },
    },
    {
      name: "tests-are-not-an-entry-point",
      comment:
        "A test file shares the package root with the code it specifies, but nothing may import it.",
      severity: "error",
      from: { pathNot: TEST_FILE },
      to: { path: TEST_FILE },
    },
    {
      name: "domain-does-not-depend-on-the-app",
      comment:
        "Dependencies point inward. A package knows nothing about the pages, the components or the data that feed it.",
      severity: "error",
      from: { path: `^${R}/` },
      to: { path: "^src/(app|components|data|lib)/" },
    },
    {
      name: "no-circular",
      comment:
        "No dependency cycles. Scope to `^${R}/` if you want to allow cycles outside packages.",
      severity: "error",
      from: {},
      to: { circular: true },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    tsConfig: { fileName: "tsconfig.json" },
    enhancedResolveOptions: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
  },
};
