<template>
  <v-snackbar
    v-model="snackbar.visible"
    :color="snackbar.color"
    :timeout="5000"
    multi-line
    :persistent="true"
    class="snakbar-position"
  >
    <div class="snakbar-container">
      <span>{{ t(snackbar.message) }}</span>
      <v-btn icon @click="hideSnackbar" size="x-small">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useLocale } from "vuetify";

const { t } = useLocale();
const store = useStore();

const snackbar = computed(() => store.getters.snackbar);

function hideSnackbar() {
  store.commit("hideSnackbar");
}
</script>

<style scoped>
.snakbar-position {
  display: flex;
  align-items: end;
  margin-bottom: 150px;
}
.snakbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
