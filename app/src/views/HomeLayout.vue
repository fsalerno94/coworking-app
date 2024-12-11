<script setup lang="ts">
import { RouterView } from "vue-router";
import BottomMenu from "../components/menu/BottomMenu.vue";
</script>

<template>
  <div class="px-5 h-full">
    <!-- Inserire componente per poter vedere dinamicamente le pagine -->
    <div class="pb-20">
      <RouterView></RouterView>
    </div>
    <!-- <RouterView></RouterView> -->
    <BottomMenu />
  </div>
</template>
