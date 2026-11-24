/* Age gate, keyboard and screen reader support.
   While the gate is open: keyboard focus starts on "Yes, I'm 21+", Tab and
   Shift+Tab stay inside the gate, and the page behind it is inert (not
   focusable, hidden from screen readers). On "Yes" the page comes back and
   focus returns to the top of it. Loaded right after the gate markup. */
(function () {
  var g = document.getElementById("agegate");
  if (!g || g.style.display === "none" || getComputedStyle(g).display === "none") return;

  var others = Array.prototype.filter.call(document.body.children, function (el) {
    return el !== g && el.tagName !== "SCRIPT";
  });
  others.forEach(function (el) { el.setAttribute("inert", ""); el.setAttribute("aria-hidden", "true"); });

  var heading = g.getAttribute("aria-labelledby") ? null : g.querySelector("div[style*='Oswald']");
  if (heading && !heading.id) { heading.id = "agegate-title"; g.removeAttribute("aria-label"); g.setAttribute("aria-labelledby", "agegate-title"); }

  function focusables() {
    return Array.prototype.filter.call(g.querySelectorAll("button, a[href]"), function (el) { return el.offsetParent !== null; });
  }
  var first = g.querySelector("button");
  if (first) first.focus();

  function trap(e) {
    if (e.key !== "Tab") return;
    var f = focusables(); if (!f.length) return;
    var a = f[0], z = f[f.length - 1];
    if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
    else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    else if (!g.contains(document.activeElement)) { e.preventDefault(); a.focus(); }
  }
  document.addEventListener("keydown", trap, true);

  var yes = window.dnAgeYes;
  window.dnAgeYes = function () {
    if (typeof yes === "function") yes.apply(this, arguments);
    document.removeEventListener("keydown", trap, true);
    others.forEach(function (el) { el.removeAttribute("inert"); el.removeAttribute("aria-hidden"); });
    var start = document.querySelector(".skip-link") || document.body;
    if (start === document.body) document.body.setAttribute("tabindex", "-1");
    start.focus();
  };
})();
