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
