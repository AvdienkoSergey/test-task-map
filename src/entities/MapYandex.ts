import { WorldMapAbstract } from "./MapAbstarct";

// Реализация для Yandex Maps
class YandexMap extends WorldMapAbstract {
  private map: ymaps.Map | undefined;
  private trackingEvent: ((event: unknown) => void) | undefined;
  private readonly api_key = "85d9555e-d585-4ec8-a35c-5ea96c912f3f";
  private readonly url = `https://api-maps.yandex.ru/2.1/?apikey=${this.api_key}&lang=ru_RU`;
  private readonly guid = "yandex-maps-script";
  private center: number[] = [];

  constructor() {
    super();
  }

  public downloadDependencies(url?: string, guid?: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const existingScript = document.getElementById(this.guid);
      if (existingScript) {
        return resolve(true);
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
    this.center = center;
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

  public displayOnTheScreen(): void {
    if (this.map) {
      this.map.setCenter(this.center as number[]);
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
    if (this.trackingEvent) return;
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
      this.map.geoObjects.add(
        this.createPlacemark(
          object as unknown as {
            id: number;
            latitude: number;
            longitude: number;
          }
        )
      );
    }
  }

  private createPlacemark({
    id,
    latitude,
    longitude,
  }: {
    id: number;
    latitude: number;
    longitude: number;
  }) {
    const placemark = new ymaps.Placemark(
      [latitude, longitude],
      {
        // Данные для балуна и хинта
        balloonContent: `<div>Place ID: ${id}</div><div>Coordinates: ${parseFloat(
          latitude.toFixed(4)
        )}, ${parseFloat(latitude.toFixed(4))}</div>`,
        hintContent: `ID: ${id} | Coordinates: ${parseFloat(
          latitude.toFixed(4)
        )}, ${parseFloat(latitude.toFixed(4))}`,
      },
      {
        preset: "islands#icon",
        iconColor: "#0095b6",
        hideIconOnBalloonOpen: false,
        balloonOffset: [0, -40],
      }
    );

    // Возвращаем созданный placemark для дальнейшего использования
    return placemark;
  }
}

export { YandexMap };
