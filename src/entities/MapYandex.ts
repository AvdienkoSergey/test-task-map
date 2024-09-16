import { WorldMapAbstract } from "./MapAbstarct";

// Реализация для Yandex Maps
class YandexMap extends WorldMapAbstract {
  private map: ymaps.Map | undefined;
  private trackingEvent: ((event: unknown) => void) | undefined;
  private readonly api_key = "85d9555e-d585-4ec8-a35c-5ea96c912f3f";
  private readonly url = `https://api-maps.yandex.ru/2.1/?apikey=${this.api_key}&lang=ru_RU`;
  private readonly guid = "yandex-maps-script";

  constructor() {
    super();
  }

  public downloadDependencies(url?: string, guid?: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const existingScript = document.getElementById(this.guid);
      if (existingScript) {
        resolve(true);
      }
      const script = document.createElement("script");
      script.id = this.guid;
      script.src = this.url;
      document.head.appendChild(script);

      script.onload = () => resolve(true);
      script.onerror = (error: unknown) => reject(error as Error);
    });
  }

  public initialization<T>(config: T): Promise<void> {
    const { containerId, center, zoom, controls } = config as unknown as {
      containerId: string;
      center: number[];
      zoom: number;
      controls: string[];
    };
    return new Promise<void>((resolve, reject) => {
      try {
        ymaps.ready(() => {
          const map = new ymaps.Map(containerId, {
            center,
            zoom,
            controls,
          });
          this.map = map;
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  public displayOnTheScreen<T>(coordinates: T): void {
    if (Array.isArray(coordinates) && this.map) {
      this.map.setCenter(coordinates as number[]);
    }
  }

  public enableEventTracking(): void {
    if (this.map) {
      this.map.events.add("click", this.trackingEvent);
    }
  }

  public disableEventTracking(): void {
    if (this.map) {
      this.map.events.remove("click", this.trackingEvent);
    }
  }

  public createTrackingEvent<T>(event: T): void {
    this.trackingEvent = event as unknown as (event: unknown) => void;
  }

  public moveAroundTheMap<T>(coordinates: T): Promise<void> {
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

  public deleteAllObjects<T>(objects: T[]): void {
    if (this.map) {
      objects.forEach((object: T | ymaps.Placemark) =>
        this.map?.geoObjects.remove(object as ymaps.Placemark)
      );
    }
  }

  public putAllObjects<T>(objects: T[]): void {
    if (this.map) {
      objects.forEach((object: T | ymaps.Placemark) =>
        this.map?.geoObjects.add(object as ymaps.Placemark)
      );
    }
  }

  public putOneObject<T>(object: T): void {
    if (this.map) {
      this.map?.geoObjects.add(object as unknown as ymaps.Placemark);
    }
  }
}

export { YandexMap };
