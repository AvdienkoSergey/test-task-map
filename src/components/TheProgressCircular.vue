<template>
  <v-progress-circular
    v-if="loading"
    indeterminate
    color="teal"
    :class="{
      'fixed-indicator-mobile': isMobile,
      'fixed-indicator-desktop': isDesktop,
    }"
  ></v-progress-circular>
  <div v-if="loading" class="fake-layout"></div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useDisplay } from "vuetify";

const store = useStore();
const { smAndDown, mdAndUp } = useDisplay();

const loading = computed(() => store.getters.isLoading);

const isMobile = computed(() => smAndDown.value);
const isDesktop = computed(() => mdAndUp.value);
</script>

<style scoped>
.fake-layout {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 2;
  opacity: 0.01;
  background-color: black;
  cursor: wait;
}
.fixed-indicator-mobile {
  position: fixed;
  top: 80px;
  right: 16px;
  z-index: 100000;
}
.fixed-indicator-desktop {
  position: fixed;
  top: 128px;
  right: 16px;
  z-index: 100000;
}
</style>
