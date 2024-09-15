<template>
  <v-card class="mx-auto" max-width="300" :style="elementStyle">
    <v-list lines="one">
      <v-list-item
        v-for="item in items"
        :class="{ 'selected-item': item.value === current }"
        :key="item.value"
        :title="t(`${item.name}`)"
        @click="switchLocale(item.value)"
      >
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useLocale } from "vuetify";
const { current, t } = useLocale();

const items = [
  {
    value: "ru",
    name: "$vuetify.header.dropdown.ru",
  },
  {
    value: "srCyrl",
    name: "$vuetify.header.dropdown.srCyrl",
  },
  {
    value: "en",
    name: "$vuetify.header.dropdown.en",
  },
];

const elementStyle = computed(() => {
  return `position: fixed; top: 65px; right: 0px; z-index: 10000; min-width: 140px`;
});

function switchLocale(lang: string) {
  current.value = lang;
}
</script>

<style scoped>
.selected-item {
  background-color: #e0e0e0;
  font-weight: bold;
}
</style>
