<template>
  <v-btn
    fab
    icon="mdi-pin"
    class="v-btn--bottom-right"
    @click="$emit('openSidebar')"
  >
  </v-btn>
</template>

<script lang="ts" setup>
import { defineEmits } from "vue";
defineEmits(["openSidebar"]);
</script>

<style scoped>
.v-btn--bottom-right {
  position: fixed;
  bottom: 48px;
  left: 32px;
  z-index: 1000;
}
</style>
