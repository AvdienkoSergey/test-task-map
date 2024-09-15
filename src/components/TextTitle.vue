<template>
  <h1 v-if="titleType === 1">{{ `${t(titleText)}` }}</h1>
  <h2 v-if="titleType === 2">{{ `${t(titleText)}` }}</h2>
  <h3 v-if="titleType === 3">{{ `${t(titleText)}` }}</h3>
  <h4 v-if="titleType === 4">{{ `${t(titleText)}` }}</h4>
  <h5 v-if="titleType === 5">{{ `${t(titleText)}` }}</h5>
  <h6 v-if="titleType === 6">{{ `${t(titleText)}` }}</h6>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useLocale } from "vuetify";
const { t } = useLocale();
defineProps({
  titleType: {
    type: Number,
    require: true,
  },
  titleText: {
    type: String,
    require: true,
    default: "",
  },
});
</script>

<style scoped></style>
