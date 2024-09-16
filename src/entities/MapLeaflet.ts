import {
  Map as _LeafletMap,
  TileLayer,
  Marker,
  LatLngExpression,
  LeafletEventHandlerFn,
  Layer,
  LatLngTuple,
} from "leaflet";
import { WorldMapAbstract } from "./MapAbstarct";
import "leaflet/dist/leaflet.css";

class LeafletMap extends WorldMapAbstract {
  private map: _LeafletMap | null = null;
  private trackingEvent: LeafletEventHandlerFn | undefined;

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
      center: number[] | LatLngExpression;
      zoom: number;
    };
    // [51.505, -0.09]
    // 13
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

  public displayOnTheScreen<T>(coordinates: T): void {
    if (this.map && Array.isArray(coordinates)) {
      this.map.setView(coordinates as T as unknown as LatLngTuple);
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

  public moveAroundTheMap<T>(coordinates: T): void {
    this.displayOnTheScreen(coordinates);
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
    if (
      this.map &&
      (object as unknown as { position: LatLngExpression }).position
    ) {
      const marker = new Marker(
        (object as unknown as { position: LatLngExpression }).position
      );
      if ((object as unknown as { name: string }).name) {
        marker.bindPopup(
          `<b>${(object as unknown as { name: string }).name}</b>`
        );
      }
      marker.addTo(this.map);
    }
  }
}

export { LeafletMap };
