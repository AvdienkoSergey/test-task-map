import { Subscriber } from "@/events/_subscriber";

const initMap$ = new Subscriber();
const clickMap$ = new Subscriber();
const viewPlacemarks$ = new Subscriber();
const editMap$ = new Subscriber();

export { initMap$, clickMap$, viewPlacemarks$, editMap$ };
