<template>
  <v-app-bar :elevation="2" :extended="state.navigation">
    <v-app-bar-title> {{ t(`${title}`) }} </v-app-bar-title>

    <v-btn icon @click="toogleDrordown">
      <v-icon>mdi-web</v-icon>
    </v-btn>

    <v-btn icon @click="toggleNavigation">
      <v-icon>mdi-dots-vertical-circle-outline</v-icon>
    </v-btn>

    <template v-slot:extension v-if="state.navigation">
      <tabs-link></tabs-link>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import TabsLink from "@/components/TheTabsLink.vue";
import { defineProps, defineEmits, reactive } from "vue";
import { useLocale } from "vuetify";
const { t } = useLocale();
defineProps({
  title: {
    type: String,
    required: true,
  },
});
const emits = defineEmits(["toogleDrordown"]);
const state = reactive({
  navigation: false,
});
function toggleNavigation() {
  state.navigation = !state.navigation;
}
function toogleDrordown() {
  emits("toogleDrordown");
}
</script>
