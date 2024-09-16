<template>
  <sidebar-mobile v-if="isMobile" />
  <sidebar-desktop v-if="isDesktop" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";
import SidebarMobile from "@/components/TheSidebarMobile.vue";
import SidebarDesktop from "@/components/TheSidebarDesktop.vue";

const { smAndDown, mdAndUp } = useDisplay();

const isMobile = computed(() => smAndDown.value);
const isDesktop = computed(() => mdAndUp.value);
</script>

<style scoped></style>
