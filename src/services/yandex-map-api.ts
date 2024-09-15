import { useStore } from "vuex";
import { toRaw } from "vue";
const store = useStore();

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

interface MapClickEvent {
  get: (key: string) => [number, number] | undefined;
}

function onMapClick(event: MapClickEvent) {
  const coords = event.get("coords");
  if (coords) {
    console.log(`Координаты: [${coords[0]}, ${coords[1]}]`);
  } else {
    console.log("Это не возможно");
  }
}

function addClickListener() {
  if (!store.getters.mapInstance) return;
  // map.events.add("click", onMapClick);
}

function removeClickListener() {
  if (!store.getters.mapInstance) return;
  // map?.events.remove("click", onMapClick);
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
      balloonContent: `<div>Place ID: ${id}</div><div>Coordinates: ${latitude}, ${longitude}</div>`,
      hintContent: `ID: ${id} | Coordinates: ${latitude}, ${longitude}`,
    },
    {
      preset: "islands#icon",
      iconColor: "#0095b6",
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
