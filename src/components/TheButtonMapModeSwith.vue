<template>
  <v-btn
    fab
    icon="mdi-plus"
    color="teal"
    size="x-large"
    class="v-btn--bottom-right"
    @click="handleClick"
  >
  </v-btn>
</template>

<script lang="ts" setup>
function handleClick() {
  // Действие при нажатии на кнопку
  console.log("FAB clicked");
}
</script>

<style scoped>
.v-btn--bottom-right {
  position: fixed;
  bottom: 48px;
  right: 32px;
  z-index: 1000;
}
</style>
