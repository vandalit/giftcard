# Proyecto: Giftcards Syzygy

Este proyecto demuestra cómo crear un sistema de giftcards estático utilizando **HTML, TailwindCSS, JavaScript** y un **archivo JSON** para almacenar los datos. Adicionalmente, se implementa un **token de seguridad** para controlar el acceso a cada giftcard.

## 1. Descripción General

El objetivo principal es simular la generación y visualización de tarjetas de regalo (giftcards), cada una con:

- **ID** único.
- **Token** de seguridad para asegurar que solo usuarios autorizados puedan verla.
- **Datos** personalizables, como emisor, receptor, mensaje, imagen de fondo, paleta de colores, etc.

El sistema funciona de manera **estática** (sin un backend complejo), lo cual lo hace fácil de desplegar en un hosting como [SiteGround](https://www.siteground.com/), [GitHub Pages](https://pages.github.com/), [Vercel](https://vercel.com/) u otros servicios similares.

## 2. Tecnologías Usadas

- **HTML5** para la estructura de las páginas.
- **TailwindCSS** (vía CDN) para la estilización rápida con utilidades.
- **JavaScript** (Vanilla) para la lógica de renderizado y verificación de tokens.
- **JSON** para almacenar y gestionar los datos de las giftcards.

## 3. Estructura de Carpetas

```
bashCopy codegiftcard/
 ├─ index.html         # [código index.html]
 ├─ js/
 │   └─ app.js         # [lógica app.js]
 ├─ data/
 │   └─ giftcards.json # Datos de las giftcards
 └─ css/
     └─ style.css      # Estilos personalizados (opcional)
```

### Explicación de cada archivo

1. **index.html**
   - Contiene la **sección de error** (oculta por defecto) y la **sección de giftcard** (también oculta inicialmente).
   - Carga **TailwindCSS** desde un CDN y enlaza el archivo `app.js`.
   - Su objetivo es mostrar u ocultar la información en función de la lógica que haya en el JS.
2. **app.js**
   - Obtiene los parámetros `id` y `token` de la URL (por ejemplo, `?id=16&token=abc123`).
   - Carga el archivo `giftcards.json` usando `fetch`.
   - Verifica la existencia del `id` en el JSON y comprueba si el `token` coincide con el almacenado para esa giftcard.
   - Si la validación es correcta, renderiza la giftcard; en caso contrario, muestra la sección de error.
3. **giftcards.json**
   - Contiene un objeto con claves numéricas (o alfanuméricas) que representan el `id` de la giftcard.
   - Cada giftcard tiene atributos como `token`, `emitterName`, `receiverName`, `bgImage`, `colors`, etc.
   - Es el **“catálogo”** de todas las giftcards disponibles.
4. **style.css** (opcional)
   - Archivo de estilos personalizado, si se desea una capa adicional sobre las utilidades de Tailwind.
   - Por ejemplo, podrías definir clases para animaciones o reglas específicas que no cubra Tailwind de forma directa.

## 4. Flujo de Funcionamiento

1. **Acceso a la URL**

   - El usuario accede a una URL como:

     ```
     bash
     
     
     Copy code
     https://proyectos.syzygy.metamedia.cl/giftcard?id=16&token=abc123
     ```

   - Donde `id=16` identifica la giftcard y `token=abc123` se usa para validarla.

2. **Validación de parámetros**

   - En el archivo [lógica app.js], se extraen los parámetros de la URL.
   - Se hace un `fetch` al archivo `giftcards.json`.
   - Se busca la clave `"16"` en el JSON y se compara el `token` guardado ahí con el recibido por la URL.

3. **Renderizado**

   - Si `id` y `token` coinciden, se inyectan los datos de la giftcard en la sección correspondiente de [código index.html].
   - Se personaliza el **fondo**, los **colores** del botón, el **mensaje**, etc., usando los datos recuperados.

4. **Pantalla de error**

   - Si el `id` no existe o el `token` no coincide, la lógica en [app.js] muestra la sección de **error** y esconde la giftcard.

## 5. Paso a Paso de Desarrollo

1. **Planificación**

   - Decidir la estructura de la información.
   - Definir qué datos tendrá cada giftcard (emisor, receptor, etc.).
   - Determinar la forma de seguridad (token en la URL).

2. **Creación de la maqueta HTML**

   - Crear un archivo `index.html` con dos secciones: una para **error** y otra para la **giftcard**.
   - Añadir TailwindCSS desde CDN para estilizar fácilmente.

3. **Implementación de la lógica en JavaScript**

   - Definir cómo obtener los parámetros `id` y `token` de la URL usando la API `URLSearchParams`.
   - Hacer un `fetch` al archivo `giftcards.json` y manejar el caso de éxito/error.
   - Realizar la comparación entre `token` del JSON y `token` de la URL.
   - Renderizar dinámicamente la giftcard en caso de validación o mostrar la sección de error si no pasa.

4. **Creación y alimentación del archivo JSON**

   - Diseñar la estructura del JSON, por ejemplo:

     ```
     jsonCopy code{
       "16": {
         "token": "abc123",
         "emitterName": "...",
         "receiverName": "...",
         "bgImage": "...",
         "colors": { "primary": "#...", "secondary": "#..." },
         "extraValue": "..."
       }
       // ...
     }
     ```

   - Completar con la información necesaria para cada giftcard.

5. **Testing**

   - Probar URLs válidas e inválidas (cambiar `id`, omitir `token`, etc.) para confirmar que la lógica funciona.
   - Revisar la visualización en distintos navegadores y tamaños de pantalla.

6. **Optimización y mejoras**

   - Incorporar animaciones, transiciones o elementos más avanzados de TailwindCSS.
   - Agregar un sistema de “versión” o “estado” de la giftcard (activa, caducada, etc.).
   - (Opcional) Migrar a un backend real para manejar la seguridad de forma más robusta.

## 6. Ejemplo de Uso

Una vez desplegado el proyecto en tu hosting, puedes generar una URL de la forma:

```
bash


Copy code
https://tudominio.com/giftcard?id=16&token=abc123

```

El usuario que tenga esa URL podrá ver la giftcard (si coincide el `token`).
Si alguien intenta usar un token falso, o un `id` inexistente, aparecerá la sección de error.

## 7. Licencia y Contribuciones

- **Licencia**: Puedes indicar tu licencia (MIT, GPL, etc.) si planeas compartirlo públicamente.
- **Contribuciones**: Anima a estudiantes o colaboradores a crear pull requests para mejorar el sistema, añadir tests, etc.

## 8. Recursos y Referencias

- [Documentación oficial de TailwindCSS](https://tailwindcss.com/docs).
- [Uso de fetch en JavaScript](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch).
- [URLSearchParams para manejar parámetros de la URL](https://developer.mozilla.org/es/docs/Web/API/URLSearchParams).

------

> **Nota**: Este README no repite el código exacto de [código index.html] ni de [lógica app.js], sino que los describe y referencia. Para revisar el código completo, consulta los archivos en el repositorio.