/**
 * ALL SITE CONTENT LIVES HERE — edit this file to update the portfolio.
 * Every text has an English (`en`) and Spanish (`es`) version.
 *
 * Search for "TODO(mauricio)" to find what still needs your input:
 * the content below reflects your experience up to August 2024.
 */
import type { L } from '../i18n'

import logo from '../assets/img/logo.webp'
import coTeriun from '../assets/img/co-teriun.webp'
import coGeneration from '../assets/img/co-generation.webp'
import coImmersive from '../assets/img/co-immersive.webp'
import coBmp from '../assets/img/co-bmp.webp'
import coPiknamic from '../assets/img/co-piknamic.webp'
import coSixGuys from '../assets/img/co-sixguys.webp'
import coPixelPioneers from '../assets/img/co-pixelpioneers.webp'
import coColapsum from '../assets/img/co-colapsum.webp'
import coUnmc from '../assets/img/co-unmc.webp'
import pNico from '../assets/img/p-nico.webp'
import pRodri from '../assets/img/p-rodri.webp'
import pChris from '../assets/img/p-chris.webp'
import imgLastCrusade from '../assets/img/project-last-crusade.webp'
import imgAstroBear from '../assets/img/project-astro-bear.webp'
import imgSkyway from '../assets/img/project-skyway-savior.webp'
import imgKiddo from '../assets/img/project-dont-stop-kiddo.webp'

export const profile = {
  name: 'Mauricio Castro',
  logo,
  // TODO(mauricio): update role/headline if your title changed since 2024.
  role: { en: 'Game Programmer · Unity Developer', es: 'Game Programmer · Desarrollador Unity' } as L,
  headline: {
    en: ['I build ', 'multiplayer and mobile games', ' that run smoothly and feel great to play.'],
    es: ['Construyo ', 'juegos multijugador y móviles', ' que corren fluido y se sienten bien al jugar.'],
  } as L<[string, string, string]>,
  intro: {
    en: 'Unity engineer focused on gameplay systems, real-time multiplayer and performance on mobile. I also lead teams and mentor new developers.',
    es: 'Ingeniero Unity enfocado en sistemas de gameplay, multijugador en tiempo real y rendimiento en móviles. También lidero equipos y soy mentor de nuevos desarrolladores.',
  } as L,
  about: {
    en: [
      'I am a game programmer with a strong software engineering base and a deep understanding of the Unity engine. I have taken games from prototype to release, implemented real-time multiplayer with Photon Fusion, and tuned Android builds to perform across a wide range of devices.',
      'Beyond code, I have led multidisciplinary teams of up to 15 people, run QA and delivery, and volunteered 200+ hours mentoring junior Unity developers.',
    ],
    es: [
      'Soy programador de videojuegos con una base sólida en ingeniería de software y un conocimiento profundo del motor Unity. He llevado juegos del prototipo al lanzamiento, implementado multijugador en tiempo real con Photon Fusion y optimizado builds de Android para una amplia gama de dispositivos.',
      'Más allá del código, he liderado equipos multidisciplinarios de hasta 15 personas, gestionado QA y entregas, y dedicado más de 200 horas como mentor voluntario de desarrolladores Unity junior.',
    ],
  } as L<string[]>,
  // TODO(mauricio): replace public/cv/Mauricio_Castro_CV.pdf with your current CV (same file name).
  cv: 'cv/Mauricio_Castro_CV.pdf',
  links: {
    linkedin: 'https://www.linkedin.com/in/maocastro13/',
    github: 'https://github.com/maocastro13',
  },
}

// TODO(mauricio): refresh these numbers.
export const stats: { value: string; label: L }[] = [
  { value: '900+', label: { en: 'players tried our demo at SOFA 2023', es: 'jugadores probaron nuestro demo en SOFA 2023' } },
  { value: '200+', label: { en: 'hours mentoring Unity developers', es: 'horas de mentoría a desarrolladores Unity' } },
  { value: '15', label: { en: 'people in the largest team I led', es: 'personas en el equipo más grande que lideré' } },
  { value: '2nd', label: { en: 'place of 20 teams, Game Jam UniSabana', es: 'puesto entre 20 equipos, Game Jam UniSabana' } },
]

export const specialties: { title: L; text: L }[] = [
  {
    title: { en: 'Gameplay programming', es: 'Programación de gameplay' },
    text: {
      en: 'Character controllers, state machines, IK, animation systems and procedural generation.',
      es: 'Controladores de personaje, máquinas de estados, IK, sistemas de animación y generación procedural.',
    },
  },
  {
    title: { en: 'Real-time multiplayer', es: 'Multijugador en tiempo real' },
    text: {
      en: 'Networked gameplay with Photon Fusion 1 & 2 for mobile titles.',
      es: 'Gameplay en red con Photon Fusion 1 y 2 para títulos móviles.',
    },
  },
  {
    title: { en: 'Mobile optimisation', es: 'Optimización móvil' },
    text: {
      en: 'Android performance tuning, build pipelines, ads monetisation and analytics.',
      es: 'Ajuste de rendimiento en Android, pipelines de build, monetización con anuncios y analítica.',
    },
  },
  {
    title: { en: 'Team leadership', es: 'Liderazgo de equipos' },
    text: {
      en: 'Agile delivery, QA processes and mentoring across multidisciplinary teams.',
      es: 'Entrega ágil, procesos de QA y mentoría en equipos multidisciplinarios.',
    },
  },
]

// TODO(mauricio): add the tools you have picked up since 2024.
export const skills: { group: L; items: string[] }[] = [
  {
    group: { en: 'Engine & gameplay', es: 'Motor y gameplay' },
    items: ['Unity', 'C#', 'Photon Fusion', 'Wwise', 'Shaders', 'Inverse Kinematics', 'VR / AR'],
  },
  {
    group: { en: 'Mobile & live ops', es: 'Móvil y live ops' },
    items: ['Android', 'Unity Ads', 'AdMob', 'Unity Analytics', 'WebGL'],
  },
  { group: { en: 'Languages', es: 'Lenguajes' }, items: ['C#', 'C', 'Java', 'Python', 'Bash'] },
  {
    group: { en: 'Practices & tools', es: 'Prácticas y herramientas' },
    items: ['SOLID', 'OOP', 'Agile / Scrum', 'Git', 'Jira', 'Trello'],
  },
]

export type Job = { title: L; company: string; logo: string; date: L; points: L<string[]> }

/*
 * TODO(mauricio): add your roles after August 2024 at the top of this list. Template:
 *
 * {
 *   title: { en: 'Role', es: 'Cargo' },
 *   company: 'Company',
 *   logo: coTeriun, // add a ~112px .webp to src/assets/img and import it above
 *   date: { en: 'Jan 2025 — Present', es: 'Ene 2025 — Actualidad' },
 *   points: {
 *     en: ['Impact-first bullet with a number.', 'Second bullet.', 'Third bullet.'],
 *     es: ['Logro con una cifra.', 'Segundo punto.', 'Tercer punto.'],
 *   },
 * },
 */
export const experience: Job[] = [
  {
    title: { en: 'Game Developer', es: 'Desarrollador de Videojuegos' },
    company: 'Teriun Games',
    logo: coTeriun,
    // TODO(mauricio): confirm whether this role is still current.
    date: { en: 'Jan 2024 — Present', es: 'Ene 2024 — Actualidad' },
    points: {
      en: [
        'Led full-cycle development of the hyper-casual game “Monster Runner”, from prototype to final version.',
        'Implemented real-time multiplayer with Photon Fusion in “Dragoids Arena” and “Dashmellow 3D”.',
        'Optimised Android builds for a wide range of devices and integrated monetisation and analytics (Unity Ads, AdMob, Unity Analytics).',
        'Ran QA, shipping 10+ major improvements driven by player feedback and data.',
      ],
      es: [
        'Lideré el desarrollo completo del juego hipercasual “Monster Runner”, del prototipo a la versión final.',
        'Implementé multijugador en tiempo real con Photon Fusion en “Dragoids Arena” y “Dashmellow 3D”.',
        'Optimicé builds de Android para una amplia gama de dispositivos e integré monetización y analítica (Unity Ads, AdMob, Unity Analytics).',
        'Dirigí QA, entregando más de 10 mejoras importantes basadas en feedback de jugadores y datos.',
      ],
    },
  },
  {
    title: { en: 'Unity Bootcamp Mentor (Volunteer)', es: 'Mentor de Bootcamp Unity (Voluntario)' },
    company: 'Generation Colombia',
    logo: coGeneration,
    date: { en: 'Aug 2023 — Present', es: 'Ago 2023 — Actualidad' },
    points: {
      en: [
        '200+ volunteer hours mentoring students of the Unity Jr. Developer Bootcamp, including 58 hours of hands-on Game Jam guidance.',
        'Ran technical interview workshops in Spanish and English; 90% success rate in the job placement processes I advised.',
        'Panelist in talks about the game industry in Colombia and worldwide.',
      ],
      es: [
        'Más de 200 horas de voluntariado como mentor del Bootcamp Unity Jr. Developer, incluidas 58 horas de acompañamiento práctico en Game Jams.',
        'Dicté talleres de entrevista técnica en español e inglés; 90% de éxito en los procesos de empleabilidad que asesoré.',
        'Panelista en charlas sobre la industria de videojuegos en Colombia y el mundo.',
      ],
    },
  },
  {
    title: { en: 'Project Lead & Game Programmer', es: 'Líder de Proyecto y Game Programmer' },
    company: 'Immersive Level',
    logo: coImmersive,
    date: { en: 'Jul 2023 — Dec 2023', es: 'Jul 2023 — Dic 2023' },
    points: {
      en: [
        'Led a 15-person team for 5 months on “The Last Crusade”, reaching 95% of the planned goals with a fully playable demo.',
        'Showcased at SOFA 2023 Beta Test Fest to 900+ players, with an approval rating above 85%.',
        'Rebuilt the main character locomotion: 9-state 2D freeform blend tree, foot IK on uneven terrain and Wwise audio integration.',
      ],
      es: [
        'Lideré un equipo de 15 personas durante 5 meses en “The Last Crusade”, alcanzando el 95% de las metas con un demo totalmente jugable.',
        'Presentado en el SOFA 2023 Beta Test Fest ante más de 900 jugadores, con una aprobación superior al 85%.',
        'Rehíce la locomoción del personaje principal: blend tree 2D freeform de 9 estados, IK de pies en terreno irregular e integración de audio con Wwise.',
      ],
    },
  },
  {
    title: { en: 'Unity Game Programmer', es: 'Programador Unity' },
    company: 'BMP-Infotech Group',
    logo: coBmp,
    date: { en: 'Aug 2023 — Oct 2023', es: 'Ago 2023 — Oct 2023' },
    points: {
      en: [
        'Designed and built the main character of an Android shooter around a finite state machine: movement, aiming, reloading, weapon switching and shooting.',
        'Created the weapon system (weapon types, ballistics, recoil, VFX) and a dynamic health and damage system.',
        'Integrated touch controls and tuned the Android build for smooth gameplay.',
      ],
      es: [
        'Diseñé y construí el personaje principal de un shooter para Android sobre una máquina de estados finita: movimiento, apuntado, recarga, cambio de arma y disparo.',
        'Creé el sistema de armas (tipos, balística, retroceso, VFX) y un sistema dinámico de vida y daño.',
        'Integré controles táctiles y ajusté el build de Android para un gameplay fluido.',
      ],
    },
  },
  {
    title: { en: 'Unity Developer', es: 'Desarrollador Unity' },
    company: 'Piknamic',
    logo: coPiknamic,
    date: { en: 'Jul 2023 — Oct 2023', es: 'Jul 2023 — Oct 2023' },
    points: {
      en: [
        'Rebuilt the screenshot system with bilinear texture scaling: from a single 1218×696 output to 16:9, 2:3 and 1:1, scalable up to 8K, with live preview.',
        'Built a configurable shadow system (projector, custom textures and shaders) with hard and cast shadow modes selectable from the UI.',
      ],
      es: [
        'Rehíce el sistema de capturas con escalado bilineal de texturas: de una única salida de 1218×696 a 16:9, 2:3 y 1:1, escalable hasta 8K, con vista previa en vivo.',
        'Construí un sistema de sombras configurable (projector, texturas y shaders propios) con modos de sombra dura y proyectada seleccionables desde la UI.',
      ],
    },
  },
  {
    title: { en: 'Project Manager & Game Developer', es: 'Project Manager y Desarrollador' },
    company: 'Six Guys Productions',
    logo: coSixGuys,
    date: { en: 'May 2023 — Jun 2023', es: 'May 2023 — Jun 2023' },
    points: {
      en: [
        'Managed a multidisciplinary team with Scrum for the Generation Colombia bootcamp final project.',
        'Defined the character architecture with SOLID principles and programmed “Garok the Destroyer” and “Sir Percival”.',
        'Built the AudioManager, integrated the UI and owned project integration and Windows builds.',
      ],
      es: [
        'Gestioné con Scrum un equipo multidisciplinario en el proyecto final del bootcamp de Generation Colombia.',
        'Definí la arquitectura de personajes con principios SOLID y programé a “Garok the Destroyer” y “Sir Percival”.',
        'Construí el AudioManager, integré la UI y me encargué de la integración del proyecto y los builds para Windows.',
      ],
    },
  },
  {
    title: { en: 'Project Manager & Lead Programmer', es: 'Project Manager y Líder de Programación' },
    company: 'Pixel Pioneers',
    logo: coPixelPioneers,
    date: { en: 'Jun 2023 · Game Jam', es: 'Jun 2023 · Game Jam' },
    points: {
      en: [
        '2nd place out of 20 teams at Game Jam UniSabana 2023, judged by Teravision Games.',
        'Programmed black-hole attraction and gravitational field mechanics, character controller, UI and audio; shipped to WebGL.',
      ],
      es: [
        '2.º puesto entre 20 equipos en la Game Jam UniSabana 2023, con Teravision Games como jurado.',
        'Programé las mecánicas de atracción de agujeros negros y campos gravitacionales, el controlador del personaje, la UI y el audio; publicado en WebGL.',
      ],
    },
  },
  {
    title: { en: 'Project Manager & Game Developer', es: 'Project Manager y Desarrollador' },
    company: 'Colapsum Studio',
    logo: coColapsum,
    date: { en: 'Apr 2023 — May 2023', es: 'Abr 2023 — May 2023' },
    points: {
      en: [
        'Led two game jam projects, “Don’t Stop Kiddo” and “Skyway Savior”, through to WebGL release.',
        'Programmed procedural obstacle generation with object pooling and the hovercraft controller.',
      ],
      es: [
        'Lideré dos proyectos de game jam, “Don’t Stop Kiddo” y “Skyway Savior”, hasta su publicación en WebGL.',
        'Programé la generación procedural de obstáculos con object pooling y el controlador del aerodeslizador.',
      ],
    },
  },
  {
    title: { en: 'Spigot Plugin Developer', es: 'Desarrollador de Plugins Spigot' },
    company: 'UNAL Minecraft Roleplay Server',
    logo: coUnmc,
    date: { en: 'Sep 2022 — Mar 2023', es: 'Sep 2022 — Mar 2023' },
    points: {
      en: [
        'Built Java plugins (Spigot, Bukkit) for the Universidad Nacional de Colombia roleplay server, including an in-game smartphone item with a GUI for core server interactions.',
      ],
      es: [
        'Desarrollé plugins en Java (Spigot, Bukkit) para el servidor de rol de la Universidad Nacional de Colombia, incluido un smartphone dentro del juego con interfaz gráfica para las interacciones principales.',
      ],
    },
  },
]

export type Project = { name: string; image: string; description: L; tags: string[]; github?: string; itch?: string }

/*
 * TODO(mauricio): add your newer shipped games (Monster Runner, Dragoids Arena, Dashmellow 3D, ...)
 * at the top, and replace the screenshots with larger captures (800px wide or more, .webp).
 */
export const projects: Project[] = [
  {
    name: 'The Last Crusade',
    image: imgLastCrusade,
    description: {
      en: 'Third-person action game: three warriors fight hordes of enemies across three levels to free the kingdom of Nigravia. Shown at SOFA 2023.',
      es: 'Juego de acción en tercera persona: tres guerreros enfrentan hordas de enemigos en tres niveles para liberar el reino de Nigravia. Presentado en SOFA 2023.',
    },
    tags: ['Unity', 'C#', 'Character systems'],
    github: 'https://github.com/Six-Guys-Productions-COL',
    itch: 'https://six-guys-productions.itch.io/the-last-crusade',
  },
  {
    name: "Astro Bear: Ameba's Interstellar Adventure",
    image: imgAstroBear,
    description: {
      en: 'Guide space amoebas between planets before they perish, using black holes and gravity fields. 2nd place at Game Jam UniSabana 2023.',
      es: 'Guía amebas espaciales entre planetas antes de que perezcan, usando agujeros negros y campos de gravedad. 2.º puesto en la Game Jam UniSabana 2023.',
    },
    tags: ['Unity', 'C#', 'Game Jam'],
    github: 'https://github.com/GirotzuDev/GameJamUniSabana/tree/develop',
    itch: 'https://pixel-pioneers-col.itch.io/astro-bear',
  },
  {
    name: 'Skyway Savior',
    image: imgSkyway,
    description: {
      en: 'Futuristic space racer: pilot a hovercraft through a procedurally generated obstacle track.',
      es: 'Carreras espaciales futuristas: pilota un aerodeslizador por una pista de obstáculos generada proceduralmente.',
    },
    tags: ['Unity', 'C#', 'Procedural generation'],
    github: 'https://github.com/Grupo4JamGEN/Unity_Aerodeslizador/tree/main',
    itch: 'https://marlon-p.itch.io/skyway-savior',
  },
  {
    name: "Don't Stop Kiddo!",
    image: imgKiddo,
    description: {
      en: 'Endless runner: escape the darkness down a corridor, dodge the furniture and keep your stuffed animal close to hold your score.',
      es: 'Endless runner: escapa de la oscuridad por un pasillo, esquiva los muebles y no sueltes tu peluche para mantener el puntaje.',
    },
    tags: ['Unity', 'C#', 'Game Jam'],
    github: 'https://github.com/maocastro13/GameJam1/tree/Dont-Stop-Kiddo-V0.0.1',
    itch: 'https://marlon-p.itch.io/dont-stop-kiddo-gamejamversion',
  },
]

export const testimonials: { quote: L; name: string; role: string; image: string; link: string }[] = [
  {
    quote: {
      en: 'Mauricio has the ability to connect with others and convey ideas with charisma, which makes him a great communicator. His determination and action-oriented approach is inspiring. He has contributed significantly to our projects.',
      es: 'Mauricio tiene la capacidad de conectar con los demás y transmitir ideas con carisma, lo que lo hace un gran comunicador. Su determinación y enfoque orientado a la acción inspiran. Ha contribuido significativamente a nuestros proyectos.',
    },
    name: 'Nicolas Rodriguez',
    role: 'Lead UI/UX Developer · Six Guys Productions',
    image: pNico,
    link: 'https://www.linkedin.com/in/nicolas-rodriguez-hilarion-765b321b3/',
  },
  {
    quote: {
      en: 'An amazing team leader and a talented software developer. He proved to be reliable, decisive and met deadlines. His ability to explain technical concepts in an understandable way was impressive. He would be a great asset in any development team.',
      es: 'Un líder de equipo increíble y un desarrollador talentoso. Demostró ser confiable, decidido y cumplido con los plazos. Su capacidad para explicar conceptos técnicos de forma comprensible fue impresionante. Sería un gran aporte para cualquier equipo de desarrollo.',
    },
    name: 'Rodrigo Cantor',
    role: 'Technical Leader · Six Guys Productions',
    image: pRodri,
    link: 'https://www.linkedin.com/in/rodrigo-cantor-vasquez-575770276/',
  },
  {
    quote: {
      en: 'An exceptional leader with effective communication skills and an outstanding strategic vision. His ability to motivate the team and foster a collaborative environment was critical to the success of our projects.',
      es: 'Un líder excepcional, con comunicación efectiva y una visión estratégica sobresaliente. Su capacidad para motivar al equipo y fomentar un ambiente colaborativo fue clave para el éxito de nuestros proyectos.',
    },
    name: 'Christian Ramirez',
    role: 'Tech Lead · Immersive Level',
    image: pChris,
    link: 'https://www.linkedin.com/in/christian-ramirez-ab9828135/',
  },
]

/** Interface strings. */
export const ui = {
  nav: {
    about: { en: 'About', es: 'Sobre mí' },
    work: { en: 'Work', es: 'Proyectos' },
    experience: { en: 'Experience', es: 'Experiencia' },
    testimonials: { en: 'Testimonials', es: 'Testimonios' },
    contact: { en: 'Contact', es: 'Contacto' },
  },
  skip: { en: 'Skip to content', es: 'Saltar al contenido' },
  menu: { en: 'Menu', es: 'Menú' },
  switchLang: { en: 'Cambiar a español', es: 'Switch to English' },
  hero: {
    cta: { en: 'See my work', es: 'Ver proyectos' },
    cv: { en: 'Download CV', es: 'Descargar CV' },
  },
  game: {
    label: { en: 'Mini-game: move the character and collect the four skills', es: 'Minijuego: mueve al personaje y recoge las cuatro habilidades' },
    hintKeys: { en: 'Click to play · WASD / arrows to move · Space to jump', es: 'Haz clic para jugar · WASD / flechas para moverte · Espacio para saltar' },
    hintPlaying: { en: 'Collect the four skills', es: 'Recoge las cuatro habilidades' },
    hintTouch: { en: 'Use the joystick to collect the four skills', es: 'Usa el joystick para recoger las cuatro habilidades' },
    jump: { en: 'Jump', es: 'Saltar' },
    unlocked: { en: 'Unlocked', es: 'Desbloqueado' },
    done: { en: 'All skills unlocked!', es: '¡Todas las habilidades desbloqueadas!' },
    again: { en: 'Play again', es: 'Jugar de nuevo' },
    debug: { en: 'Debug view', es: 'Vista debug' },
  },
  about: { eyebrow: { en: 'About', es: 'Sobre mí' }, title: { en: 'Engineer first, gamer always.', es: 'Ingeniero primero, gamer siempre.' } },
  skills: { en: 'Toolbox', es: 'Herramientas' },
  work: {
    eyebrow: { en: 'Selected work', es: 'Proyectos destacados' },
    title: { en: 'Games I have helped ship.', es: 'Juegos que he ayudado a lanzar.' },
    play: { en: 'Play on itch.io', es: 'Jugar en itch.io' },
    code: { en: 'Source code', es: 'Código fuente' },
  },
  experience: { eyebrow: { en: 'Experience', es: 'Experiencia' }, title: { en: 'Where I have worked.', es: 'Dónde he trabajado.' } },
  testimonials: { eyebrow: { en: 'Testimonials', es: 'Testimonios' }, title: { en: 'What teammates say.', es: 'Lo que dicen mis compañeros.' } },
  contact: {
    eyebrow: { en: 'Contact', es: 'Contacto' },
    title: { en: 'Let’s build something.', es: 'Construyamos algo.' },
    text: {
      en: 'Open to game programming roles and collaborations. Send me a message and I will get back to you.',
      es: 'Abierto a roles de programación de videojuegos y colaboraciones. Escríbeme y te responderé pronto.',
    },
    name: { en: 'Name', es: 'Nombre' },
    email: { en: 'Email', es: 'Correo' },
    message: { en: 'Message', es: 'Mensaje' },
    send: { en: 'Send message', es: 'Enviar mensaje' },
    sending: { en: 'Sending…', es: 'Enviando…' },
    ok: { en: 'Thank you! I will get back to you as soon as possible.', es: '¡Gracias! Te responderé lo antes posible.' },
    error: {
      en: 'Something went wrong. Please try again or reach me on LinkedIn.',
      es: 'Algo salió mal. Inténtalo de nuevo o escríbeme por LinkedIn.',
    },
  },
  footer: { en: 'Designed and built by Mauricio Castro.', es: 'Diseñado y desarrollado por Mauricio Castro.' },
}
