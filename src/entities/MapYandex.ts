import { WorldMap } from "./Map";

// Реализация для Yandex Maps
class YandexMap extends WorldMap {
  private map: ymaps.Map | undefined;
  private trackingEvent: ((event: unknown) => void) | undefined;

  constructor() {
    super();
  }

  initialization<T>(config: T): Promise<void> {
    const { containerId, center, zoom, controls } = config as unknown as {
      containerId: string;
      center: number[];
      zoom: number;
      controls: string[];
    };
    return new Promise<void>((resolve, reject) => {
      ymaps.ready(() => {
        try {
          const map = new ymaps.Map(containerId, {
            center,
            zoom,
            controls,
          });
          this.map = map;
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    })
      .then(() => {
        console.log("Map initialized successfully");
      })
      .catch((error: unknown) => console.log("Error initializing map:", error))
      .finally(() => console.log("YandexMap initialization complete"));
  }

  displayOnTheScreen<T>(coordinates: T): void {
    if (Array.isArray(coordinates) && this.map) {
      this.map.setCenter(coordinates as number[]);
    }
  }

  enableEventTracking(): void {
    if (this.map) {
      this.map.events.add("click", this.trackingEvent);
    }
  }

  disableEventTracking(): void {
    if (this.map) {
      this.map.events.remove("click", this.trackingEvent);
    }
  }

  createTrackingEvent<T>(event: T): void {
    this.trackingEvent = event as unknown as (event: unknown) => void;
  }

  moveAroundTheMap<T>(coordinates: T): Promise<void> {
    if (this.map) {
      return new Promise((resolve) => {
        const duration = 500;
        this.map?.panTo(coordinates as unknown as number[], {
          flying: false,
          duration,
        });
        setTimeout(resolve, duration);
      });
    } else {
      return Promise.reject();
    }
  }

  deleteAllObjects<T>(objects: T[]): void {
    if (this.map) {
      objects.forEach((object: T | ymaps.Placemark) =>
        this.map?.geoObjects.remove(object as ymaps.Placemark)
      );
    }
  }

  putAllObjects<T>(objects: T[]): void {
    if (this.map) {
      objects.forEach((object: T | ymaps.Placemark) =>
        this.map?.geoObjects.add(object as ymaps.Placemark)
      );
    }
  }

  putOneObject<T>(object: T): void {
    if (this.map) {
      this.map?.geoObjects.add(object as unknown as ymaps.Placemark);
    }
  }
}

const YMap = new YandexMap();

export { YandexMap, YMap };
