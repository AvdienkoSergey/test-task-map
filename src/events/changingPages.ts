import { Subscriber } from "@/events/_subscriber";

const wentToAboutTaskPage$ = new Subscriber();
const wentToMapPage$ = new Subscriber();

export { wentToAboutTaskPage$, wentToMapPage$ };
