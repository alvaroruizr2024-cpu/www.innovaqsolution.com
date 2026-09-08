# Publicar un video de YouTube en innovaqsolution.com

El sitio es HTML estatico con React via Babel en el navegador (sin build). Hay
dos paginas relevantes:

## `/global/index.html`: carrusel del canal (`YouTubeSection`)

Es el lugar por defecto para un video nuevo del canal. La lista esta en la
constante `YT_VIDEOS` dentro de `function YouTubeSection()`:

```js
const YT_VIDEOS = [
  { id: 'LQV8Hgv7A24', title: 'Titulo exacto del video' },
  { id: 'gLOilUpTnhw', title: 'Hotel 360: El Sistema Nervioso de la Hoteleria Moderna' },
  ...
];
```

- El primer elemento es el que se reproduce al cargar. Un video nuevo va primero.
- `id` son los 11 caracteres del video; el `si=` de los enlaces compartidos se descarta.
- `title` alimenta el atributo `title` del `iframe` (accesibilidad) y se muestra
  bajo el reproductor. Usa el titulo real de YouTube; si no lo tienes, un
  provisional reconocible y avisa.
- El reproductor usa `youtube-nocookie.com/embed/<id>?rel=0&modestbranding=1` y las
  miniaturas `img.youtube.com/vi/<id>/mqdefault.jpg`; no hay que tocar nada mas.
- Los titulos existentes evitan tildes de forma deliberada (el archivo mezcla
  `React.createElement` con strings sin escapar); sigue esa convencion.

Verificacion rapida sin navegador:

```bash
node -e "const s=require('fs').readFileSync('global/index.html','utf8');
const m=s.match(/const YT_VIDEOS = \[([\s\S]*?)\];/);eval('var a=['+m[1]+']');
console.log(a.length,'videos; primero:',a[0])"
```

## `/index.html`: home de Innovaq (Tailwind + React)

No tiene seccion de video. Si el usuario pide el video en la home, agrega una
seccion entre `#nosotros` y `#contacto` siguiendo el estilo existente
(`py-20`, titulo `text-3xl font-bold text-brand-blue`, colores `brand.blue`
`#003366` y `brand.orange` `#F68D2E`) con un contenedor de aspecto 16:9:

```jsx
<section id="video" className="py-20 bg-white">
  <div className="container mx-auto px-6 max-w-4xl">
    <h3 className="text-3xl font-bold text-brand-blue mb-8 text-center">Conoce Innovaq Solution</h3>
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe className="absolute inset-0 w-full h-full rounded-sm shadow-lg"
        src="https://www.youtube-nocookie.com/embed/VIDEO_ID?rel=0&modestbranding=1"
        title="Titulo exacto del video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen />
    </div>
  </div>
</section>
```

Agrega el enlace `#video` al menu de escritorio y al movil si creas la seccion.

## Commit

Rama de trabajo indicada por la sesion; mensaje en español describiendo el
video agregado y donde. No subir el video ni fotogramas al repositorio.
