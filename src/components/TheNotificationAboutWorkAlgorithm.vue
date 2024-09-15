<template>
  <v-chip
    closable
    class="fixed-indicator"
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

const store = useStore();
const { t } = useLocale();

const working = computed(() => store.getters.isEditMode);

function handleClose() {
  store.dispatch("removeEventListener");
}
</script>

<style scoped>
.fixed-indicator {
  position: fixed;
  top: 80px;
  left: 8px;
  z-index: 100000; /* Чтобы индикатор был поверх всего */
}
</style>
