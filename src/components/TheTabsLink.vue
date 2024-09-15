<template>
  <v-tabs bg-color="white" v-model="state.tab">
    <router-link
      v-for="item in items"
      :key="item.value"
      :to="item.path"
      class="custom-router-link"
    >
      <v-tab :value="item.value">
        {{ t(`${item.name}`) }}
      </v-tab>
    </router-link>
  </v-tabs>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useLocale } from "vuetify";
import { useRoute } from "vue-router";
const { t } = useLocale();
const items = [
  {
    value: "task",
    path: "/",
    name: "$vuetify.header.tabs.task",
  },
  {
    value: "map",
    path: "/map",
    name: "$vuetify.header.tabs.map",
  },
];
const state = reactive({
  tab: items.find((item) => item.path === useRoute().path)?.value ?? "task",
});
</script>

<style scoped>
.custom-router-link {
  text-decoration: none;
  color: inherit;
}
</style>
