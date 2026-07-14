import type { BlogPost } from "./schema";

export type PublicBlogPost = Pick<
  BlogPost,
  "title" | "slug" | "excerpt" | "content" | "tags" | "publishedAt"
>;

export const fallbackBlogPosts: PublicBlogPost[] = [
  {
    title: "Cómo pienso una interfaz frontend mantenible",
    slug: "interfaz-frontend-mantenible",
    excerpt:
      "Una guía práctica para separar estructura, datos y estados visuales sin sobrediseñar una aplicación React o Next.js.",
    tags: ["React", "Frontend", "Arquitectura"],
    publishedAt: new Date("2026-07-14T00:00:00.000Z"),
    content: `Una interfaz mantenible no empieza por elegir una librería, sino por decidir dónde vive cada responsabilidad.

En una aplicación React o Next.js intento separar tres capas: datos, composición y presentación. La capa de datos se queda en servidor siempre que pueda. La composición decide qué se renderiza y en qué orden. La presentación mantiene estilos, estados visuales y microinteracciones.

Ese corte evita que un componente de card termine sabiendo demasiado sobre APIs, tokens o persistencia. También facilita cambiar una fuente de datos, como pasar de contenido hardcodeado a Neon, sin reescribir toda la UI.

La regla práctica es simple: si un dato necesita credenciales, pertenece al servidor; si una interacción depende del mouse, scroll o viewport, pertenece a un componente client-only; si algo solo muestra información, debería ser lo más simple posible.`,
  },
  {
    title: "Parallax y 3D sin sacrificar performance",
    slug: "parallax-3d-performance",
    excerpt:
      "Cómo usar Motion y React Three Fiber de forma sutil para sumar profundidad sin bloquear la experiencia móvil.",
    tags: ["Motion", "Three.js", "Performance"],
    publishedAt: new Date("2026-07-13T00:00:00.000Z"),
    content: `Los efectos visuales funcionan mejor cuando acompañan al contenido en vez de competir con él.

Para una landing técnica prefiero una capa 3D global, ligera y sin interacción directa. El canvas debe estar detrás del contenido, con pointer-events desactivado y un dpr limitado. En mobile conviene ocultarlo o reducirlo mucho.

Motion encaja mejor para microinteracciones: reveal de cards, hover, desplazamientos suaves y elementos que responden al scroll. Three.js o React Three Fiber los reservo para profundidad ambiental: partículas, líneas, geometrías simples y movimiento lento.

También es importante respetar prefers-reduced-motion. Una buena animación no debe ser obligatoria para entender ni navegar la página.`,
  },
];
