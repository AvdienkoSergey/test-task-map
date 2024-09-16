<template>
  <v-btn
    fab
    :icon="buttonIcon"
    :color="buttonColor"
    size="x-large"
    class="v-btn--bottom-right"
    @click="handleClick"
    :class="{ 'transition-color': working }"
  >
  </v-btn>
</template>

<script lang="ts" setup>
import { computed, onUnmounted } from "vue";
import { editMap$, viewPlacemarks$ } from "@/events/map";

import { useStore } from "vuex";
const store = useStore();

const working = computed(() => store.getters.isEditMode);
const buttonColor = computed(() => (working.value ? "deep-orange" : "teal"));
const buttonIcon = computed(() => (working.value ? "mdi-minus" : "mdi-plus"));

function handleClick() {
  working.value
    ? viewPlacemarks$.on(Promise.resolve(store.dispatch("removeListener")))
    : editMap$.on(Promise.resolve(store.dispatch("addListener")));
}

onUnmounted(() => {
  viewPlacemarks$.on(Promise.resolve(store.dispatch("removeListener")));
});
</script>

<style scoped>
.v-btn--bottom-right {
  position: fixed;
  bottom: 48px;
  right: 32px;
  z-index: 1000;
}
.transition-color {
  animation: colorTransition 0.3s ease;
}

@keyframes colorTransition {
  0% {
    background-color: teal;
  }
  100% {
    background-color: orange;
  }
}
</style>
