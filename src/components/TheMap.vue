<template>
  <transition name="fade" mode="out-in">
    <v-skeleton-loader
      v-if="!showMap"
      :class="{ 'wrapper-mobile': isMobile, 'wrapper-desktop': isDesktop }"
    ></v-skeleton-loader>
  </transition>
  <div
    id="map"
    :class="{ 'wrapper-mobile': isMobile, 'wrapper-desktop': isDesktop }"
    v-show="showMap"
  ></div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from "vue";
import { useDisplay } from "vuetify";
import { asyncGetCurrentCoordinates } from "@/services/web-geolocation-api";
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from "@/constants";
import { useStore } from "vuex";
import { initMap$ } from "@/events/map";
import { drawMap } from "@/services/yandex-map-api";
import { Observer } from "@/events/_observer";

const store = useStore();
const { smAndDown, mdAndUp } = useDisplay();

const showMap = computed(() => store.getters.isDownloaded);
const isMobile = computed(() => smAndDown.value);
const isDesktop = computed(() => mdAndUp.value);

function saveInstanceMap(map: unknown) {
  store.commit("createMapInstance", map);
  return;
}

function fillUpMap() {
  store.dispatch("downloadPlaceMarkers");
}

function getMap(coordinates: number[]) {
  initMap$.subscribe(new Observer(fillUpMap));
  initMap$.subscribe(new Observer(saveInstanceMap));
  initMap$.on(drawMap(coordinates));
}

onMounted(() => {
  asyncGetCurrentCoordinates()
    .then((coordinates: number[]) => {
      if (!document.getElementById("map")) {
        throw new Error("Not found map container");
      }
      if (!coordinates || !Array.isArray(coordinates)) {
        throw new Error("The problem with determining coordinates");
      }
      getMap(coordinates);
    })
    .catch(() => getMap([DEFAULT_LATITUDE, DEFAULT_LONGITUDE]));
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter, .fade-leave-to /* или .fade-leave-active в зависимости от версии Vue */ {
  opacity: 0;
}
.wrapper-mobile {
  height: calc(100svh - 64px);
  width: 100svw;
  box-sizing: border-box;
}
.wrapper-desktop {
  height: calc(100svh - 112px);
  width: 100svw;
  box-sizing: border-box;
}
</style>
