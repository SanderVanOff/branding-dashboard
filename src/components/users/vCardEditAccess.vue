<template>
  <v-card>
    <v-card-title
      >Редактировать доступ для {{ currentUser.login }}</v-card-title
    >
    <v-divider></v-divider>
    <v-card-text :class="{ 'text-center py-10': loading }">
      <template v-if="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </template>
      <v-row v-else>
        <!-- first column -->
        <v-col cols="6">
          <v-select
            v-model="currentCountry"
            class="mt-6"
            :items="countries"
            label="Выберите страну"
            solo
          ></v-select>
          <v-divider></v-divider>
          <template v-if="currentCountry">
            <v-btn
              class="my-6"
              small
              color="success"
              dark
              @click="addedAllCitiesByCountry"
            >
              Добавить все
            </v-btn>
            <v-checkbox
              v-for="item of getCitiesByCountry"
              :key="item.id"
              v-model="selected"
              :label="item.city"
              :value="item"
            ></v-checkbox>
          </template>
        </v-col>
        <!-- second column -->
        <v-col cols="6">
          <template v-if="selected.length">
            <div>
              <v-btn class="my-6" small color="error" dark @click="removeAll">
                Удалить все
              </v-btn>
            </div>
            <v-chip
              v-for="item of selected"
              :key="item.id"
              class="ma-2"
              close
              color="green"
              outlined
              @click:close="removeItem(item.id)"
            >
              {{ item.city }}
            </v-chip>
          </template>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="blue darken-1" text @click="closeDialog"> Отмена </v-btn>
      <v-btn color="blue darken-1" text @click="updateUserAccess">
        Сохранить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "cardEditAccess",
  props: ["currentUser", "isLoading"],
  data: () => ({
    loading: true,
    disabled: true,
    countries: [],
    currentCountry: null,
    cityByCountry: null,
    selected: [],
  }),
  computed: {
    ...mapGetters(["getCountries"]),
    getCitiesByCountry() {
      return this.cityByCountry[this.currentCountry];
    },
  },
  methods: {
    ...mapActions(["getAllCityByCountries"]),
    removeItem(id) {
      this.selected = this.selected.filter((item) => item.id !== id);
    },
    removeAll() {
      this.selected = [];
    },
    addedAllCitiesByCountry() {
      this.getCitiesByCountry.forEach((city) => {
        if (!this.selected.some((item) => item.id === city.id)) {
          this.selected.push(city);
        }
      });
    },
    closeDialog() {
      this.$emit("close-dialog");
      this.selected = [];
      this.currentCountry = null;
    },
    updateUserAccess() {
      const updatedUserData = {
        ...this.currentUser,
        access: this.selected,
      };
      this.$emit("update-user-access", updatedUserData);
      this.closeDialog();
    },
  },
  async mounted() {
    this.loading = true;
    this.cityByCountry = await this.getAllCityByCountries("fullBrand");
    Object.keys(this.getCountries).forEach((country) => {
      this.countries.push(country);
    });
    this.selected = this.currentUser.access;
    this.loading = false;
  },
  watch: {
    currentUser(currentUser) {
      this.selected = currentUser.access;
    },
    isLoading(value) {
      this.loading = value;
    },
  },
};
</script>

<style>
</style>