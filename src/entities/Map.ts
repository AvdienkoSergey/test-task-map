abstract class WorldMapAbstract {
  abstract downloadDependencies(url: string, guid: string): Promise<boolean>;
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

export class WorldMap extends WorldMapAbstract {

  constructor() {
    super();
  }

  downloadDependencies(url: string, guid: string = ""): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const existingScript = document.getElementById(guid);
      if (existingScript) {
        resolve(true);
      }
      const script = document.createElement("script");
      script.id = guid;
      script.src = url;
      document.head.appendChild(script);

      script.onload = () => resolve(true);
      script.onerror = (error: unknown) => reject(error as Error);
    });
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
