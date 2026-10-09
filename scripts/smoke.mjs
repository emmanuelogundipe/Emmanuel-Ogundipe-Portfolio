/**
 * Dependency-free render smoke test.
 *
 *   npm run smoke
 *
 * Renders the entire <App /> in Node with a handful of browser stubs. It
 * catches the class of bug where the bundler compiles cleanly but the app
 * throws at runtime and the visitor stares at a blank page.
 *
 * Exit code 1 = failure, so it can gate a deploy.
 */
const BUNDLE = ".smoke-out/smoke-render.js";

/* --- Minimal browser surface the components touch during render ---------- */
const elementStub = {
  attributes: {},
  getAttribute(name) {
    return this.attributes[name] ?? null;
  },
  setAttribute(name, value) {
    this.attributes[name] = value;
  },
};

globalThis.document = {
  documentElement: elementStub,
  body: elementStub,
  createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }),
  addEventListener() {},
  removeEventListener() {},
};

globalThis.window = {
  document: globalThis.document,
  matchMedia: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent: () => false,
  }),
  localStorage: {
    _v: {},
    getItem(k) {
      return this._v[k] ?? null;
    },
    setItem(k, v) {
      this._v[k] = String(v);
    },
  },
  addEventListener() {},
  removeEventListener() {},
  scrollTo() {},
  getComputedStyle: () => ({ getPropertyValue: () => "" }),
};
globalThis.self = globalThis.window;
// Node >= 21 exposes a read-only global `navigator`; leave the real one alone.
try {
  globalThis.navigator = globalThis.navigator ?? { userAgent: "smoke-test" };
} catch {
  /* read-only — the built-in value is fine */
}

class NoopObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
globalThis.IntersectionObserver = NoopObserver;
globalThis.ResizeObserver = NoopObserver;
globalThis.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
globalThis.cancelAnimationFrame = (id) => clearTimeout(id);

/* --- Run ----------------------------------------------------------------- */
const { check } = await import(new URL(`../${BUNDLE}`, import.meta.url).href);

let result;
try {
  result = check();
} catch (error) {
  console.error("\n  RENDER FAILED — the site would show a blank page.\n");
  console.error(`  ${error.message}`);
  const frame = String(error.stack ?? "").split("\n").find((l) => l.includes(".jsx"));
  if (frame) console.error(`  ${frame.trim()}`);
  console.error("");
  process.exit(1);
}

console.log("\n  Render smoke test — PASSED");
console.log(`  ${result.tags} tags · ${result.images} images · ${result.chars.toLocaleString()} chars\n`);
for (const [label, ok] of Object.entries(result.assertions)) {
  console.log(`  ${ok ? "✓" : "✗"} ${label}`);
}
console.log("");

if (!result.allPassed) process.exit(1);