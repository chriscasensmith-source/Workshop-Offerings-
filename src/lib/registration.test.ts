import { PLACEHOLDER_FORM_URL, getRegistrationUrl } from './registration';

describe('registration configuration', () => {
  it('uses a configured Microsoft Form response URL', () => {
    expect(getRegistrationUrl(' https://forms.office.com/r/HgUVx6tuQ8 ')).toBe(
      'https://forms.office.com/r/HgUVx6tuQ8',
    );
  });

  it('uses the clearly marked placeholder when no URL is configured', () => {
    expect(getRegistrationUrl(undefined)).toBe(PLACEHOLDER_FORM_URL);
    expect(getRegistrationUrl('   ')).toBe(PLACEHOLDER_FORM_URL);
  });
});
