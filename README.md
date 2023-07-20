# create-map-link

Create universal map links for Apple Maps or Google Maps.

- Search - display a map that shows a pin for a specific place, or perform a general search and display the results.
- Directions - display the path between specified place(s) on the map, as well as the distance and travel time.
- Display - display a map with no markers or directions.

**Note:** For consistency between map providers, only a universal subset of parameters are supported for each link type.

## Install

```sh
npm install --save create-map-link
```

### Usage

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
