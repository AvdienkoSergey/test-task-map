<template>
  <header-mobile
    :title="state.title"
    @toogleDrordown="toogleDrordown"
  ></header-mobile>
  <dropdown-lang-select v-if="state.dropdown.open"></dropdown-lang-select>
</template>

<script setup lang="ts">
import HeaderMobile from "@/components/TheHeaderMobile.vue";
import DropdownLangSelect from "@/components/TheDropdownLangSelect.vue";
import { reactive } from "vue";
const state = reactive({
  title: "$vuetify.header.title",
  dropdown: {
    open: false,
  },
});
function toogleDrordown() {
  state.dropdown.open = !state.dropdown.open;
  console.log("state.dropdown.open", state.dropdown.open);
}
</script>

<style scoped></style>
