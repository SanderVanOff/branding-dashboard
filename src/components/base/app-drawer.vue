<template>
  <v-navigation-drawer permanent v-model="drawer" dark app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          <v-img
            src="https://taximaxim.com/images/logo_nr.svg"
            max-height="50"
            max-width="100"
          ></v-img>
        </v-list-item-title>
        <v-list-item-title> branding cars </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <!--  -->
    <v-list dense>
      <div v-for="item of accessibleMenu" :key="item.title">
        <router-link :to="{ name: item.link }" v-if="!item.child">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </router-link>
        <template v-else>
          <v-list-group
            v-model="selectedItem"
            :prepend-icon="item.icon"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </template>
            <router-link
              :to="{ name: child.link }"
              v-for="child of item.child"
              :key="child.title"
            >
              <v-list-item link>
                <v-list-item-icon>
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-title>{{ child.title }}</v-list-item-title>
              </v-list-item>
            </router-link>
          </v-list-group>
        </template>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "app-drawer",
  data: () => ({
    drawer: true,
    selectedItem: 1,
    menu: [
      {
        title: "Главная",
        icon: "mdi-view-dashboard",
        link: "Home",
        access: "user",
      },
      {
        title: "Брендирование",
        icon: "mdi-car-door",
        link: "Branding",
        access: "user",
        child: [
          {
            title: "По странам",
            icon: "mdi-checkbox-blank-circle",
            link: "BrandingByCountry",
            access: "user",
          },
          {
            title: "Топы",
            icon: "mdi-checkbox-blank-circle",
            link: "TopBranding",
            access: "user",
          },
        ],
      },
      {
        title: "Доступ",
        icon: "mdi-lock-open-outline",
        link: "AccessSettings",
        access: "admin",
      },
      {
        title: "О программе",
        icon: "mdi-help-box",
        link: "About",
        access: "user",
      },
    ],
  }),
  computed: {
    ...mapGetters(["currentUser"]),
    accessibleMenu() {
      return this.menu.filter((item) => {
        if (this.currentUser.role !== "admin") {
          return item.access !== "admin";
        }
        return item;
      });
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.v-application .primary--text {
  color: #fff !important;
}
.router-link-exact-active .v-list-item__title {
  color: #1976d2;
}
.router-link-exact-active .v-icon {
  color: #1976d2;
}
</style>