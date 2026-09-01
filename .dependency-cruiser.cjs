// @ts-check
// Vendored from mattpocock/skills, setup-ts-deep-modules (MIT), then adapted to
// test files that sit beside their source. See .claude/rules/domain.md.

const R = "src/packages";

// Root files are a package's entry points, so they are deliberately not matched.
const PACKAGE_INTERNALS = `^${R}/[^/]+/[^/]+/`;
const TEST_FILE = `^${R}/[^/]+/[^/]+\\.test\\.tsx?$`;

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "entrypoint-boundary-from-app",
      comment:
        "App/root code may import a package's entry points (its root files), but nothing inside its subfolders.",
      severity: "error",
      from: { pathNot: `^${R}/` },
      to: { path: PACKAGE_INTERNALS },
    },
    {
      name: "entrypoint-boundary-across-packages",
      comment:
        "A package's own files import each other freely, but may reach OTHER packages only through their entry points, never their internals.",
      severity: "error",
      from: { path: `^${R}/([^/]+)/`, pathNot: TEST_FILE },
      to: {
        path: PACKAGE_INTERNALS,
        pathNot: `^${R}/$1/`,
      },
    },
    {
      name: "tests-through-entrypoints",
      comment:
        "A test sits beside the entry point it exercises and goes through it like everyone else. Reaching into an implementation folder means the seam is in the wrong place.",
      severity: "error",
      from: { path: TEST_FILE },
      to: { path: PACKAGE_INTERNALS },
    },
    {
      name: "tests-are-not-an-entry-point",
      comment:
        "A test file shares the package root with the entry points, but nothing may import it.",
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
