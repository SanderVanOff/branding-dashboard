<template>
  <v-app-bar dense dark color="#363636">
    <v-spacer></v-spacer>
    <v-btn icon @click="$router.push({name: 'Profile'})">
      <v-avatar color="primary" size="30">
        <v-icon dark> mdi-account-circle </v-icon>
      </v-avatar>
    </v-btn>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" link>
          <v-list-item-title @click="action(item.action)">
            {{ item.title }}</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        title: "Настройки",
      },
      {
        title: "Выход",
        action: "logout",
      },
    ],
  }),
  methods: {
    action(handler) {
      switch (handler) {
        case "logout":
          this.logout();
          break;
        default:
          break;
      }
    },
    async logout() {
      try {
        await this.$store.dispatch("logout");
        this.$router.push("/login");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>