/* Mudanzas Express BCN - interacciones */

/* ---------- Tema claro / oscuro ---------- */
(function () {
  var btn = document.getElementById("themeToggle");
  if (!btn) return;
  var dark = window.matchMedia("(prefers-color-scheme: dark)");
  function current() {
    return document.documentElement.getAttribute("data-theme") || (dark.matches ? "dark" : "light");
  }
  btn.addEventListener("click", function () {
    var next = current() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
})();

/* ---------- Barra de progreso y cabecera al hacer scroll ---------- */
(function () {
  var bar = document.getElementById("progress");
  var ticking = false;
  function update() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var y = window.scrollY || 0;
    if (bar) bar.style.setProperty("--p", max > 0 ? Math.min(1, y / max) : 0);
    document.documentElement.classList.toggle("is-scrolled", y > 12);
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
})();

/* ---------- Foco de luz en las tarjetas (sigue al cursor) ---------- */
(function () {
  document.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });
})();

/* ---------- Aparicion al hacer scroll ---------- */
(function () {
  var SELECTOR = ".sec-head, .bento .card, .grid-3 > .card, .steps li, .route, .pano, .gallery figure, .faq, .cta-panel, " +
    ".split > *, .strip-grid > div, .wa-card, .form, .checks.two";
  var items = [].slice.call(document.querySelectorAll(SELECTOR));
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!items.length || reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  items.forEach(function (el) {
    var siblings = el.parentElement ? [].slice.call(el.parentElement.children) : [el];
    el.setAttribute("data-reveal", "");
    el.style.setProperty("--d", Math.min(siblings.indexOf(el), 5) * 0.08 + "s");
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      io.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  items.forEach(function (el) { io.observe(el); });
})();

/* ---------- Fotos ampliables (figure[data-lightbox]) ---------- */
(function () {
  var figs = [].slice.call(document.querySelectorAll("figure[data-lightbox]"));
  if (!figs.length || typeof HTMLDialogElement === "undefined") return;

  var dlg = document.createElement("dialog");
  dlg.className = "lightbox";
  dlg.setAttribute("aria-label", "Foto ampliada");
  var img = document.createElement("img");
  var cap = document.createElement("p");
  function button(cls, label, text) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "lb-btn " + cls; b.setAttribute("aria-label", label); b.textContent = text;
    return b;
  }
  var prev = button("lb-prev", "Foto anterior", "\u2039");
  var next = button("lb-next", "Foto siguiente", "\u203A");
  var close = button("lb-close", "Cerrar", "\u00D7");
  [img, cap, prev, next, close].forEach(function (el) { dlg.appendChild(el); });
  document.body.appendChild(dlg);

  var index = 0;
  function show(i) {
    index = (i + figs.length) % figs.length;
    var src = figs[index].querySelector("img");
    var text = figs[index].querySelector("figcaption");
    img.src = src.currentSrc || src.src;
    img.alt = src.alt;
    cap.textContent = text ? text.textContent : src.alt;
    var many = figs.length > 1;
    prev.hidden = next.hidden = !many;
  }
  function open(i) { show(i); if (!dlg.open) dlg.showModal(); }

  figs.forEach(function (fig, i) {
    fig.setAttribute("tabindex", "0");
    fig.setAttribute("role", "button");
    fig.setAttribute("aria-label", "Ampliar foto");
    fig.addEventListener("click", function () { open(i); });
    fig.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); }
    });
  });
  prev.addEventListener("click", function () { show(index - 1); });
  next.addEventListener("click", function () { show(index + 1); });
  close.addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
})();

/* ---------- Año del copyright ---------- */
(function () {
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();

/* ---------- Menu movil (hamburguesa) ---------- */
(function () {
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  if (!burger || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }

  burger.addEventListener("click", function () {
    setOpen(!nav.classList.contains("open"));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") setOpen(false);
  });
})();

/* ---------- Formularios de presupuesto: form[data-quote] -> mensaje de WhatsApp ----------
   El numero viene del atributo data-whatsapp del formulario (_data/site.yml). */
(function () {
  var LABELS = [
    ["tipo", "Tipo de mudanza"],
    ["origen", "Origen"],
    ["destino", "Destino"],
    ["fecha", "Fecha aproximada"],
    ["mensaje", "Detalles"]
  ];

  function formatDate(iso) {
    var p = iso.split("-");
    return p[2] + "/" + p[1] + "/" + p[0];
  }

  function buildMessage(f) {
    var name = f.nombre && f.nombre.value.trim();
    var lines = [name ? "Hola, soy " + name + " y quiero pedir presupuesto." : "Hola, quiero pedir presupuesto."];
    LABELS.forEach(function (item) {
      var field = f[item[0]];
      var value = field && field.value.trim();
      if (!value) return;
      lines.push(item[1] + ": " + (item[0] === "fecha" ? formatDate(value) : value));
    });
    return lines.join("\n");
  }

  function setup(form) {
    var error = form.querySelector(".err");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;
      form.querySelectorAll("[required]").forEach(function (field) {
        var empty = !field.value.trim();
        field.classList.toggle("is-bad", empty);
        if (empty) valid = false;
      });
      if (error) error.hidden = valid;
      if (!valid) return;
      var url = "https://wa.me/" + form.dataset.whatsapp + "?text=" + encodeURIComponent(buildMessage(form.elements));
      window.open(url, "_blank", "noopener");
    });
  }

  document.querySelectorAll("form[data-quote]").forEach(setup);
})();
