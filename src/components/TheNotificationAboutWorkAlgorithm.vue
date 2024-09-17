<template>
  <v-chip
    closable
    :class="{
      'fixed-indicator-mobile': isMobile,
      'fixed-indicator-desktop': isDesktop,
    }"
    v-if="working"
    @click:close="handleClose"
  >
    {{ t("$vuetify.editMode.notification") }}
  </v-chip>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useLocale } from "vuetify";
import { viewPlacemarks$ } from "@/events/map";
import { useDisplay } from "vuetify";
const { smAndDown, mdAndUp } = useDisplay();

const isMobile = computed(() => smAndDown.value);
const isDesktop = computed(() => mdAndUp.value);

const store = useStore();
const { t } = useLocale();

const working = computed(() => store.getters.isEditMode);

function handleClose() {
  viewPlacemarks$.on(Promise.resolve(store.dispatch("turnOnTheViewingMode")));
}
</script>

<style scoped>
.fixed-indicator-mobile {
  position: fixed;
  top: 80px;
  left: 8px;
  z-index: 100000; /* Чтобы индикатор был поверх всего */
}
.fixed-indicator-desktop {
  position: fixed;
  top: 128px;
  left: 408px;
  z-index: 100000; /* Чтобы индикатор был поверх всего */
}
</style>
