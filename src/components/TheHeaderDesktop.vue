<template>
  <v-app-bar
    :elevation="2"
    :extended="true"
    color="teal-darken-4"
    image="https://picsum.photos/1920/1080?random"
  >
    <v-app-bar-title> {{ t(`${title}`) }} </v-app-bar-title>

    <v-btn icon @click="toogleDrordown">
      <v-icon>mdi-web</v-icon>
    </v-btn>

    <template v-slot:extension v-if="true">
      <tabs-link></tabs-link>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import TabsLink from "@/components/TheTabsLink.vue";
import { defineProps, defineEmits } from "vue";
import { useLocale } from "vuetify";
const { t } = useLocale();
const emits = defineEmits(["toogleDrordown"]);
defineProps({
  title: {
    type: String,
    required: true,
  },
});
function toogleDrordown() {
  emits("toogleDrordown");
}
</script>
