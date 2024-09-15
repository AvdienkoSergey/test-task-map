import { Subscriber } from "@/events/_subscriber";

const initMap$ = new Subscriber();
const clickMap$ = new Subscriber();

export { initMap$, clickMap$ };
