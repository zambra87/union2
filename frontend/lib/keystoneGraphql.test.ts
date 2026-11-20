import { toRedirectLocation } from './keystoneGraphql';

describe('toRedirectLocation', () => {
  it('keeps absolute http(s) URLs', () => {
    expect(toRedirectLocation('https://google.com')).toBe('https://google.com');
    expect(toRedirectLocation('http://example.com/a')).toBe(
      'http://example.com/a'
    );
  });

  it('keeps internal paths', () => {
    expect(toRedirectLocation('/ministerios/kids')).toBe('/ministerios/kids');
  });

  it('prefixes hosts that are missing a scheme', () => {
    expect(toRedirectLocation('google.cl')).toBe('https://google.cl');
    expect(toRedirectLocation('wa.me/569000')).toBe('https://wa.me/569000');
  });

  it('keeps protocol-relative and special schemes', () => {
    expect(toRedirectLocation('//cdn.example.com/a')).toBe(
      'https://cdn.example.com/a'
    );
    expect(toRedirectLocation('mailto:hi@unionchurch.cl')).toBe(
      'mailto:hi@unionchurch.cl'
    );
  });
});
