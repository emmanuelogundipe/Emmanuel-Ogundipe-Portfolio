/**
 * Applies the saved colour theme before first paint.
 * Must run synchronously in <head> — hence a plain external file rather than a
 * module or a deferred script. See the note in index.html.
 */
(function () {
  try {
    var saved = localStorage.getItem("o-eo-theme");
    var prefersLight =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    document.documentElement.setAttribute("data-theme", saved || (prefersLight ? "light" : "dark"));
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();