-- Seed para PostgreSQL (ejecútalo luego de init.sql)
-- Inserta 10 cursos (incluye algunos inactive para demo).

INSERT INTO courses (img, title, subtitle, description, price, tag, duration, instructor, schedule, active)
VALUES
  (
    'https://placehold.co/960x540/png?text=Angular+Avanzado',
    'Angular Avanzado',
    'Crea aplicaciones modernas en Angular 21',
    'Arquitectura, formularios, rutas, rendimiento y buenas prácticas aplicadas a un proyecto real.',
    249.00,
    'Frontend',
    '24 horas',
    'Fernando',
    'Lun/Mié/Vie 7:00pm - 9:00pm',
    TRUE
  ),
  (
    'https://placehold.co/960x540/png?text=React+Native',
    'React Native',
    'Crea aplicaciones híbridas con el framework más popular',
    'Componentes, navegación, consumo de APIs, almacenamiento local y publicación de builds.',
    229.00,
    'Frontend',
    '20 horas',
    'Fernando',
    'Mar/Jue 7:00pm - 9:30pm',
    TRUE
  ),
  (
    'https://placehold.co/960x540/png?text=Vue.js',
    'Vue.js',
    'Desarrollo de Aplicaciones Web Modernas',
    'Reactividad, componentes, routing, estado y patrones típicos para apps modernas.',
    189.00,
    'Frontend',
    '18 horas',
    'Fernando',
    'Sáb 9:00am - 1:00pm',
    TRUE
  ),
  (
    'https://placehold.co/960x540/png?text=Next.js',
    'Crea Aplicaciones con Next.js',
    'Usa React de forma profesional',
    'Rutas, SSR/SSG, APIs, optimización y despliegue para proyectos reales.',
    279.00,
    'Frontend',
    '22 horas',
    'Fernando',
    'Lun/Mié 7:00pm - 9:30pm',
    TRUE
  ),
  (
    'https://placehold.co/960x540/png?text=NestJS+Microservicios',
    'Microservicios con Nestjs',
    'Desarrollo de aplicaciones empresariales',
    'Diseño de microservicios, mensajería, módulos, testing básico y documentación.',
    299.00,
    'Backend',
    '26 horas',
    'Fernando',
    'Mar/Jue 7:00pm - 9:30pm',
    TRUE
  ),
  (
    'https://placehold.co/960x540/png?text=API+REST+Node.js',
    'Mi Primera API REST con Node.js',
    'Aprende a crear aplicaciones web',
    'Express desde cero: rutas, middlewares, validaciones básicas y conexión a BD.',
    159.00,
    'Backend',
    '14 horas',
    'Fernando',
    'Sáb 3:00pm - 6:30pm',
    TRUE
  ),
  (
    'https://placehold.co/960x540/png?text=JS+Fundamentos',
    'Fundamentos de Programación con JavaScript',
    'Aprende creando con el lenguaje de la Web',
    'Variables, funciones, objetos, arrays, DOM y asincronía con ejercicios guiados.',
    99.00,
    'Fundamentos',
    '16 horas',
    'Fernando',
    'Dom 9:00am - 1:00pm',
    TRUE
  ),
  (
    'https://placehold.co/960x540/png?text=PostgreSQL',
    'PostgreSQL para Desarrolladores',
    'Modelado, consultas y optimización básica',
    'Tablas, relaciones, índices, joins y diseño mínimo para aplicaciones web.',
    179.00,
    'BDatos',
    '12 horas',
    'Fernando',
    'Mié/Vie 7:00pm - 9:00pm',
    TRUE
  ),
  (
    'https://placehold.co/960x540/png?text=Git+GitHub',
    'Git y GitHub desde Cero',
    'Control de versiones para proyectos reales',
    'Commits, ramas, merges, pull requests y flujo de trabajo para equipos.',
    89.00,
    'Herramientas',
    '8 horas',
    'Fernando',
    'Mar 7:00pm - 9:00pm',
    TRUE
  ),
  (
    'https://placehold.co/960x540/png?text=CSS+Moderno',
    'CSS Moderno',
    'Layouts responsive con Flexbox y Grid',
    'Componentes, responsive, utilidades y patrones de UI para landing pages.',
    109.00,
    'Frontend',
    '10 horas',
    'Fernando',
    'Jue 7:00pm - 9:30pm',
    FALSE
  );

