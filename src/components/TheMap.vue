<template>
  <div
    id="map"
    style="height: calc(100svh - 64px); width: 100svw; box-sizing: border-box"
  ></div>
</template>

<script lang="ts" setup>
import { onMounted, nextTick } from "vue";
import { asyncGetCurrentCoordinates } from "@/services/web-geolocation-api";
import { useStore } from "vuex";
import { createPlacemark } from "@/services/yandex-map-api";
const store = useStore();

function initMap(lat: number, lon: number) {
  ymaps.ready(() => {
    nextTick(() => {
      const map = new ymaps.Map("map", {
        center: [lat, lon],
        zoom: 14,
        controls: ["zoomControl"],
      });
      // const cursor = map.cursors.push("pointer");
      // cursor.setKey("pointer");
      store.commit("createMapInstance", map);
      //   const id = 0;
      //   const latitude = 43.226259;
      //   const longitude = 76.901672;
      //   const placemark = new ymaps.Placemark(
      //     [latitude, longitude],
      //     {
      //       // Данные для балуна и хинта
      //       balloonContent: `<div>Place ID: ${id}</div><div>Coordinates: ${latitude}, ${longitude}</div>`,
      //       hintContent: `ID: ${id} | Coordinates: ${latitude}, ${longitude}`,
      //     },
      //     {
      //       preset: "islands#icon",
      //       iconColor: "#0095b6",
      //     }
      //   );
      //   map.geoObjects.add(placemark);
      //   map.panTo([latitude, longitude], {
      //     flying: true,
      //     duration: 500,
      //   });
    });
  });
}

onMounted(() => {
  asyncGetCurrentCoordinates().then((coordinates: number[]) => {
    if (!document.getElementById("map")) {
      throw new Error("Not found map container");
    }
    const [latitude, longitude] = coordinates;
    initMap(latitude, longitude);
  });
});
</script>
