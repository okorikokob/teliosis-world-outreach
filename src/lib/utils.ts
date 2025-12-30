export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(iso: string, locale = 'en-US', options?: Intl.DateTimeFormatOptions) {
  try {
    return new Date(iso).toLocaleDateString(locale, options ?? { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return iso;
  }
}
