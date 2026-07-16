export const PLACEHOLDER_FORM_URL = 'https://forms.office.com/';

export function getRegistrationUrl(value: string | undefined): string {
  return value?.trim() || PLACEHOLDER_FORM_URL;
}

export const formUrl = getRegistrationUrl(import.meta.env.VITE_MICROSOFT_FORM_URL);
export const isFormConfigured = formUrl !== PLACEHOLDER_FORM_URL;
