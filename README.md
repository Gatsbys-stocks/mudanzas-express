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
  why.yml              Bloque "Por qué elegirnos" de la portada (texto, cifras y 3 tarjetas)
  faq.yml              Preguntas frecuentes (portada)
  steps.yml · values.yml · highlights.yml · quote.yml · navigation.yml
_layouts/
  default.html         Esqueleto común de todas las páginas
  page.html            Páginas interiores (cabecera con título)
_includes/             Piezas reutilizables
  head.html · header.html · footer.html · cta-band.html
  wa-button.html       Botón/enlace de WhatsApp (único sitio donde se construye)
  quick-quote.html     Formulario rapido de la portada
  ticker.html          Banda de servicios en movimiento
  service-cards.html   Rejilla "bento" de servicios (página Servicios)
  service-carousel.html Carrusel de servicios con fotos verticales (portada)
  route-map.html       Esquema de rutas desde Barcelona
  faq.html · figure.html · icon.html · whatsapp-icon.html
_sass/                 Estilos por responsabilidad
  base.scss            Variables, reset, tipografía
  layout.scss          Cabecera, pie, secciones, rejillas
  components.scss      Botones, tarjetas, formulario, galería, WhatsApp flotante
  pages.scss           Portada, servicios y contacto
  animations.scss      Todas las animaciones (respetan "reducir movimiento")
assets/
  css/main.scss        Une los parciales de _sass
  js/boot.js           Se ejecuta antes de pintar: aplica el tema guardado
  js/app.js            Tema, menú móvil, animaciones al hacer scroll, formularios -> WhatsApp y año
  js/count.js          GoatCounter (estadísticas de visitas, licencia ISC)
  img/brand/           Logotipo (SVG y PNG), favicon, iconos y og-image.png (imagen al compartir)
  img/flota/           Fotos (WebP): flota, servicios, Barcelona. Se asignan en _data/fleet.yml y _data/services.yml
index.html · servicios.html · mudanzas.html · flota.html · empresa.html · contacto.html
```

La cabecera, el pie, el menú y los botones de WhatsApp se escriben **una sola vez** y se reutilizan en todas las páginas.

## Cambios habituales
| Quiero cambiar… | Dónde |
|---|---|
| Número de WhatsApp o mensaje inicial | `_data/site.yml` |
| Nombre de la empresa / dominio | `_data/site.yml` y `_config.yml` |
| Firma de copyright (pie) / GoatCounter | `studio` y `goatcounter` en `_data/site.yml` (vacio = sin estadisticas) |
| Servicios | `_data/services.yml` |
| Preguntas frecuentes | `_data/faq.yml` |
| Foto grande de la portada | `assets/img/flota/hero.webp` (2000 px), `hero-1000.webp` y `hero-movil.webp` (versión vertical para móvil) |
| Fotos de la flota y de los servicios | sustituir el archivo en `assets/img/flota/` (mismo nombre) o editar `_data/fleet.yml` / `_data/services.yml`; la panorámica es `flota-panoramica.webp` |
| Textos de una página | el `.html` de esa página |
| Colores (claro y oscuro) | variables al principio de `_sass/base.scss` (bloque `:root` = claro, `dark-tokens` = oscuro) |
| Tipografías | `_sass/base.scss`; las fuentes se cargan desde Google Fonts en `_includes/head.html` |

