import {
  CreateMapLinkFunction,
  MapDirectionsLinkOptions,
  MapDisplayLinkOptions,
  MapSearchLinkOptions,
  MapTravelMode,
  MapType,
} from '../types';
import { createLink, encodeCoordinates } from '../utils';

export const createGoogleMapsLink: CreateMapLinkFunction = (
  action,
  options
) => {
  switch (action) {
    case 'search':
      return createGoogleMapsSearchLink(options as MapSearchLinkOptions);
    case 'directions':
      return createGoogleMapsDirectionsLink(
        options as MapDirectionsLinkOptions
      );
    case 'display':
      return createGoogleMapsDisplayLink(options as MapDisplayLinkOptions);
    default:
      throw new Error(`Unsupported MapLinkAction: ${action}`);
  }
};

/**
 * Creates a Google Maps link that displays results for a search across the visible map region.
 *
 * When searching for a specific place, the resulting map puts a pin in the specified location and displays available place details.
 */
function createGoogleMapsSearchLink(options: MapSearchLinkOptions) {
  return createLink('https://www.google.com/maps/search/?api=1', {
    query: encodeCoordinates(options.query),
  });
}

/**
 * Creates a Google Maps link that displays the path between two or more specified points on the map, as well as the distance and travel time.
 */
function createGoogleMapsDirectionsLink(options: MapDirectionsLinkOptions) {
  return createLink('https://www.google.com/maps/dir/?api=1', {
    origin: encodeCoordinates(options.origin),
    destination: encodeCoordinates(options.destination),
    travelmode: getGoogleMapsTravelMode(options.travelMode),
  });
}

/**
 * Creates a Google Maps link that displays a map with no markers or directions.
 */
function createGoogleMapsDisplayLink(options: MapDisplayLinkOptions) {
  return createLink('https://www.google.com/maps/@?api=1&map_action=map', {
    center: encodeCoordinates(options.center),
    zoom: options.zoom,
    basemap: getGoogleMapsBaseMap(options.mapType),
    layer: getGoogleMapsLayer(options.mapType),
  });
}

function getGoogleMapsTravelMode(
  travelMode?: MapTravelMode
): string | undefined {
  switch (travelMode) {
    case 'driving':
      return 'driving';
    case 'walking':
      return 'walking';
    case 'cycling':
      return 'bicycling';
    case 'transit':
      return 'transit';
    default:
      return undefined;
  }
}

function getGoogleMapsBaseMap(
  mapType: MapType | undefined
): string | undefined {
  switch (mapType) {
    case 'standard':
      return 'roadmap';
    case 'satellite':
      return 'satellite';
    case 'transit':
      return 'roadmap';
    default:
      return undefined;
  }
}

function getGoogleMapsLayer(mapType: MapType | undefined): string | undefined {
  switch (mapType) {
    case 'transit':
      return 'transit';
    default:
      return undefined;
  }
}
