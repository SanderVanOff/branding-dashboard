<template>
  <v-card class="p-1 mb-5">
    <v-card-title>Список пользователей</v-card-title>
    <v-text-field
      dense
      class="mb-3"
      outlined
      v-model="search"
      append-icon="mdi-magnify"
      label="Поиск"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      :headers-length="50"
      :calculate-widths="true"
      :fixed-header="true"
      dense
      :search="search"
      :headers="headers"
      :items="users"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" scrollable transition="dialog-bottom-transition">
      <v-card-edit-access
        @close-dialog="dialog = false"
        @update-user-access="updateUserAccess($event)"
        :isLoading="loading"
        :currentUser="currentUser"
      >
      </v-card-edit-access>
    </v-dialog>
    <!-- <v-card-text v-else> Данных пока нет </v-card-text> -->
  </v-card>
</template>

<script>
import vCardEditAccess from "@/components/users/vCardEditAccess.vue";
import { mapActions } from "vuex";
//import plugins
import { VeLocale } from "vue-easytable";
import ruRU from "@/plugins/easy-table.js";
VeLocale.use(ruRU);

export default {
  props: ["users"],
  components: {
    vCardEditAccess,
  },
  data: () => ({
    loading: true,
    currentUser: null,
    dialog: false,
    search: "",
    eventCustomOption: {},
    headers: [
      {
        text: "ID",
        align: "start",
        value: "uid",
      },
      {
        text: "Логин",
        align: "start",
        value: "login",
        class: "fixed-column",
        cellClass: "fixed-column",
      },
      {
        text: "Роль",
        align: "start",
        value: "role",
      },
      {
        text: "Доступ",
        align: "start",
        value: "access.length",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  computed: {},
  methods: {
    ...mapActions(["updateUserData"]),
    editItem(item) {
      this.dialog = true;
      this.currentUser = item;
    },
    async updateUserAccess(updatedUserData) {
      try {
        this.loading = true;
        await this.updateUserData(updatedUserData)
        this.loading = false;
        await this.$nextTick();
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss">
td {
  text-align: center;
}
.p-1 {
  padding: 1rem;
}
td {
  border-right: thin solid #e1e1e1;
}
tr {
  position: relative;
  cursor: pointer;
  &:hover .fixed-column {
    background: inherit;
    cursor: pointer;
  }
}
.fixed-column {
  position: sticky !important;
  left: 0;
  z-index: 3 !important;
  width: 100%;
  background: #fff;
  border-right: 1px solid #e1e1e1;
}
</style>