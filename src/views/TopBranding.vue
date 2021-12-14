<template>
  <div>
    <v-overlay :value="loading" :absolute="true" :z-index="7">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container v-if="!loading">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="typesBranding"
          label="Выбери тип оклейки"
          solo
          v-model="type"
        ></v-select>
      </v-col>
      <section class="top__wrapper">
        <v-card-statistic
          title="Топ за неделю"
          :subtitle="typeBranding[type]"
          :data="getBrandingTop"
        ></v-card-statistic>
        <v-card-statistic
          title="Анти-Топ за неделю"
          :subtitle="typeBranding[type]"
          :data="getBrandingAntiTop"
        ></v-card-statistic>
      </section>
    </v-container>
  </div>
</template>

<script>
//imports
import vCardStatistic from "@/components/main/vCardStatistic.vue";

import { mapGetters } from "vuex";

export default {
  name: "TopBranding",
  components: { vCardStatistic },
  data: () => ({
    loading: true,
    type: "fullBrand",
    typesBranding: [
      { text: "Полная оклейка (легковые)", value: "fullBrand" },
      { text: "Реклама на заднем стекле", value: "RearWindowSticker" },
      { text: "Полная оклейка (грузовые)", value: "cargoFullBrand" },
      { text: "Реклама на кузове (грузовые)", value: "cargoBodyBrand" },
      { text: "Реклама на кабине (грузовые)", value: "cargoCabinBrand" },
    ],
    typeBranding: {
      fullBrand: "Полная оклейка (легковые)",
      RearWindowSticker: "Реклама на заднем стекле",
      cargoFullBrand: "Полная оклейка (грузовые)",
      cargoBodyBrand: "Реклама на кузове (грузовые)",
      cargoCabinBrand: "Реклама на кабине (грузовые)",
    },
  }),
  computed: {
    ...mapGetters([
      "getTopBrandingDataByCity",
      "getMonthTopBrandingDataByCity",
    ]),
    getBrandingTop() {
      return this.getTopBrandingDataByCity(this.type).filter(
        (item) => item.dinamics > 0
      );
    },
    getBrandingAntiTop() {
      return this.getTopBrandingDataByCity(this.type)
        .filter((item) => item.dinamics < 0)
        .reverse();
    },
  },
  async mounted() {
    this.loading = true;
    await this.$store.dispatch("getDataOfBrandingCars", "");
    Object.keys(this.typeBranding).forEach(async (key) => {
      await this.$store.dispatch("getCarsByAllCity", key);
    });
    // await this.$store.dispatch("getCarsByAllCity", "fullBrand");
    this.loading = false;
  },
};
</script>

<style scoped>
.top__wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
}
</style>
