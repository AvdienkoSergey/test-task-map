<template>
  <v-navigation-drawer v-model="state.drawer" app temporary width="270">
    <div style="padding: 8px">
      <text-title :titleType="4" :titleText="'Маркеры'" />
      <v-list lines="one">
        <template v-if="items.length">
          <v-list-item v-for="item in items" :key="item.id">
            <v-card
              prepend-icon="mdi-pin"
              :variant="'outlined'"
              :title="`ID: ${item.id}`"
            >
              <template v-slot:append>
                <v-btn
                  color="teal"
                  icon="mdi-target"
                  size="small"
                  @click="showOnMap(item)"
                ></v-btn>
              </template>
              <template v-slot:subtitle>
                <p>latitude: {{ parseFloat(item.latitude.toFixed(2)) }}</p>
                <p>longitude: {{ parseFloat(item.longitude.toFixed(2)) }}</p>
              </template>
            </v-card>
          </v-list-item>
        </template>
        <template v-else> Список пуст </template>
      </v-list>
    </div>
  </v-navigation-drawer>
  <button-sidebar-open @openSidebar="state.drawer = true" />
</template>

<script lang="ts" setup>
import { reactive, computed } from "vue";
import ButtonSidebarOpen from "@/components/TheButtonSidebarOpen.vue";
import TextTitle from "@/components/TextTitle.vue";
import { useStore } from "vuex";
const store = useStore();

const state = reactive({
  drawer: false,
});
const items = computed(() => store.getters.placemarkers);
function showOnMap(item: { id: number; latitude: number; longitude: number }) {
  state.drawer = false;
  store.commit("showOnMap", item);
}
</script>

<style scoped>
/* Добавьте стили, если нужно что-то кастомизировать */
</style>
