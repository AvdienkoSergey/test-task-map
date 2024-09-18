import {
  Map as _LeafletMap,
  TileLayer,
  Marker,
  LatLngExpression,
  LeafletEventHandlerFn,
  Layer,
  Icon,
} from "leaflet";
import { WorldMapAbstract } from "./MapAbstarct";

class LeafletMap extends WorldMapAbstract {
  map: _LeafletMap | null = null;
  private trackingEvent: LeafletEventHandlerFn | undefined;
  private center: LatLngExpression = [51.505, -0.09];

  constructor() {
    super();
  }

  public downloadDependencies(url?: string, guid?: string): Promise<boolean> {
    // Leaflet автоматически загружает свои зависимости. Игнорим
    return Promise.resolve(true);
  }

  public initialization<T>(config: T): Promise<void> {
    const { containerId, center, zoom } = config as unknown as {
      containerId: string;
      center: LatLngExpression;
      zoom: number;
    };
    this.center = center;
    return new Promise<void>((resolve, reject) => {
      try {
        this.map = new _LeafletMap(containerId).setView(
          center as LatLngExpression,
          zoom
        );
        new TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  public displayOnTheScreen(): void {
    if (this.map) {
      this.map.setView(this.center);
    }
  }

  public enableEventTracking(): void {
    if (this.map) {
      this.map.on("click", this.trackingEvent as LeafletEventHandlerFn);
    }
  }

  public disableEventTracking(): void {
    if (this.map) {
      this.map.off("click", this.trackingEvent);
    }
  }

  public createTrackingEvent<T>(event: T): void {
    this.trackingEvent = event as unknown as (event: unknown) => void;
  }

  public moveAroundTheMap<T>(coordinates: T): Promise<void> {
    if (this.map) {
      return new Promise((resolve) => {
        this.map?.setView(coordinates as T as unknown as LatLngExpression);
        resolve();
      });
    } else {
      return Promise.reject();
    }
  }

  public deleteAllObjects<T>(objects: T[]): void {
    if (this.map) {
      objects.forEach((object: T) =>
        this.map?.removeLayer(object as T as unknown as Layer)
      );
    }
  }

  public putAllObjects<T>(objects: T[]): void {
    if (this.map) {
      objects.forEach((obj: unknown) => this.putOneObject(obj));
    }
  }

  public putOneObject<T>(object: T): void {
    if (this.map) {
      this.createMarker(
        object as T as unknown as {
          id: number;
          latitude: number;
          longitude: number;
        }
      ).addTo(this.map);
    }
  }

  private createMarker({
    id,
    latitude,
    longitude,
  }: {
    id: number;
    latitude: number;
    longitude: number;
  }) {
    if (!latitude || !longitude) {
      throw new Error("Latitude and Longitude must be defined");
    }
    const marker = new Marker([latitude, longitude], {
      icon: new Icon({
        iconUrl:
          "https://play-lh.googleusercontent.com/2dm0GfOVGOifJxxPtwjl--QhoicK9UrJbbQCWk4iB9-vhIhp3IqDqg0paUIcLWkU9Q=s180",
        iconSize: [41, 41],
        iconAnchor: [12, 41],
        popupAnchor: [0, -41],
      }),
    });
    marker.bindPopup(`
        <div>Place ID: ${id}</div>
        <div>Coordinates: ${parseFloat(latitude.toFixed(4))}, ${parseFloat(
      longitude.toFixed(4)
    )}</div>
    `);

    marker.bindTooltip(
      `ID: ${id} | Coordinates: ${parseFloat(
        latitude.toFixed(4)
      )}, ${parseFloat(longitude.toFixed(4))}`
    );

    return marker;
  }
}

export { LeafletMap };
