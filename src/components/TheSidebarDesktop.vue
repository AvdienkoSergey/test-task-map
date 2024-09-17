<template>
  <div class="sidebar-desktop">
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
</template>

<script lang="ts" setup>
import { computed } from "vue";
import TextTitle from "@/components/TextTitle.vue";
import { useStore } from "vuex";
const store = useStore();

const items = computed(() => store.getters.placemarkers);

function showOnMap(item: { id: number; latitude: number; longitude: number }) {
  store.dispatch("showPlacemarker", item);
}
</script>

<style scoped>
.sidebar-desktop {
  padding: 8px;
  width: 400px;
  height: calc(100vh - 112px);
  position: fixed;
  top: 112px;
  left: 0;
  background-color: white;
  overflow: auto;
  z-index: 100000;
}
</style>
