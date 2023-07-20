import { createAppleMapsLink } from './providers/apple-maps';
import { createGoogleMapsLink } from './providers/google-maps';
import { CreateMapLinkFunction } from './types';
import { getMapProvider } from './utils';

export const createMapLink: CreateMapLinkFunction = (action, options) => {
  const provider = getMapProvider(options.provider);

  switch (provider) {
    case 'apple':
      return createAppleMapsLink(action, options);
    case 'google':
      return createGoogleMapsLink(action, options);
    default:
      throw new Error(`Unsupported MapProvider: ${provider}`);
  }
};

createMapLink('display', {
  provider: 'google',
  center: { latitude: 47.5951518, longitude: -122.3316393 },
  zoom: 21,
  mapType: 'satellite',
});
