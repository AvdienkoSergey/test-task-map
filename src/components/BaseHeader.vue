<template>
  <header-mobile
    v-if="isMobile"
    :title="state.title"
    @toogleDrordown="toogleDrordown"
  ></header-mobile>
  <header-desktop
    v-if="isDesktop"
    :title="state.title"
    @toogleDrordown="toogleDrordown"
  ></header-desktop>
  <dropdown-lang-select v-if="state.dropdown.open"></dropdown-lang-select>
</template>

<script setup lang="ts">
import HeaderMobile from "@/components/TheHeaderMobile.vue";
import HeaderDesktop from "@/components/TheHeaderDesktop.vue";
import DropdownLangSelect from "@/components/TheDropdownLangSelect.vue";
import { reactive, onMounted, onUnmounted, computed } from "vue";
import { viewPlacemarks$ } from "@/events/map";
import { Observer } from "@/events/_observer";
import { useDisplay } from "vuetify";

const { smAndDown, mdAndUp } = useDisplay();

const state = reactive({
  title: "$vuetify.header.title",
  dropdown: {
    open: false,
  },
});

const isMobile = computed(() => smAndDown.value);
const isDesktop = computed(() => mdAndUp.value);

function toogleDrordown() {
  state.dropdown.open = !state.dropdown.open;
}

function closeDrordown() {
  state.dropdown.open = false;
}

onMounted(() => {
  viewPlacemarks$.subscribe(new Observer(closeDrordown));
});

onUnmounted(() => {
  viewPlacemarks$.unsubscribe(new Observer(closeDrordown));
});
</script>

<style scoped></style>
