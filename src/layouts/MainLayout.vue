<template>
  <div class="main-layout d-flex">
    <app-drawer></app-drawer>
    <v-main class="main__wrap">
      <app-header></app-header>
      <router-view></router-view>
    </v-main>
  </div>
</template>

<script>
//components
import appDrawer from "@/components/base/app-drawer.vue";
import appHeader from "@/components/base/app-header.vue";

export default {
  name: "MainLayout",
  components: {
    appDrawer,
    appHeader,
  },
};
</script>

<style scoped>
.main-layout {
  height: 100vh;
}
.main__wrap {
  background: #1e1e1e;
}
</style>