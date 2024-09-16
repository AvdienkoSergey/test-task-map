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
