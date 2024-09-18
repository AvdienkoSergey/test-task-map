<template>
  <sidebar-mobile v-if="isMobile" @showOnMap="showOnMap" />
  <sidebar-desktop v-if="isDesktop" @showOnMap="showOnMap" />
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import { useDisplay } from "vuetify";
import { useStore } from "vuex";
import { clickOnPlacemarker$ } from "@/events/placemarker-list";
import SidebarMobile from "@/components/TheSidebarMobile.vue";
import SidebarDesktop from "@/components/TheSidebarDesktop.vue";

const { smAndDown, mdAndUp } = useDisplay();

const isMobile = computed(() => smAndDown.value);
const isDesktop = computed(() => mdAndUp.value);

const store = useStore();

function showOnMap(item: { id: number; latitude: number; longitude: number }) {
  clickOnPlacemarker$.on(store.dispatch("showPlacemarker", item));
}

function restoreHistoryActions() {
  const currentUrl = new URL(window.location.href);
  const searchParams = currentUrl.searchParams;
  store.dispatch("restoreHistoryActions", searchParams.get("id"));
}

onMounted(() => window.addEventListener("popstate", restoreHistoryActions));
onUnmounted(() =>
  window.removeEventListener("popstate", restoreHistoryActions)
);
</script>

<style scoped></style>
