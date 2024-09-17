<template>
  <v-navigation-drawer v-model="state.drawer" app temporary width="320">
    <div style="padding: 8px">
      <text-title
        :titleType="4"
        :titleText="'$vuetify.placemarkers.list.title'"
      />
      <v-list lines="one">
        <template v-if="items.length">
          <v-list-item v-for="item in items" :key="item.id">
            <v-card :variant="'outlined'" :title="`ID: ${item.id}`">
              <template v-slot:append>
                <v-btn
                  color="teal"
                  icon="mdi-target"
                  size="small"
                  @click="showOnMap(item)"
                ></v-btn>
              </template>
              <template v-slot:subtitle>
                <p>latitude: {{ parseFloat(item.latitude.toFixed(4)) }}</p>
                <p>longitude: {{ parseFloat(item.longitude.toFixed(4)) }}</p>
              </template>
            </v-card>
          </v-list-item>
        </template>
        <template v-else> Список пуст </template>
      </v-list>
    </div>
  </v-navigation-drawer>
  <button-sidebar-open @openSidebar="openSidebar" />
</template>

<script lang="ts" setup>
import { reactive, computed } from "vue";
import ButtonSidebarOpen from "@/components/TheButtonSidebarOpen.vue";
import TextTitle from "@/components/TextTitle.vue";
import { useStore } from "vuex";
import { viewPlacemarks$ } from "@/events/map";
const store = useStore();

const state = reactive({
  drawer: false,
});
const items = computed(() => store.getters.placemarkers);

function openSidebar() {
  state.drawer = true;
  viewPlacemarks$.on(Promise.resolve(store.dispatch("turnOnTheViewingMode")));
}

function showOnMap(item: { id: number; latitude: number; longitude: number }) {
  state.drawer = false;
  store.dispatch("showPlacemarker", item);
}
</script>

<style scoped>
/* Добавьте стили, если нужно что-то кастомизировать */
</style>
