<template>
  <v-app>
    <base-header />
    <progress-circular />
    <notification-about-work-algorithm />
    <notification-user />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import BaseHeader from "@/components/BaseHeader.vue";
import ProgressCircular from "@/components/TheProgressCircular.vue";
import NotificationAboutWorkAlgorithm from "@/components/TheNotificationAboutWorkAlgorithm.vue";
import NotificationUser from "@/components/TheNotificationUser.vue";
</script>
