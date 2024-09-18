# Assignment Overview

You need to build an application using **Vue.js**, **Vuex**, **VueRouter**, and **Vuetify**. The header of the application should contain a menu with two sections: About the **Assignment** and **Map**. The main part of the application should display the content of these sections.

## Section About the Assignment

This section should display the text of this assignment, styled similarly to this document.

## Section About the Assignment

The screen should display a map and a list (see example below):

1. **Add Marker Mode**: When clicking the "add" button, the map should enter marker-adding mode: a marker should appear where clicked, and an entry with the marker's address should be added to the list

    a. You can use any free geocoding API for finding the address, such as [https://geocode.maps.co/](https://geocode.maps.co/)

    b. If the address is not found, show an error and do not add the marker to the list

2. **Marker Click**: Clicking on a marker should highlight the corresponding list entry

3. **List Click**: Clicking on a list entry should center the map on the corresponding marker

4. **Local Marker Storage**: Markers should be stored locally and persist after page reload

5. **Address Bar**: The ID of the selected marker should appear in the address bar

Data storage should be simulated using a service that mimics a backend. (Create a `Backend` class that pseudo-asynchronously saves data to `localStorage`.)

### Additional Features:

1. Ensure the app is mobile-responsive.
2. Implement localization.
3. Write one unit test for any component using **Jest**.


# Implementation

The foundation of this project is the `WorldMap` class, which allows working with any map type that implements the `WorldMapAbstract` interface

```typescript
export abstract class WorldMapAbstract {
  abstract downloadDependencies(url?: string, guid?: string): Promise<boolean>;
  abstract initialization<T>(config: T): Promise<void>;
  abstract displayOnTheScreen<T>(coordinates: T): void;
  abstract enableEventTracking(): void;
  abstract disableEventTracking(): void;
  abstract createTrackingEvent<T>(event: T): void;
  abstract moveAroundTheMap<T>(coordinates: T): void;
  abstract deleteAllObjects<T>(objects: T[]): void;
  abstract putAllObjects<T>(objects: T[]): void;
  abstract putOneObject<T>(object: T): void;
}
```

For example, I've connected two map implementations. Google Maps requires form submission, so I skipped it

```
/src/entities
  - MapYandex
  - MapGoogle
  - MapLeaflet
```

To use a specific map, simply extend the necessary class

```typescript
import { YandexMap } from "./MapYandex";
import { LeafletMap } from "./MapLeaflet";

class _WorldMap extends YandexMap {
  constructor() {
    super();
  }
}

const WorldMap = new _WorldMap();

export { WorldMap, _WorldMap };
```

Unit tests have been written for a random component and for the implementation of `WorldMapAbstract` in the form of `YandexMap`.

# Installation Instructions

```
npm install --legacy-peer-deps
```

```
npm run serve
```

## Docker Build and Run Instructions
```
docker build -t test-task-map .
docker run -d -p 80:80 --name app test-task-map
```

**Note**: Make sure port 80 is not occupied, e.g., by IIS on Windows.
