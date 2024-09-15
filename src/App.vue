<template>
  <v-app>
    <base-header />
    <progress-circular />
    <notification-about-work-algorithm />
    <notification-user />
    <!-- <v-btn @click="toggleTheme" style="margin-top: 200px">
      <base-icon :name="'menu'" />
      toggle theme
    </v-btn> -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useTheme, useDisplay } from "vuetify";
// import BaseIcon from "@/components/BaseIcon.vue";
import BaseHeader from "@/components/BaseHeader.vue";
import ProgressCircular from "@/components/TheProgressCircular.vue";
import NotificationAboutWorkAlgorithm from "@/components/TheNotificationAboutWorkAlgorithm.vue";
import NotificationUser from "@/components/TheNotificationUser.vue";

// const theme = useTheme();
const { mobile } = useDisplay();

// function toggleTheme() {
//   theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
// }

onMounted(() => {
  console.log(mobile.value); // false
});
</script>
