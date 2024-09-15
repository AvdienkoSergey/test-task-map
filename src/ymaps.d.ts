declare module "ymaps" {
  export = ymaps;
}

interface YandexMaps {
  ready(callback: () => void): void;
  Map: new (
    container: string,
    options: { center: number[]; zoom: number; controls: unknown[] }
  ) => ymaps.Map;
  Placemark: new (
    coordinates: number[],
    properties?: ymaps.PlacemarkProperties,
    options?: ymaps.PlacemarkOptions
  ) => ymaps.Placemark;
  geocode(query: string): Promise<ymaps.GeoObjectCollection>;
}

declare const ymaps: YandexMaps;

declare namespace ymaps {
  interface Map {
    geoObjects: GeoObjectCollection;
    setCenter(center: [number, number]): void;
    setType(preset: string): void;
    panTo(
      coordinates: number[],
      { flying, duration }: { flying: boolean; duration: number }
    ): void;
    events: EventManager;
  }

  interface GeoObjectCollection {
    geoObjects: {
      get: (index: number) => GeoObject;
    };
    add(object: Placemark): void;
    removeAll(): void;
  }

  interface Placemark {
    geometry: {
      getCoordinates(): [number, number];
    };
    properties: {
      set(property: string, value: unknown): void;
      get(property: string): unknown;
    };
    options: {
      set(option: string, value: unknown): void;
    };
    balloon: {
      open(): void;
    };
    events: EventManager; // Чтобы можно было добавлять и удалять обработчики событий
  }

  interface GeoObject {
    geometry: {
      getCoordinates(): [number, number];
    };
  }

  interface GeocodeResponse {
    geoObjects: {
      get(index: number): GeoObject;
    };
  }

  interface Geocode {
    then(callback: (response: GeocodeResponse) => void): void;
    catch(callback: (error: unknown) => void): void;
  }
}
