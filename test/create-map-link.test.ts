import { describe, expect, it } from 'vitest';
import { createMapLink } from '../src/create-map-link';

describe('createMapLink', () => {
  describe('Apple Maps', () => {
    it('should create a search link with a free text query', () => {
      const result = createMapLink('search', {
        provider: 'apple',
        query: 'Hello World',
      });

      expect(result).toBe('https://maps.apple.com/?q=Hello+World');
    });

    it('should create a directions link with a comma separated address string', () => {
      const result = createMapLink('directions', {
        provider: 'apple',
        destination: 'One Apple Park Way, Cupertino, CA 95014, United States',
      });

      expect(result).toBe(
        'https://maps.apple.com/?daddr=One+Apple+Park+Way%2C+Cupertino%2C+CA+95014%2C+United+States'
      );
    });

    it('should create a display link with specific coordinates', () => {
      const result = createMapLink('display', {
        provider: 'apple',
        center: { latitude: 37.334886, longitude: -122.008988 },
      });

      expect(result).toBe('https://maps.apple.com/?ll=37.334886%2C-122.008988');
    });
  });

  describe('Google Maps', () => {
    it('should create a search link with a free text query', () => {
      const result = createMapLink('search', {
        provider: 'google',
        query: 'Hello World',
      });

      expect(result).toBe(
        'https://www.google.com/maps/search/?api=1&query=Hello+World'
      );
    });

    it('should create a directions link with a comma separated address string', () => {
      const result = createMapLink('directions', {
        provider: 'google',
        destination:
          'Google Building 40, 1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA',
      });

      expect(result).toBe(
        'https://www.google.com/maps/dir/?api=1&destination=Google+Building+40%2C+1600+Amphitheatre+Pkwy%2C+Mountain+View%2C+CA+94043%2C+USA'
      );
    });
  });

  it('should create a display link with specific coordinates', () => {
    const result = createMapLink('display', {
      provider: 'google',
      center: { latitude: 47.5951518, longitude: -122.3316393 },
    });

    expect(result).toBe(
      'https://www.google.com/maps/@?api=1&map_action=map&center=47.5951518%2C-122.3316393'
    );
  });
});
