export class Observer {
  observerCallback: (event: unknown) => void;

  constructor(observerCallback: (event: unknown) => void) {
    if (!observerCallback.name) {
      throw new Error("Callback function need has name");
    }
    this.observerCallback = observerCallback;
  }

  update<T>(action: Promise<T>) {
    return action.then((data: T) => this.observerCallback(data));
  }
}
