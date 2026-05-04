# Tulum Sargassum Guide - Design Spec

## Overview

A single-page bilingual (ES/EN) guide website for Airbnb guests staying at Zama Towers, Aldea Zama, Tulum. Provides curated recommendations for activities when sargassum affects the beaches: cenotes, lagoons, Mayan ruins, experiences, parks, and nightlife.

**Tone**: Warm, personal, host-to-guest. Like a friend giving you their best local tips.

## Technical Architecture

### Stack
- **Astro 5** — static site generator
- **Tailwind CSS 4** — utility-first styling
- **No JS framework** — Astro islands only for language toggle
- **i18n** — URL-based routing (`/es/` default, `/en/`)
- **Content Collections** — typed content with Zod schemas, blog-ready

### Project Structure
```
src/
  content/
    places/           # each place as .md with typed frontmatter
    config.ts         # Zod schema definitions
  pages/
    index.astro       # redirect to /es/
    es/index.astro
    en/index.astro
  components/
    Hero.astro
    PlaceCard.astro
    SectionBlock.astro
    LanguageToggle.astro
    Tips.astro
    NavDots.astro
  layouts/
    Base.astro
  i18n/
    es.json           # UI strings in Spanish
    en.json           # UI strings in English
```

### Content Model (Place)
```typescript
{
  name: string,            // "Gran Cenote"
  nameEn: string,          // English name (often same)
  category: "cenotes" | "lagunas" | "ruinas" | "experiencias" | "parques" | "nightlife",
  emoji: string,           // "🐢"
  distance: string,        // "10 min / 4 km"
  price: string,           // "~$450–$500 MXN"
  hours: string,           // "8:00 AM – 4:45 PM"
  highlight: string,       // Spanish description
  highlightEn: string,     // English description
  features?: string[],     // Extra features (Spanish)
  featuresEn?: string[],   // Extra features (English)
  order: number            // Display order within category
}
```

### i18n Strategy
- URL-based: `/es/` (default) and `/en/`
- UI strings: JSON files for interface text (section headings, buttons, tips)
- Content: Bilingual fields in same `.md` file (simpler to maintain than duplicating)
- Toggle: Minimal Astro island component that switches URL prefix

## Visual Design

### Color Palette
| Role | Hex | Description |
|------|-----|-------------|
| Base | `#F5F0E8` | Warm sand background |
| Surface | `#FFFFFF` | Cards, elevated surfaces |
| Primary | `#1B7A6D` | Deep jungle green/teal |
| Accent | `#3BC4C4` | Light cenote turquoise |
| Text | `#2D2A26` | Warm dark brown |
| Highlight | `#D4A853` | Golden/honey for details |

### Typography
- **Headings**: Playfair Display (serif, organic, elegant)
- **Body**: DM Sans (clean sans-serif, excellent mobile readability)

### Layout (Mobile-First)

1. **Hero** — Full viewport height, gradient overlay on solid color, title + host subtitle, language toggle top-right
2. **Host Intro** — Brief warm text about sargassum context and what to expect
3. **Category Sections** — Each with decorative heading, short intro, place cards
4. **Place Cards** — Compact: emoji icon, name, distance, price, hours, description. Color-coded border by category
5. **Tips Section** — Icon + text pairs for key advice
6. **Footer** — Minimal, "Made with love from Aldea Zama"

### Category Color Coding
| Category | Color accent |
|----------|-------------|
| Cenotes | Turquoise (`#3BC4C4`) |
| Lagunas | Blue-green (`#2BA5A5`) |
| Ruinas | Warm gold (`#D4A853`) |
| Experiencias | Soft green (`#6DB56D`) |
| Parques | Orange-coral (`#E87F5F`) |
| Nightlife | Deep purple (`#7B5EA7`) |

### Interactions
- Smooth scroll between sections
- Fixed navigation dots on the side (desktop) / bottom (mobile) for section jumping
- Persistent language toggle
- No heavy animations — speed and readability first
- Subtle fade-in on scroll for cards

## Blog-Ready Architecture

The site is designed to expand to a blog without restructuring:
- Add `src/content/blog/` collection with markdown posts
- Create `src/pages/es/blog/[...slug].astro` and English equivalent
- Posts inherit layout, typography, and color palette
- Content Collections already configured — just add the new collection

## Content Sections

### Categories (in display order)
1. **Cenotes** — 9 places (Gran Cenote, Dos Ojos, Taak Bi Ha, Tankah, Zacil-Ha, Casa Cenote, Corazon, Puerta al Cielo, Kantun-Chi)
2. **Lagunas** — 3 places (Kaan Luum, Neek, Nopalitos)
3. **Ruinas Mayas** — 2 places (Tulum, Coba)
4. **Experiencias** — 1 place (Art Walk Holistika)
5. **Parques** — 3 places (Xcaret, Xel-Ha, Xplor)
6. **Vida Nocturna** — 3 places (Papaya Playa, Gitano, Bonbonniere)

### Tips (6 items)
- Sargassum season → cenotes and lagoons best option
- Go early (8-10 AM) to avoid crowds
- Carry cash (many places don't accept cards)
- Use biodegradable sunscreen
- Rent a car, bicycle, or scooter

## Success Criteria
- Lighthouse Performance score > 95
- Mobile-first, fully responsive
- Loads fast on 3G (< 3s)
- Accessible (WCAG 2.1 AA)
- Content easily updatable via markdown files
- Expandable to blog without architectural changes
