import {
  CreateMapLinkFunction,
  MapDirectionsLinkOptions,
  MapDisplayLinkOptions,
  MapSearchLinkOptions,
  MapTravelMode,
  MapType,
} from '../types';
import { createLink, encodeCoordinates } from '../utils';

export const createAppleMapsLink: CreateMapLinkFunction = (action, options) => {
  switch (action) {
    case 'search':
      return createAppleMapsSearchLink(options as MapSearchLinkOptions);
    case 'directions':
      return createAppleMapsDirectionsLink(options as MapDirectionsLinkOptions);
    case 'display':
      return createAppleMapsDisplayLink(options as MapDisplayLinkOptions);
    default:
      throw new Error(`Unsupported MapLinkAction: ${action}`);
  }
};

function createAppleMapsSearchLink(options: MapSearchLinkOptions): string {
  return createLink('https://maps.apple.com', {
    q: encodeCoordinates(options.query),
  });
}

/**
 * Creates an Apple Maps link that displays the path between two or more specified points on the map, as well as the distance and travel time.
 */
function createAppleMapsDirectionsLink(options: MapDirectionsLinkOptions) {
  return createLink('https://maps.apple.com', {
    saddr: encodeCoordinates(options.origin),
    daddr: encodeCoordinates(options.destination),
    dirflg: getAppleMapsTravelMode(options.travelMode),
  });
}

/**
 * Creates an Apple Maps link that displays a map with no markers or directions.
 */
function createAppleMapsDisplayLink(options: MapDisplayLinkOptions): string {
  return createLink('https://maps.apple.com', {
    ll: encodeCoordinates(options.center),
    z: options.zoom,
    t: getAppleMapsMapType(options.mapType),
  });
}

function getAppleMapsTravelMode(
  travelMode?: MapTravelMode
): string | undefined {
  switch (travelMode) {
    case 'driving':
      return 'd';
    case 'walking':
      return 'w';
    case 'cycling':
      return 'c';
    case 'transit':
      return 'r';
    default:
      return undefined;
  }
}

function getAppleMapsMapType(mapType?: MapType): string | undefined {
  switch (mapType) {
    case 'standard':
      return 'm';
    case 'satellite':
      return 'k';
    case 'transit':
      return 'r';
    default:
      return undefined;
  }
}
