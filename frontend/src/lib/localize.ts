import type { Localized } from '../types';

export function localize<T extends string>(value: Localized<T> | null | undefined, lang: string): T | '' {
  if (value == null) return '';
  if (typeof value !== 'object') return value;
  const dict = value as { en: T; 'pt-BR': T };
  return dict[lang as 'en' | 'pt-BR'] || dict.en || ('' as T);
}
