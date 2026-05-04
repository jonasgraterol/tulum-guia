# Tulum Sargassum Guide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual single-page Astro website that serves as a personal host guide for Airbnb guests in Tulum during sargassum season.

**Architecture:** Astro 5 static site with Content Collections for place data, Tailwind CSS 4 for styling, URL-based i18n (`/es/` and `/en/`). Single-page scroll layout with category sections containing place cards. Blog-expandable via content collections.

**Tech Stack:** Astro 5, Tailwind CSS 4, TypeScript, Google Fonts (Playfair Display + DM Sans)

---

## File Structure

```
tulum-guia/
  astro.config.mjs          # Astro config with i18n and Tailwind
  tailwind.config.mjs        # Tailwind theme (colors, fonts)
  package.json
  tsconfig.json
  public/
    favicon.svg
  src/
    content/
      config.ts              # Content collection schemas
      places/
        gran-cenote.md
        dos-ojos.md
        taak-bi-ha.md
        parque-tankah.md
        zacil-ha.md
        casa-cenote.md
        cenote-corazon.md
        puerta-al-cielo.md
        kantun-chi.md
        laguna-kaan-luum.md
        laguna-neek.md
        laguna-nopalitos.md
        ruinas-tulum.md
        ruinas-coba.md
        art-walk-holistika.md
        xcaret.md
        xel-ha.md
        xplor.md
        papaya-playa.md
        gitano.md
        bonbonniere.md
    i18n/
      index.ts               # i18n helper functions
      es.json                # Spanish UI strings
      en.json                # English UI strings
    layouts/
      Base.astro             # HTML shell, fonts, meta
    components/
      Hero.astro             # Full-viewport hero section
      HostIntro.astro        # Personal welcome message
      SectionBlock.astro     # Category section wrapper
      PlaceCard.astro        # Individual place card
      Tips.astro             # Tips section
      LanguageToggle.astro   # EN/ES switcher (Astro island)
      NavDots.astro          # Section navigation dots
      Footer.astro           # Minimal footer
    pages/
      index.astro            # Redirect to /es/
      es/
        index.astro          # Spanish version
      en/
        index.astro          # English version
```

---

### Task 1: Scaffold Astro Project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `tsconfig.json`
- Create: `public/favicon.svg`

- [ ] **Step 1: Create Astro project**

Run:
```bash
cd /Users/jonasgraterol/Development/FREELANCE/Webler-clients/tulum-guia
npm create astro@latest . -- --template minimal --no-install --typescript strict
```

Expected: Astro project scaffolded in current directory.

- [ ] **Step 2: Install dependencies**

Run:
```bash
npm install astro @astrojs/tailwind tailwindcss --legacy-peer-deps
```

- [ ] **Step 3: Configure Astro with i18n and Tailwind**

Replace `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
});
```

- [ ] **Step 4: Configure Tailwind theme**

Create `tailwind.config.mjs`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        sand: '#F5F0E8',
        jungle: '#1B7A6D',
        cenote: '#3BC4C4',
        bark: '#2D2A26',
        honey: '#D4A853',
        laguna: '#2BA5A5',
        ruin: '#D4A853',
        nature: '#6DB56D',
        park: '#E87F5F',
        night: '#7B5EA7',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 5: Create favicon**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><text y="32" font-size="32">🌴</text></svg>
```

- [ ] **Step 6: Verify dev server starts**

Run:
```bash
npm run dev
```

Expected: Server running at `http://localhost:4321`

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: scaffold Astro project with Tailwind and i18n config"
```

---

### Task 2: Create i18n System

**Files:**
- Create: `src/i18n/es.json`
- Create: `src/i18n/en.json`
- Create: `src/i18n/index.ts`

- [ ] **Step 1: Create Spanish UI strings**

Create `src/i18n/es.json`:

```json
{
  "site": {
    "title": "Guia Tulum - Temporada de Sargazo",
    "description": "Tu guia personal para disfrutar Tulum cuando hay sargazo en las playas"
  },
  "hero": {
    "title": "Guia Tulum",
    "subtitle": "Alternativas increibles para cuando el sargazo visita las playas"
  },
  "host": {
    "greeting": "Hola! Bienvenido a Tulum",
    "intro": "Durante algunos meses del ano, el sargazo puede afectar las playas. Pero Tulum tiene MUCHAS alternativas increibles: cenotes, lagunas, ruinas y vida nocturna. Esta guia tiene mis recomendaciones personales para que disfrutes al maximo tu estancia.",
    "note": "Los precios son aproximados y pueden variar segun temporada. Te recomiendo llevar efectivo."
  },
  "sections": {
    "cenotes": "Cenotes",
    "cenotes_desc": "Piscinas naturales de agua cristalina, ideales cuando el mar tiene sargazo. La mayoria abre de 8:00 AM a 5:00 PM.",
    "lagunas": "Lagunas",
    "lagunas_desc": "Aguas tranquilas sin sargazo, perfectas para un dia relajado.",
    "ruinas": "Ruinas Mayas",
    "ruinas_desc": "Historia y vistas espectaculares del Caribe.",
    "experiencias": "Experiencias Diferentes",
    "experiencias_desc": "Algo fuera de lo comun para explorar.",
    "parques": "Parques (Grupo Xcaret)",
    "parques_desc": "Parques de aventura y naturaleza con todo incluido.",
    "nightlife": "Vida Nocturna",
    "nightlife_desc": "Restaurantes, fiestas y el mejor ambiente de Tulum."
  },
  "card": {
    "distance": "Distancia",
    "price": "Precio",
    "hours": "Horario"
  },
  "tips": {
    "title": "Consejos Clave",
    "items": [
      "En temporada de sargazo, cenotes y lagunas son la mejor opcion",
      "Ir temprano (8-10 AM) para evitar multitudes",
      "Llevar efectivo (muchos lugares no aceptan tarjeta)",
      "Usar bloqueador biodegradable",
      "Rentar coche, bicicleta o scooter para moverte"
    ],
    "icons": ["🌊", "⏰", "💵", "🧴", "🚗"]
  },
  "footer": {
    "text": "Hecho con amor desde Aldea Zama, Tulum"
  },
  "nav": {
    "language": "EN"
  }
}
```

- [ ] **Step 2: Create English UI strings**

Create `src/i18n/en.json`:

```json
{
  "site": {
    "title": "Tulum Guide - Sargassum Season",
    "description": "Your personal guide to enjoying Tulum when sargassum hits the beaches"
  },
  "hero": {
    "title": "Tulum Guide",
    "subtitle": "Amazing alternatives for when sargassum visits the beaches"
  },
  "host": {
    "greeting": "Hey! Welcome to Tulum",
    "intro": "During some months of the year, sargassum can affect the beaches. But Tulum has SO MANY amazing alternatives: cenotes, lagoons, ruins, and nightlife. This guide has my personal recommendations so you can make the most of your stay.",
    "note": "Prices are approximate and may vary by season. I recommend carrying cash."
  },
  "sections": {
    "cenotes": "Cenotes",
    "cenotes_desc": "Crystal-clear natural pools, perfect when the sea has sargassum. Most open 8:00 AM to 5:00 PM.",
    "lagunas": "Lagoons",
    "lagunas_desc": "Calm waters with no sargassum, perfect for a relaxing day.",
    "ruinas": "Mayan Ruins",
    "ruinas_desc": "History and spectacular Caribbean views.",
    "experiencias": "Unique Experiences",
    "experiencias_desc": "Something different to explore.",
    "parques": "Parks (Xcaret Group)",
    "parques_desc": "Adventure and nature parks with all-inclusive options.",
    "nightlife": "Nightlife",
    "nightlife_desc": "Restaurants, parties, and the best vibes in Tulum."
  },
  "card": {
    "distance": "Distance",
    "price": "Price",
    "hours": "Hours"
  },
  "tips": {
    "title": "Key Tips",
    "items": [
      "During sargassum season, cenotes and lagoons are your best bet",
      "Go early (8-10 AM) to avoid crowds",
      "Carry cash (many places don't accept cards)",
      "Use biodegradable sunscreen",
      "Rent a car, bicycle, or scooter to get around"
    ],
    "icons": ["🌊", "⏰", "💵", "🧴", "🚗"]
  },
  "footer": {
    "text": "Made with love from Aldea Zama, Tulum"
  },
  "nav": {
    "language": "ES"
  }
}
```

- [ ] **Step 3: Create i18n helper**

Create `src/i18n/index.ts`:

```typescript
import es from './es.json';
import en from './en.json';

const translations = { es, en } as const;

export type Locale = keyof typeof translations;

export function getTranslations(locale: Locale) {
  return translations[locale];
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, locale] = url.pathname.split('/');
  if (locale === 'en') return 'en';
  return 'es';
}

export function getLocalizedPath(path: string, locale: Locale): string {
  return `/${locale}${path}`;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/i18n/
git commit -m "feat: add bilingual i18n system with ES/EN translations"
```

---

### Task 3: Define Content Collection Schema

**Files:**
- Create: `src/content/config.ts`

- [ ] **Step 1: Create content collection config**

Create `src/content/config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';

const places = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    nameEn: z.string(),
    category: z.enum(['cenotes', 'lagunas', 'ruinas', 'experiencias', 'parques', 'nightlife']),
    emoji: z.string(),
    distance: z.string(),
    price: z.string(),
    hours: z.string(),
    highlight: z.string(),
    highlightEn: z.string(),
    features: z.array(z.string()).optional(),
    featuresEn: z.array(z.string()).optional(),
    order: z.number(),
  }),
});

export const collections = { places };
```

- [ ] **Step 2: Commit**

```bash
git add src/content/config.ts
git commit -m "feat: define typed content collection schema for places"
```

---

### Task 4: Create All Place Content Files

**Files:**
- Create: `src/content/places/gran-cenote.md`
- Create: `src/content/places/dos-ojos.md`
- Create: `src/content/places/taak-bi-ha.md`
- Create: `src/content/places/parque-tankah.md`
- Create: `src/content/places/zacil-ha.md`
- Create: `src/content/places/casa-cenote.md`
- Create: `src/content/places/cenote-corazon.md`
- Create: `src/content/places/puerta-al-cielo.md`
- Create: `src/content/places/kantun-chi.md`
- Create: `src/content/places/laguna-kaan-luum.md`
- Create: `src/content/places/laguna-neek.md`
- Create: `src/content/places/laguna-nopalitos.md`
- Create: `src/content/places/ruinas-tulum.md`
- Create: `src/content/places/ruinas-coba.md`
- Create: `src/content/places/art-walk-holistika.md`
- Create: `src/content/places/xcaret.md`
- Create: `src/content/places/xel-ha.md`
- Create: `src/content/places/xplor.md`
- Create: `src/content/places/papaya-playa.md`
- Create: `src/content/places/gitano.md`
- Create: `src/content/places/bonbonniere.md`

- [ ] **Step 1: Create cenote files**

Create `src/content/places/gran-cenote.md`:

```markdown
---
name: "Gran Cenote"
nameEn: "Gran Cenote"
category: "cenotes"
emoji: "🐢"
distance: "10 min / 4 km"
price: "~$450-$500 MXN"
hours: "8:00 AM - 4:45 PM"
highlight: "Cenote semiabierto, agua cristalina, ideal para snorkel y ver tortugas"
highlightEn: "Semi-open cenote, crystal-clear water, perfect for snorkeling and spotting turtles"
order: 1
---
```

Create `src/content/places/dos-ojos.md`:

```markdown
---
name: "Cenote Dos Ojos"
nameEn: "Cenote Dos Ojos (Two Eyes)"
category: "cenotes"
emoji: "🌊"
distance: "25 min / 22 km"
price: "~$400-$700 MXN"
hours: "8:00 AM - 5:00 PM"
highlight: "Sistema de cuevas impresionante para snorkel y buceo"
highlightEn: "Impressive cave system for snorkeling and diving"
order: 2
---
```

Create `src/content/places/taak-bi-ha.md`:

```markdown
---
name: "Cenote Taak Bi Ha"
nameEn: "Cenote Taak Bi Ha"
category: "cenotes"
emoji: "🌿"
distance: "25 min / 22 km"
price: "~$350 MXN"
hours: "9:00 AM - 5:00 PM"
highlight: "Cenote tipo cueva con formaciones espectaculares"
highlightEn: "Cave-type cenote with spectacular formations"
order: 3
---
```

Create `src/content/places/parque-tankah.md`:

```markdown
---
name: "Parque Tankah"
nameEn: "Tankah Park"
category: "cenotes"
emoji: "🌴"
distance: "15 min / 10 km"
price: "~$300-$600 MXN"
hours: "9:00 AM - 5:00 PM"
highlight: "Experiencia completa en la selva"
highlightEn: "Complete jungle experience"
features: ["4 cenotes", "Kayak", "Tirolinas", "Caminatas", "Cultura maya", "Restaurante"]
featuresEn: ["4 cenotes", "Kayak", "Ziplines", "Hiking", "Mayan culture", "Restaurant"]
order: 4
---
```

Create `src/content/places/zacil-ha.md`:

```markdown
---
name: "Cenote Zacil-Ha"
nameEn: "Cenote Zacil-Ha"
category: "cenotes"
emoji: "💦"
distance: "10-15 min / 5 km"
price: "~$150-$300 MXN"
hours: "9:00 AM - 5:00 PM"
highlight: "Ambiente familiar con trampolin y areas de descanso"
highlightEn: "Family-friendly with trampoline and rest areas"
order: 5
---
```

Create `src/content/places/casa-cenote.md`:

```markdown
---
name: "Casa Cenote (Caleta Tankah)"
nameEn: "Casa Cenote (Tankah Cove)"
category: "cenotes"
emoji: "💙"
distance: "15 min / 10 km"
price: "~$150-$200 MXN"
hours: "8:00 AM - 5:00 PM"
highlight: "Cenote + playa, caleta natural tipo piscina"
highlightEn: "Cenote + beach, natural pool-like cove"
features: ["Cenote + playa", "Caleta natural tipo piscina", "Generalmente SIN sargazo", "Ideal para nadar tranquilo"]
featuresEn: ["Cenote + beach", "Natural pool-like cove", "Usually NO sargassum", "Perfect for a calm swim"]
order: 6
---
```

Create `src/content/places/cenote-corazon.md`:

```markdown
---
name: "Cenote Corazon"
nameEn: "Cenote Corazon (Heart)"
category: "cenotes"
emoji: "💚"
distance: "20 min / 8 km"
price: "~$150 MXN"
hours: "9:00 AM - 5:00 PM"
highlight: "Cenote abierto con forma de corazon"
highlightEn: "Open cenote shaped like a heart"
order: 7
---
```

Create `src/content/places/puerta-al-cielo.md`:

```markdown
---
name: "Cenote Puerta al Cielo"
nameEn: "Cenote Puerta al Cielo (Gateway to Heaven)"
category: "cenotes"
emoji: "☁️"
distance: "20-25 min"
price: "~$200-$300 MXN"
hours: "9:00 AM - 5:00 PM"
highlight: "Cenote tranquilo rodeado de selva"
highlightEn: "Peaceful cenote surrounded by jungle"
order: 8
---
```

Create `src/content/places/kantun-chi.md`:

```markdown
---
name: "Parque Kantun-Chi"
nameEn: "Kantun-Chi Park"
category: "cenotes"
emoji: "🌿"
distance: "30 min / 25 km"
price: "~$600-$900 MXN"
hours: "9:00 AM - 5:00 PM"
highlight: "Ecoparque con 4 cenotes, senderos y tours guiados"
highlightEn: "Eco-park with 4 cenotes, trails, and guided tours"
order: 9
---
```

- [ ] **Step 2: Create lagoon files**

Create `src/content/places/laguna-kaan-luum.md`:

```markdown
---
name: "Laguna de Kaan Luum"
nameEn: "Kaan Luum Lagoon"
category: "lagunas"
emoji: "💎"
distance: "15 min / 10 km"
price: "~$300 extranjeros / $200 nacionales"
hours: "9:00 AM - 4:00 PM"
highlight: "Laguna turquesa con cenote profundo"
highlightEn: "Turquoise lagoon with a deep cenote"
order: 1
---
```

Create `src/content/places/laguna-neek.md`:

```markdown
---
name: "Laguna Neek"
nameEn: "Neek Lagoon"
category: "lagunas"
emoji: "🌈"
distance: "20 min"
price: "~$300 MXN"
hours: "9:00 AM - 5:00 PM"
highlight: "Muy tranquila y menos turistica"
highlightEn: "Very peaceful and less touristy"
order: 2
---
```

Create `src/content/places/laguna-nopalitos.md`:

```markdown
---
name: "Laguna Nopalitos"
nameEn: "Nopalitos Lagoon"
category: "lagunas"
emoji: "🌿"
distance: "20-25 min"
price: "~$300 MXN"
hours: "9:00 AM - 5:00 PM"
highlight: "Experiencia completa con kayak y areas recreativas"
highlightEn: "Complete experience with kayak and recreational areas"
features: ["Kayak incluido", "Mesas y sillas", "Canchas deportivas", "Puedes llevar comida", "Restaurante y asadores"]
featuresEn: ["Kayak included", "Tables and chairs", "Sports courts", "You can bring food", "Restaurant and grills"]
order: 3
---
```

- [ ] **Step 3: Create ruins files**

Create `src/content/places/ruinas-tulum.md`:

```markdown
---
name: "Zona Arqueologica de Tulum"
nameEn: "Tulum Archaeological Zone"
category: "ruinas"
emoji: "🏝️"
distance: "10 min / 5 km"
price: "~$100 MXN"
hours: "8:00 AM - 5:00 PM"
highlight: "Ruinas mayas con acantilados frente al mar Caribe"
highlightEn: "Mayan ruins on cliffs overlooking the Caribbean Sea"
features: ["Ruinas mayas", "Acantilados frente al mar Caribe", "Vistas espectaculares"]
featuresEn: ["Mayan ruins", "Cliffs overlooking the Caribbean", "Spectacular views"]
order: 1
---
```

Create `src/content/places/ruinas-coba.md`:

```markdown
---
name: "Zona Arqueologica de Coba"
nameEn: "Coba Archaeological Zone"
category: "ruinas"
emoji: "🌄"
distance: "45-50 min / 45 km"
price: "~$100 MXN"
hours: "8:00 AM - 4:00 PM"
highlight: "Recorrido en bicicleta entre la selva"
highlightEn: "Bicycle tour through the jungle"
order: 2
---
```

- [ ] **Step 4: Create experience, park, and nightlife files**

Create `src/content/places/art-walk-holistika.md`:

```markdown
---
name: "Art Walk Holistika"
nameEn: "Art Walk Holistika"
category: "experiencias"
emoji: "🎨"
distance: "10 min / 4 km"
price: "Gratis"
hours: "Horario diurno"
highlight: "Paseo en la selva con esculturas y murales ideales para fotos"
highlightEn: "Jungle walk with sculptures and murals, perfect for photos"
order: 1
---
```

Create `src/content/places/xcaret.md`:

```markdown
---
name: "Xcaret"
nameEn: "Xcaret"
category: "parques"
emoji: "🎢"
distance: "50 min / 60 km"
price: "~$2,000 MXN"
hours: "8:30 AM - 10:30 PM"
highlight: "Rios subterraneos, cultura mexicana y shows"
highlightEn: "Underground rivers, Mexican culture, and shows"
order: 1
---
```

Create `src/content/places/xel-ha.md`:

```markdown
---
name: "Xel-Ha"
nameEn: "Xel-Ha"
category: "parques"
emoji: "💦"
distance: "20 min / 18 km"
price: "~$1,500-$2,000 MXN"
hours: "8:30 AM - 6:00 PM"
highlight: "Parque acuatico natural todo incluido"
highlightEn: "All-inclusive natural water park"
order: 2
---
```

Create `src/content/places/xplor.md`:

```markdown
---
name: "Xplor"
nameEn: "Xplor"
category: "parques"
emoji: "🎡"
distance: "50 min"
price: "~$1,800 MXN"
hours: "9:00 AM - 5:00 PM"
highlight: "Tirolesas, aventura y rios subterraneos"
highlightEn: "Ziplines, adventure, and underground rivers"
order: 3
---
```

Create `src/content/places/papaya-playa.md`:

```markdown
---
name: "Papaya Playa Project"
nameEn: "Papaya Playa Project"
category: "nightlife"
emoji: "🎶"
distance: "10-15 min"
price: "~$500-$1,500 MXN consumo"
hours: "Noche"
highlight: "Fiestas en la playa con DJs internacionales"
highlightEn: "Beach parties with international DJs"
order: 1
---
```

Create `src/content/places/gitano.md`:

```markdown
---
name: "Gitano"
nameEn: "Gitano"
category: "nightlife"
emoji: "🍸"
distance: "10-15 min"
price: "~$500-$1,500 MXN consumo"
hours: "Noche"
highlight: "Cocteleria artesanal y ambiente bohemio"
highlightEn: "Craft cocktails and bohemian vibes"
order: 2
---
```

Create `src/content/places/bonbonniere.md`:

```markdown
---
name: "Bonbonniere"
nameEn: "Bonbonniere"
category: "nightlife"
emoji: "🔥"
distance: "10-15 min"
price: "~$500-$1,500 MXN consumo"
hours: "Noche"
highlight: "Club exclusivo con fiestas tematicas"
highlightEn: "Exclusive club with themed parties"
order: 3
---
```

- [ ] **Step 5: Verify content loads**

Run:
```bash
npm run dev
```

Check terminal for content collection errors. Expected: no schema validation errors.

- [ ] **Step 6: Commit**

```bash
git add src/content/
git commit -m "feat: add all 21 place content files with bilingual data"
```

---

### Task 5: Build Base Layout

**Files:**
- Create: `src/layouts/Base.astro`

- [ ] **Step 1: Create Base layout**

Create `src/layouts/Base.astro`:

```astro
---
import { getTranslations, type Locale } from '../i18n';

interface Props {
  locale: Locale;
}

const { locale } = Astro.props;
const t = getTranslations(locale);
---

<!doctype html>
<html lang={locale} class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={t.site.description} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap"
      rel="stylesheet"
    />
    <title>{t.site.title}</title>
  </head>
  <body class="bg-sand text-bark font-body antialiased">
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/
git commit -m "feat: add Base layout with fonts, meta, and global styles"
```

---

### Task 6: Build Components

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/HostIntro.astro`
- Create: `src/components/SectionBlock.astro`
- Create: `src/components/PlaceCard.astro`
- Create: `src/components/Tips.astro`
- Create: `src/components/LanguageToggle.astro`
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create Hero component**

Create `src/components/Hero.astro`:

```astro
---
import LanguageToggle from './LanguageToggle.astro';
import type { Locale } from '../i18n';
import { getTranslations } from '../i18n';

interface Props {
  locale: Locale;
}

const { locale } = Astro.props;
const t = getTranslations(locale);
---

<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-jungle via-jungle/90 to-cenote/80">
  <!-- Decorative elements -->
  <div class="absolute inset-0 opacity-10">
    <div class="absolute top-20 left-10 w-64 h-64 rounded-full bg-cenote blur-3xl"></div>
    <div class="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-honey blur-3xl"></div>
  </div>

  <!-- Language toggle -->
  <div class="absolute top-6 right-6 z-10">
    <LanguageToggle locale={locale} />
  </div>

  <!-- Content -->
  <div class="relative z-10 text-center px-6 max-w-3xl">
    <p class="text-cenote/80 text-lg mb-4 font-body tracking-wide uppercase">
      📍 Aldea Zama, Tulum
    </p>
    <h1 class="font-heading text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
      {t.hero.title}
    </h1>
    <p class="text-white/80 text-xl md:text-2xl font-light max-w-xl mx-auto mb-10">
      {t.hero.subtitle}
    </p>
    <a
      href="#intro"
      class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all"
    >
      <span>{locale === 'es' ? 'Explorar' : 'Explore'}</span>
      <span class="text-xl">↓</span>
    </a>
  </div>

  <!-- Bottom wave decoration -->
  <div class="absolute bottom-0 left-0 right-0">
    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <path d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,90 1440,80 L1440,120 L0,120 Z" fill="#F5F0E8"/>
    </svg>
  </div>
</section>
```

- [ ] **Step 2: Create HostIntro component**

Create `src/components/HostIntro.astro`:

```astro
---
import type { Locale } from '../i18n';
import { getTranslations } from '../i18n';

interface Props {
  locale: Locale;
}

const { locale } = Astro.props;
const t = getTranslations(locale);
---

<section id="intro" class="py-16 md:py-24 px-6">
  <div class="max-w-2xl mx-auto text-center">
    <h2 class="font-heading text-3xl md:text-4xl font-bold text-jungle mb-6">
      {t.host.greeting} 🌿
    </h2>
    <p class="text-lg text-bark/80 leading-relaxed mb-6">
      {t.host.intro}
    </p>
    <div class="inline-flex items-start gap-3 bg-honey/10 border border-honey/30 rounded-xl px-5 py-4 text-left">
      <span class="text-xl flex-shrink-0 mt-0.5">💡</span>
      <p class="text-sm text-bark/70">{t.host.note}</p>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Create SectionBlock component**

Create `src/components/SectionBlock.astro`:

```astro
---
interface Props {
  id: string;
  title: string;
  description: string;
  accentColor: string;
}

const { id, title, description, accentColor } = Astro.props;
---

<section id={id} class="py-16 md:py-20 px-6">
  <div class="max-w-5xl mx-auto">
    <div class="text-center mb-12">
      <div class={`inline-block w-12 h-1 rounded-full mb-4`} style={`background-color: ${accentColor}`}></div>
      <h2 class="font-heading text-3xl md:text-4xl font-bold text-bark mb-3">
        {title}
      </h2>
      <p class="text-bark/60 text-lg max-w-xl mx-auto">
        {description}
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <slot />
    </div>
  </div>
</section>
```

- [ ] **Step 4: Create PlaceCard component**

Create `src/components/PlaceCard.astro`:

```astro
---
import type { Locale } from '../i18n';
import { getTranslations } from '../i18n';

interface Props {
  locale: Locale;
  name: string;
  nameEn: string;
  emoji: string;
  distance: string;
  price: string;
  hours: string;
  highlight: string;
  highlightEn: string;
  features?: string[];
  featuresEn?: string[];
  accentColor: string;
}

const { locale, name, nameEn, emoji, distance, price, hours, highlight, highlightEn, features, featuresEn, accentColor } = Astro.props;
const t = getTranslations(locale);

const displayName = locale === 'en' ? nameEn : name;
const displayHighlight = locale === 'en' ? highlightEn : highlight;
const displayFeatures = locale === 'en' ? featuresEn : features;
---

<article class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-sand/50 flex flex-col">
  <!-- Header -->
  <div class="flex items-start gap-3 mb-4">
    <span class="text-2xl flex-shrink-0">{emoji}</span>
    <h3 class="font-heading text-xl font-bold text-bark leading-tight">{displayName}</h3>
  </div>

  <!-- Description -->
  <p class="text-bark/70 text-sm mb-4 flex-grow">{displayHighlight}</p>

  <!-- Features -->
  {displayFeatures && displayFeatures.length > 0 && (
    <ul class="mb-4 space-y-1">
      {displayFeatures.map((feature) => (
        <li class="text-xs text-bark/60 flex items-center gap-2">
          <span class="w-1 h-1 rounded-full flex-shrink-0" style={`background-color: ${accentColor}`}></span>
          {feature}
        </li>
      ))}
    </ul>
  )}

  <!-- Meta -->
  <div class="border-t border-sand pt-4 mt-auto space-y-2">
    <div class="flex items-center gap-2 text-xs text-bark/60">
      <span>📍</span>
      <span>{distance}</span>
    </div>
    <div class="flex items-center gap-2 text-xs text-bark/60">
      <span>💰</span>
      <span>{price}</span>
    </div>
    <div class="flex items-center gap-2 text-xs text-bark/60">
      <span>🕐</span>
      <span>{hours}</span>
    </div>
  </div>
</article>
```

- [ ] **Step 5: Create Tips component**

Create `src/components/Tips.astro`:

```astro
---
import type { Locale } from '../i18n';
import { getTranslations } from '../i18n';

interface Props {
  locale: Locale;
}

const { locale } = Astro.props;
const t = getTranslations(locale);
---

<section id="tips" class="py-16 md:py-20 px-6 bg-jungle/5">
  <div class="max-w-3xl mx-auto">
    <div class="text-center mb-10">
      <h2 class="font-heading text-3xl md:text-4xl font-bold text-bark">
        ✅ {t.tips.title}
      </h2>
    </div>
    <div class="space-y-4">
      {t.tips.items.map((tip, i) => (
        <div class="flex items-start gap-4 bg-white rounded-xl px-5 py-4 shadow-sm">
          <span class="text-2xl flex-shrink-0">{t.tips.icons[i]}</span>
          <p class="text-bark/80 text-base">{tip}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 6: Create LanguageToggle component**

Create `src/components/LanguageToggle.astro`:

```astro
---
import type { Locale } from '../i18n';
import { getTranslations } from '../i18n';

interface Props {
  locale: Locale;
}

const { locale } = Astro.props;
const t = getTranslations(locale);
const targetLocale = locale === 'es' ? 'en' : 'es';
const targetPath = `/${targetLocale}/`;
---

<a
  href={targetPath}
  class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-all"
>
  <span class="text-base">🌐</span>
  <span>{t.nav.language}</span>
</a>
```

- [ ] **Step 7: Create Footer component**

Create `src/components/Footer.astro`:

```astro
---
import type { Locale } from '../i18n';
import { getTranslations } from '../i18n';

interface Props {
  locale: Locale;
}

const { locale } = Astro.props;
const t = getTranslations(locale);
---

<footer class="py-10 px-6 text-center border-t border-sand">
  <p class="text-bark/40 text-sm font-body">
    🌴 {t.footer.text}
  </p>
</footer>
```

- [ ] **Step 8: Commit**

```bash
git add src/components/
git commit -m "feat: build all UI components (Hero, PlaceCard, Tips, etc.)"
```

---

### Task 7: Build Pages

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/es/index.astro`
- Create: `src/pages/en/index.astro`

- [ ] **Step 1: Create redirect page**

Create `src/pages/index.astro`:

```astro
---
return Astro.redirect('/es/');
---
```

- [ ] **Step 2: Create Spanish page**

Create `src/pages/es/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import Hero from '../../components/Hero.astro';
import HostIntro from '../../components/HostIntro.astro';
import SectionBlock from '../../components/SectionBlock.astro';
import PlaceCard from '../../components/PlaceCard.astro';
import Tips from '../../components/Tips.astro';
import Footer from '../../components/Footer.astro';
import { getTranslations } from '../../i18n';

const locale = 'es';
const t = getTranslations(locale);

const allPlaces = await getCollection('places');

const categories = [
  { id: 'cenotes', color: '#3BC4C4' },
  { id: 'lagunas', color: '#2BA5A5' },
  { id: 'ruinas', color: '#D4A853' },
  { id: 'experiencias', color: '#6DB56D' },
  { id: 'parques', color: '#E87F5F' },
  { id: 'nightlife', color: '#7B5EA7' },
] as const;
---

<Base locale={locale}>
  <Hero locale={locale} />
  <HostIntro locale={locale} />

  {categories.map(({ id, color }) => {
    const places = allPlaces
      .filter((p) => p.data.category === id)
      .sort((a, b) => a.data.order - b.data.order);

    if (places.length === 0) return null;

    return (
      <SectionBlock
        id={id}
        title={t.sections[id]}
        description={t.sections[`${id}_desc`]}
        accentColor={color}
      >
        {places.map((place) => (
          <PlaceCard
            locale={locale}
            name={place.data.name}
            nameEn={place.data.nameEn}
            emoji={place.data.emoji}
            distance={place.data.distance}
            price={place.data.price}
            hours={place.data.hours}
            highlight={place.data.highlight}
            highlightEn={place.data.highlightEn}
            features={place.data.features}
            featuresEn={place.data.featuresEn}
            accentColor={color}
          />
        ))}
      </SectionBlock>
    );
  })}

  <Tips locale={locale} />
  <Footer locale={locale} />
</Base>
```

- [ ] **Step 3: Create English page**

Create `src/pages/en/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';
import Hero from '../../components/Hero.astro';
import HostIntro from '../../components/HostIntro.astro';
import SectionBlock from '../../components/SectionBlock.astro';
import PlaceCard from '../../components/PlaceCard.astro';
import Tips from '../../components/Tips.astro';
import Footer from '../../components/Footer.astro';
import { getTranslations } from '../../i18n';

const locale = 'en';
const t = getTranslations(locale);

const allPlaces = await getCollection('places');

const categories = [
  { id: 'cenotes', color: '#3BC4C4' },
  { id: 'lagunas', color: '#2BA5A5' },
  { id: 'ruinas', color: '#D4A853' },
  { id: 'experiencias', color: '#6DB56D' },
  { id: 'parques', color: '#E87F5F' },
  { id: 'nightlife', color: '#7B5EA7' },
] as const;
---

<Base locale={locale}>
  <Hero locale={locale} />
  <HostIntro locale={locale} />

  {categories.map(({ id, color }) => {
    const places = allPlaces
      .filter((p) => p.data.category === id)
      .sort((a, b) => a.data.order - b.data.order);

    if (places.length === 0) return null;

    return (
      <SectionBlock
        id={id}
        title={t.sections[id]}
        description={t.sections[`${id}_desc`]}
        accentColor={color}
      >
        {places.map((place) => (
          <PlaceCard
            locale={locale}
            name={place.data.name}
            nameEn={place.data.nameEn}
            emoji={place.data.emoji}
            distance={place.data.distance}
            price={place.data.price}
            hours={place.data.hours}
            highlight={place.data.highlight}
            highlightEn={place.data.highlightEn}
            features={place.data.features}
            featuresEn={place.data.featuresEn}
            accentColor={color}
          />
        ))}
      </SectionBlock>
    );
  })}

  <Tips locale={locale} />
  <Footer locale={locale} />
</Base>
```

- [ ] **Step 4: Verify both pages render**

Run:
```bash
npm run dev
```

Open `http://localhost:4321/es/` and `http://localhost:4321/en/` in browser.
Expected: Both pages render with all sections and place cards visible.

- [ ] **Step 5: Commit**

```bash
git add src/pages/
git commit -m "feat: build bilingual pages with full content rendering"
```

---

### Task 8: Final Polish and Build Verification

**Files:**
- Modify: `src/components/Hero.astro` (if needed)
- Modify: `src/layouts/Base.astro` (if needed)

- [ ] **Step 1: Run production build**

Run:
```bash
npm run build
```

Expected: Build completes successfully with no errors.

- [ ] **Step 2: Preview production build**

Run:
```bash
npm run preview
```

Open `http://localhost:4321/es/` in browser.
Expected: Site loads correctly, all sections visible, language toggle works.

- [ ] **Step 3: Verify mobile responsiveness**

Open browser DevTools, toggle mobile view (375px width).
Expected: Cards stack in single column, text is readable, hero fits viewport.

- [ ] **Step 4: Verify language toggle**

Click "EN" toggle on Spanish page.
Expected: Redirects to `/en/` with English content.
Click "ES" toggle on English page.
Expected: Redirects to `/es/` with Spanish content.

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: complete Tulum guide website - production ready"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Scaffold Astro + Tailwind | 5 files |
| 2 | i18n system | 3 files |
| 3 | Content collection schema | 1 file |
| 4 | All 21 place content files | 21 files |
| 5 | Base layout | 1 file |
| 6 | All UI components | 7 files |
| 7 | Pages (redirect + ES + EN) | 3 files |
| 8 | Polish and verify | 0 new files |

**Total: 41 files, 8 tasks, ~30 minutes estimated**
