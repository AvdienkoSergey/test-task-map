<template>
  <transition name="fade" mode="out-in">
    <v-skeleton-loader
      v-if="!showMap"
      :class="{
        'wrapper-map-mobile': isMobile,
        'wrapper-map-desktop': isDesktop,
      }"
    ></v-skeleton-loader>
  </transition>
  <div
    id="map"
    :class="{
      'wrapper-map-mobile': isMobile,
      'wrapper-map-desktop': isDesktop,
    }"
  ></div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { asyncGetCurrentCoordinates } from "@/services/web-geolocation-api";
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from "@/constants";
import { initMap$ } from "@/events/map";
import { Observer } from "@/events/_observer";
import { WorldMap } from "@/entities/Map";
import { useStore } from "vuex";
import { computed } from "vue";
import { useDisplay } from "vuetify";

const { smAndDown, mdAndUp } = useDisplay();
const isMobile = computed(() => smAndDown.value);
const isDesktop = computed(() => mdAndUp.value);

const store = useStore();

const showMap = computed(() => store.getters.isDownloaded);

function downloadPlaceMarkers() {
  store.dispatch("downloadPlaceMarkers");
}

function drawMap(event: unknown) {
  if (event instanceof Error) {
    // Требуется сценарий для обработки ошибки инициализации карты,
    // так как это стороннее API
    return;
  }
  WorldMap.displayOnTheScreen();
}

onMounted(() => {
  asyncGetCurrentCoordinates()
    .then((coordinates: number[]) => {
      if (!coordinates || !Array.isArray(coordinates)) {
        throw new Error("The problem with determining coordinates");
      }
      return coordinates;
    })
    .catch(() => [DEFAULT_LATITUDE, DEFAULT_LONGITUDE])
    .then((coordinates: number[]) => {
      initMap$.subscribe(new Observer(downloadPlaceMarkers));
      initMap$.subscribe(new Observer(drawMap));
      setTimeout(
        () =>
          initMap$.on(
            WorldMap.initialization({
              containerId: "map",
              center: coordinates,
              zoom: 16,
              controls: ["zoomControl"],
            })
          ),
        500
      );
    });
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.wrapper-map-mobile {
  height: calc(100svh - 64px);
  width: 100svw;
  box-sizing: border-box;
}
.wrapper-map-desktop {
  height: calc(100svh - 112px);
  width: 100svw;
  box-sizing: border-box;
}
</style>
