/* Mudanzas Express BCN - interacciones */

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
