<template>
  <v-app>
    <component :is="`${layout}-layout`"></component>
    <div v-if="notify.length" class="alerts">
      <v-alert v-for="n of notify" :key="n.id" :type="n.type">
        {{ getNotifyMessage(n.message) }}
      </v-alert>
    </div>
  </v-app>
</template>

<script>
import notifyMessages from "@/utils/notifyMessages";
import MainLayout from "@/layouts/MainLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";

export default {
  name: "App",
  components: {
    MainLayout,
    EmptyLayout,
  },
  computed: {
    layout() {
      return this.$route.meta.layout || "empty";
    },
    notify() {
      return this.$store.getters.notify;
    },
  },
  methods: {
    getNotifyMessage(code) {
      return notifyMessages[code];
    },
  },
};
</script>

<style>
body {
  background: #1e1e1e;
}
.text-white {
  color: #fff;
}
.card-dynamics,
.card-statistic {
  padding: 2rem;
}
.alerts {
  position: fixed;
  top: 0;
  right: 0;
}
</style>
