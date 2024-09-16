<template>
  <v-container fluid class="pa-0 map-container">
    <v-row no-gutters class="map-container">
      <v-col cols="12" md="3" class="pa-4">
        <h2 class="text-h4 mb-4">123</h2>
        <v-list>
          <v-list-item
            v-for="marker in markers"
            :key="marker.id"
            @click="centerMap(marker.position)"
          >
            <v-list-item-title>{{ marker.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ marker.address }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="12" md="9" class="pa-0">
        <client-only>
          <l-map
            id="map-leaflet"
            ref="mapContainer"
            v-model:zoom="zoom"
            v-model:center="center"
            :useGlobalLeaflet="false"
            style="height: calc(100vh - 64px); width: 100vw; display: flex"
            @click="onMapClick"
          >
            <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              layer-type="base"
              name="OpenStreetMap"
            ></l-tile-layer>
            <l-marker
              v-for="marker in markers"
              :key="marker.id"
              :lat-lng="marker.position"
            >
              <l-popup>
                <div>
                  <h3>{{ marker.name }}</h3>
                  <p>{{ marker.address }}</p>
                </div>
              </l-popup>
            </l-marker>
          </l-map>
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { LeafletMap } from "@/entities/MapLeaflet"; // Путь к вашему адаптеру

const mapContainer = ref<HTMLDivElement | null>(null);
const zoom = ref(13);
const center = ref<[number, number]>([51.505, -0.09]);

interface Marker {
  id: number;
  name: string;
  address: string;
  position: [number, number];
}

const markers = ref<Marker[]>([
  { id: 1, name: "Marker 1", address: "Address 1", position: [51.505, -0.09] },
  { id: 2, name: "Marker 2", address: "Address 2", position: [51.51, -0.1] },
]);

// Создаем экземпляр адаптера
const mapAdapter = ref<LeafletMap | null>(null);

const initializeMap = () => {
  if (mapContainer.value) {
    mapAdapter.value = new LeafletMap();
    mapAdapter.value
      .initialization({
        containerId: "map-leaflet",
        center: center.value,
        zoom: zoom.value,
      })
      .then(() => {
        mapAdapter.value?.createTrackingEvent((event: any) => {
          console.log("Map clicked:", event.latlng);
          // Дополнительные действия при клике на карту
        });
        mapAdapter.value?.enableEventTracking();
      })
      .catch((error) => {
        console.error("Error initializing map:", error);
      });
  }
};

// Центрируем карту на указанной позиции
const centerMap = (position: [number, number]) => {
  if (mapAdapter.value) {
    mapAdapter.value.displayOnTheScreen(position);
  }
};

// Обрабатываем клик на карте
const onMapClick = (event: { latlng: { lat: number; lng: number } }) => {
  const newMarker: Marker = {
    id: markers.value.length + 1,
    name: `Marker ${markers.value.length + 1}`,
    address: `Lat: ${event.latlng.lat.toFixed(
      4
    )}, Lng: ${event.latlng.lng.toFixed(4)}`,
    position: [event.latlng.lat, event.latlng.lng],
  };
  markers.value.push(newMarker);
};

// Инициализация адаптера после монтирования компонента
onMounted(() => {
  initializeMap();
});
</script>

<style scoped>
.map-container {
  height: calc(100vh - 64px);
}
</style>
