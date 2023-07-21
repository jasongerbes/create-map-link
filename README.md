# create-map-link

Create universal map links for Apple Maps or Google Maps.

- [Search](#search) - show a pin on the map for a specific place, or show the results of a free text search.
- [Directions](#directions) - show the path between specified place(s) on the map, as well as the distance and travel time.
- [Display](#display) - show a map location with no markers or directions.

**Note:** For consistency between map providers, only a universal subset of parameters are supported for each link type.

## Install

```sh
npm install --save create-map-link
```

## Usage

```js
import { createMapLink } from 'create-map-link';

// Search for cinemas near me using the device's default map.
createMapLink('search', { query: 'Cinema' });

// Get direction to a specific address using Apple Maps.
createMapLink('directions', {
  provider: 'apple',
  destination: 'One Apple Park Way, Cupertino, CA 95014, United States',
});

// View a specific a location using Google Maps.
createMapLink('display', {
  provider: 'google',
  center: { latitude: 47.5951518, longitude: -122.3316393 },
});
```

## Search

Create a link that shows a pin on the map for a specific place, or shows the results of a free text search.

```js
createMapLink('search', { ...options });
```

### Options

Options for creating a universal map search link.

#### provider: [MapProvider](#mapprovider) (optional)

Defines the map provider.

- default: `'auto'`

#### query: `string` \| [MapCoordinates](#mapcoordinates)

Defines the place(s) to highlight on the map. The value can be either a general search query, a place name, address, or a pair of latitude/longitude coordinates.

- default: N/A
- examples:
  - `'Cinemas'`
  - `'One Apple Park Way, Cupertino, CA 95014, United States'`
  - `{ latitude: 37.334886, longitude: -122.008988 }`

## Directions

Create a link that shows the path between specified place(s) on the map, as well as the distance and travel time.

```js
createMapLink('directions', { ...options });
```

### Options

Options for creating a universal map directions link.

#### provider: [MapProvider](#mapprovider) (optional)

Defines the map provider.

- default: `'auto'`

#### destination: `string` \| [MapCoordinates](#mapcoordinates)

Defines the endpoint of the directions. The value can be either a place name, address, or a pair of latitude/longitude coordinates

- default: N/A
- examples:
  - `'One Apple Park Way, Cupertino, CA 95014, United States'`
  - `{ latitude: 37.334886, longitude: -122.008988 }`

#### origin: `string` \| [MapCoordinates](#mapcoordinates) (optional)

Defines the starting point from which to display directions. The value can be either a place name, address, or a pair of latitude/longitude coordinates.

- default: If unspecified, defaults to most relevant starting location, such as device location, or the map may provide a blank form to allow a user to enter the origin.
- examples:
  - `'One Apple Park Way, Cupertino, CA 95014, United States'`
  - `{ latitude: 37.334886, longitude: -122.008988 }`

#### travelMode: [MapTravelMode](#maptravelmode) (optional)

Defines the method of travel.

- default: the map shows one or more of the most relevant modes for the specified route and/or user preferences.

## Display

Create a link that shows a map location with no markers or directions.

```js
createMapLink('display', { ...options });
```

### Options

Options for creating a universal map display link.

#### provider: [MapProvider](#mapprovider) (optional)

Defines the map provider.

- default: `'auto'`

#### center: [MapCoordinates](#mapcoordinates)

Defines the center of the map window as a pair of latitude/longitude coordinates.

- default: N/A
- example: `{ latitude: 37.334886, longitude: -122.008988 }`

#### zoom: `number`(optional)

Sets the initial zoom level of the map. Accepted values are whole integers ranging from `0` (the whole world) to `21` (individual buildings).

The upper limit can vary depending on the map data available at the selected location.

- default: `15`

#### mapType: [MapType](#maptype) (optional)

Defines the type of map to display.

- default: `'standard'`, or the user's currently selected map type.

## API Types

### MapProvider

The supported map providers.

- `'auto'` - Defaults to Apple Maps on iOS, iPadOS, and macOS, and Google Maps on Android, Windows, and others.
- `'apple'` - Apple Maps. Will redirect to an equivalent Google Maps link when opened on a non-Apple device.
- `'google'` - Google Maps. Will open in a browser when opened on a device without the Google Maps app.

### MapCoordinates

A pair of floating point values that represent latitude and longitude coordinates.

- type: `object`
- example: `{ latitude: 37.334886, longitude: -122.008988 }`

### MapTravelMode

The supported travel modes for getting directions.

- `'driving'` - travel by car.
- `'walking'` - travel by foot, using pedestrian paths and sidewalks where available.
- `'cycling'` - travel by bicycle, using bike paths and preferred streets where available
- `'transit'` - travel by public transit.

### MapType

The supported map display types.

- `'standard'` - the standard driving imagery view, showing roads, streets, and landmarks.
- `'satellite'` - the satellite imagery view, displaying aerial images of the Earth's surface.
- `'transit'` - a standard map view with a public transit overlay, highlighting public transportation routes.
