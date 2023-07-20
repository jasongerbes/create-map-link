/**
 * A pair of floating point values that represent latitude and longitude coordinates.
 */
export interface MapCoordinates {
  latitude: number;
  longitude: number;
}

/**
 * The supported map actions.
 *
 * - `search` - display a map that shows a pin for a specific place, or perform a general search and display the results.
 * - `directions` - display the path between specified place(s) on the map, as well as the distance and travel time.
 * - `display` - display a map with no markers or directions.
 */
export type MapAction = 'search' | 'directions' | 'display';

/**
 * The map supported map providers.
 *
 * - `auto` - automatically determine the map provider based on the browser's user agent string.
 * Defaults to Apple Maps on iOS, iPadOS, and macOS, and Google Maps on Android, Windows, and others.
 * - `apple` - use Apple Maps. When opened on a non-Apple device, Apple Maps links will automatically redirect to
 * an equivalent Google Maps link.
 * - `google` - use Google Maps. When opened on a device without the Google Maps app, Google Maps links will open in a browsers.
 */
export type MapProvider = 'auto' | 'apple' | 'google';

/**
 * Creates a universal maps link based on the provided `action` and `options`.
 */
export type CreateMapLinkFunction = <T extends MapAction>(
  action: T,
  options: MapLinkOptions[T]
) => string;

/**
 * A map of link options, organized by MapAction.
 */
type MapLinkOptions = {
  search: MapSearchLinkOptions;
  directions: MapDirectionsLinkOptions;
  display: MapDisplayLinkOptions;
};

/**
 * Shared options for all link types.
 */
export interface MapLinkBaseOptions {
  /**
   * The maps provider. Defaults to `auto`.
   */
  provider?: MapProvider;
}

/**
 * Options for creating a universal map search link.
 */
export interface MapSearchLinkOptions extends MapLinkBaseOptions {
  /**
   * Defines the place(s) to highlight on the map.
   *
   * The value can be either a general search query, a place name, address, or a pair of latitude/longitude coordinates.
   */
  query: string | MapCoordinates;
}

/**
 * Options for creating a universal map directions link.
 */
export interface MapDirectionsLinkOptions extends MapLinkBaseOptions {
  /**
   * Defines the endpoint of the directions. The value can be either a place name, address, or a pair of latitude/longitude coordinates.
   */
  destination: string | MapCoordinates;

  /**
   * Defines the starting point from which to display directions. The value can be either a place name, address,
   * or a pair of latitude/longitude coordinates.
   *
   * Defaults to most relevant starting location, such as device location, if available.
   *
   * If unspecified, the map may provide a blank form to allow a user to enter the origin. The value can be either a place name, address, or
   * latitude/longitude coordinates.
   */
  origin?: string | MapCoordinates;

  /**
   * Defines the method of travel.
   *
   * If unspecified, the map uses shows one or more of the most relevant modes for the specified route and/or user preferences
   */
  travelMode?: MapTravelMode;
}

/**
 * Options for creating a universal map display link.
 */
export interface MapDisplayLinkOptions extends MapLinkBaseOptions {
  /**
   * Defines the center of the map window as a pair of latitude/longitude coordinates.
   */
  center?: MapCoordinates;

  /**
   * Sets the initial zoom level of the map. Accepted values are whole integers ranging from `0` (the whole world) to `21` (individual buildings).
   * The upper limit can vary depending on the map data available at the selected location.
   *
   * Defaults to `15`.
   */
  zoom?: number;

  /**
   * Defines the type of map to display.
   *
   * Defaults to `standard`, or the user's currently selected map type.
   */
  mapType?: MapType;
}

/**
 * The supported travel modes for getting directions.
 *
 * - `driving` - travel by car.
 * - `walking` - travel by foot, using pedestrian paths and sidewalks where available.
 * - `cycling` - travel by bicycle, using bike paths and preferred streets where available
 * - `transit` - travel by public transit.
 */
export type MapTravelMode = 'driving' | 'walking' | 'cycling' | 'transit';

/**
 * The supported map display types.
 *
 * - `standard` - the standard driving imagery view, showing roads, streets, and landmarks.
 * - `satellite` - the satellite imagery view, displaying aerial images of the Earth's surface.
 * - `transit` - a standard map view with a public transit overlay, highlighting public transportation routes.
 */
export type MapType = 'standard' | 'satellite' | 'transit';
