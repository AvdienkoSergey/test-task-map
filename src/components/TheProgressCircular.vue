<template>
  <div>
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="teal"
      class="fixed-indicator"
    ></v-progress-circular>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const loading = computed(() => store.getters.isLoading);
</script>

<style scoped>
.fixed-indicator {
  position: fixed;
  top: 80px;
  right: 16px;
  z-index: 100000;
}
</style>
