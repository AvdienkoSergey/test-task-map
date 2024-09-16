import { WorldMapAbstract } from "./MapAbstarct";

// После получения API KEY можно реализовать класс и использовать как базовую реализацию
// Я не стал заморачиваться с его получением

class GoogleMap extends WorldMapAbstract {
  downloadDependencies(
    url?: string | undefined,
    guid?: string | undefined
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  initialization<T>(config: T): Promise<void> {
    throw new Error("Method not implemented.");
  }
  displayOnTheScreen<T>(coordinates: T): void {
    throw new Error("Method not implemented.");
  }
  enableEventTracking(): void {
    throw new Error("Method not implemented.");
  }
  disableEventTracking(): void {
    throw new Error("Method not implemented.");
  }
  createTrackingEvent<T>(event: T): void {
    throw new Error("Method not implemented.");
  }
  moveAroundTheMap<T>(coordinates: T): void {
    throw new Error("Method not implemented.");
  }
  deleteAllObjects<T>(objects: T[]): void {
    throw new Error("Method not implemented.");
  }
  putAllObjects<T>(objects: T[]): void {
    throw new Error("Method not implemented.");
  }
  putOneObject<T>(object: T): void {
    throw new Error("Method not implemented.");
  }
}
