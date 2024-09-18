import { Subscriber } from "@/events/_subscriber";
import { Observer } from "./_observer";

const updateUrl = (event: unknown) => {
  const placemark = event as unknown as {
    id: number;
    latitude: number;
    longitude: number;
  };
  const url = new URL(window.location.href);
  const newUrl = `${url.pathname}?id=${placemark.id}`;
  window.history.pushState({}, "", newUrl);
};
const clickOnPlacemarker$ = new Subscriber();
clickOnPlacemarker$.subscribe(new Observer(updateUrl));

export { clickOnPlacemarker$ };
