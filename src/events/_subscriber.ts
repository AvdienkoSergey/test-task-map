import { Observer } from "@/events/_observer";

export class Subscriber {
  observers: Observer[];

  constructor() {
    this.observers = [];
  }

  subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer) {
    this.observers = this.observers.filter((_observer: Observer) => {
      return _observer.observerCallback.name !== observer.observerCallback.name;
    });
  }

  on<T>(action: Promise<T>) {
    this.observers.forEach((observer: Observer) => {
      observer.update<T>(action);
    });
  }
}
