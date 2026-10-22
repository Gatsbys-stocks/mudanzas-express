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

## Publicar en GitHub Pages
1. Crea un repositorio y sube **todo el contenido** de esta carpeta a la raíz.
2. **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch `main` / `(root)` → Save.**
3. Tarda 1–2 minutos en compilar.

### Con dominio propio (mudanzasexpressbcn.es)
1. **Settings → Pages → Custom domain**: `mudanzasexpressbcn.es` → Save (GitHub crea el archivo `CNAME`).
2. En el DNS del dominio añade 4 registros **A** (host `@`) a `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` y un **CNAME** (host `www`) a `TU-USUARIO.github.io`.
3. Cuando GitHub lo verifique, activa **Enforce HTTPS**.

### Sin dominio propio (https://USUARIO.github.io/REPO)
Edita `_config.yml` y pon `baseurl: "/REPO"` (con el nombre real del repositorio). Con dominio propio déjalo vacío (`baseurl: ""`).

## Probarlo en tu ordenador (opcional)
Necesita Ruby. Desde la carpeta:
```
bundle install
bundle exec jekyll serve
```
y abre http://localhost:4000. (Las páginas no se ven bien abriendo los `.html` con doble clic: hay que compilarlas.)

## Créditos de las fotos
Las fotos de la portada y de los servicios son de [Pexels](https://www.pexels.com) (licencia Pexels: uso comercial libre, sin atribución obligatoria): 
18602897 (portada), 31405655 (portada móvil), 18602895 (Barcelona), 7217785, 7464676, 7218131, 7464703, 7218678, 7464495, 7217852, 7843996 y 7843987 (estas dos últimas, `furgoneta-cajas*`, son de furgonetas de reparto, no de mudanza).
Las demás fotos de la flota (`camion-*`, `furgoneta-interior-trasera`, `flota-panoramica`) son imágenes generadas con IA: sustitúyelas por fotos reales de los vehículos del cliente.
