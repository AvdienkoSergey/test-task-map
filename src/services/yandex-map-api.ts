import { toRaw } from "vue";
import { clickMap$ } from "@/events/map";

interface MapClickEvent {
  get: (key: string) => [number, number] | undefined;
}

const API_KEY = "85d9555e-d585-4ec8-a35c-5ea96c912f3f";
const API_URL = `https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU`;
const API_SCRIPT_ID = "yandex-maps-script";

export const asyncAppendScript = new Promise((resolve, reject) => {
  const existingScript = document.getElementById(API_SCRIPT_ID);
  if (existingScript) {
    resolve(true);
  }
  const script = document.createElement("script");
  script.id = API_SCRIPT_ID;
  script.src = API_URL;
  script.async = true;
  document.body.appendChild(script);

  script.onload = () => {
    resolve(true);
  };

  script.onerror = (error: unknown) => reject(error);
});

export const drawMap = (coordinates: number[]) =>
  new Promise((resolve, reject) => {
    if (!window || !ymaps) reject("The problem with defining the map object");
    setTimeout(() => {
      if (!ymaps.Map) reject("The problem with defining the map constructor");
      const map = new ymaps.Map("map", {
        center: coordinates,
        zoom: 14,
        controls: ["zoomControl"],
      });
      resolve(map);
    }, 1000);
  });

function onMapClick(event: MapClickEvent) {
  const coords = event.get("coords");
  if (coords) {
    const [latitude, longitude] = coords;
    clickMap$.on(
      Promise.resolve({
        id: Date.now(),
        latitude,
        longitude,
      })
    );
  } else {
    clickMap$.on(Promise.resolve(null));
  }
}

export function addClickListener(map: ymaps.Map) {
  toRaw(map).events.add("click", onMapClick);
}

export function removeClickListener(map: ymaps.Map) {
  toRaw(map).events.remove("click", onMapClick);
}

export function createPlacemark({
  id,
  latitude,
  longitude,
}: {
  id: number;
  latitude: number;
  longitude: number;
}) {
  const placemark = new ymaps.Placemark(
    [latitude, longitude],
    {
      // Данные для балуна и хинта
      balloonContent: `<div>Place ID: ${id}</div><div>Coordinates: ${parseFloat(
        latitude.toFixed(4)
      )}, ${parseFloat(latitude.toFixed(4))}</div>`,
      hintContent: `ID: ${id} | Coordinates: ${parseFloat(
        latitude.toFixed(4)
      )}, ${parseFloat(latitude.toFixed(4))}`,
    },
    {
      preset: "islands#icon",
      iconColor: "#0095b6",
      hideIconOnBalloonOpen: false,
      balloonOffset: [0, -40],
    }
  );

  // Возвращаем созданный placemark для дальнейшего использования
  return placemark;
}

export function moveToCoordinates(map: ymaps.Map, coordinates: number[]) {
  const promise = new Promise((resolve) => {
    const duration = 500;
    toRaw(map).panTo(coordinates, {
      flying: false,
      duration,
    });
    setTimeout(resolve, duration);
  });
  return promise;
}

export function addToMap(map: ymaps.Map, placemark: ymaps.Placemark) {
  toRaw(map).geoObjects.add(placemark);
}

export function calibrateMap(
  map: ymaps.Map,
  placemark: {
    id: number;
    latitude: number;
    longitude: number;
  }
) {
  toRaw(map).panTo([placemark.latitude, placemark.longitude], {
    flying: true,
    duration: 1000,
  });
}
