<template>
  <v-btn fab icon="mdi-pin" class="v-btn--bottom-right" @click="openSidebar">
  </v-btn>
</template>

<script lang="ts" setup>
import { viewPlacemarks$ } from "@/events/map";
import { defineEmits } from "vue";

const emits = defineEmits(["openSidebar"]);

function openSidebar() {
  viewPlacemarks$.on(Promise.resolve(emits("openSidebar")));
}
</script>

<style scoped>
.v-btn--bottom-right {
  position: fixed;
  bottom: 48px;
  left: 32px;
  z-index: 1000;
}
</style>
