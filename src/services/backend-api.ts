function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface IPlacemark {
  id: number;
  latitude: number;
  longitude: number;
}

class Backend {
  private storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  async getData<T>(): Promise<T> {
    await sleep(1000);
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  async saveData(data: unknown): Promise<void> {
    await sleep(1000);
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  async deleteData(): Promise<void> {
    await sleep(1000);
    localStorage.removeItem(this.storageKey);
  }

  getId() {
    return Date.now();
  }
}

const api = new Backend("fake-database");

export function getPLacemarkersList(): Promise<IPlacemark[]> {
  return api
    .getData<IPlacemark[] | null>()
    .then((data: IPlacemark[] | null) => data ?? []);
}

export function savePlaceMark(placemark: IPlacemark) {
  return getPLacemarkersList()
    .then((placemarks: IPlacemark[]) => {
      if (
        placemarks.length ||
        !placemarks.find(
          (p) =>
            p.latitude === placemark.latitude &&
            p.longitude === placemark.longitude
        )
      ) {
        placemarks.push(placemark);
      }
      return placemarks;
    })
    .then((placemarks: IPlacemark[]) => api.saveData(placemarks));
}
