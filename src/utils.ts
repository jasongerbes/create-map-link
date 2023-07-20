import { MapCoordinates, MapProvider } from './types';

export function createLink(
  baseUrl: string,
  params: Record<string, string | number | undefined>
): string {
  const url = new URL(baseUrl);

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string' && value.length > 0) {
      url.searchParams.append(key, value);
    } else if (typeof value === 'number') {
      url.searchParams.append(key, value.toString());
    }
  }

  return url.toString();
}

export function encodeCoordinates(
  coordinates: MapCoordinates | string | undefined
): string | undefined {
  if (!coordinates || typeof coordinates === 'string') {
    return coordinates;
  }

  return `${coordinates.latitude},${coordinates.longitude}`;
}

export function getMapProvider(
  provider: MapProvider | undefined
): Omit<MapProvider, 'auto'> {
  if (provider && provider !== 'auto') {
    return provider;
  }

  if (typeof navigator === 'undefined') {
    return 'google';
  }

  const userAgent = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  const isMacOS = /macintosh|mac os x/.test(userAgent);

  if (isIOS || isMacOS) {
    return 'apple';
  } else {
    return 'google';
  }
}
