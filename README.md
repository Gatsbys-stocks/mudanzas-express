# Mudanzas Express BCN

Sitio web hecho con **Jekyll**, que GitHub Pages compila automáticamente: no hace falta instalar nada para publicarlo.

## Estructura

```
_config.yml            Configuración general (título, dominio, baseurl)
_data/                 Contenido editable, separado del diseño
  site.yml             Nombre, dominio y NÚMERO DE WHATSAPP
  services.yml         Los 6 servicios (textos)
  fleet.yml            Fotos de la flota y sus pies de foto
  countries.yml        Países de mudanzas internacionales
  faq.yml              Preguntas frecuentes (portada)
  steps.yml · values.yml · highlights.yml · quote.yml · navigation.yml
_layouts/
  default.html         Esqueleto común de todas las páginas
  page.html            Páginas interiores (cabecera con título)
_includes/             Piezas reutilizables
  head.html · header.html · footer.html · cta-band.html
  wa-button.html       Botón/enlace de WhatsApp (único sitio donde se construye)
  quick-quote.html     Formulario rapido de la portada
  service-cards.html   Rejilla "bento" de servicios
  route-map.html       Esquema de rutas desde Barcelona
  faq.html · figure.html · icon.html · whatsapp-icon.html
_sass/                 Estilos por responsabilidad
  base.scss            Variables, reset, tipografía
  layout.scss          Cabecera, pie, secciones, rejillas
  components.scss      Botones, tarjetas, formulario, galería, WhatsApp flotante
  pages.scss           Portada, servicios y contacto
assets/
  css/main.scss        Une los parciales de _sass
  js/app.js            Menú móvil, formularios -> WhatsApp y año del copyright
  js/count.js          GoatCounter (estadísticas de visitas, licencia ISC)
  img/                 Imágenes (flota/ = fotos de camiones y furgonetas)
index.html · servicios.html · mudanzas.html · flota.html · empresa.html · contacto.html
```

La cabecera, el pie, el menú y los botones de WhatsApp se escriben **una sola vez** y se reutilizan en todas las páginas.

