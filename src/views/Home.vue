<template>
  <div>
    <v-overlay :value="loading" :absolute="true" :z-index="7">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container>
      <!--  -->
      <h2 class="text-white">Топы по типу "Полная оклейка"</h2>
      <div class="cards-statistics my-5">
        <v-card-statistic
          title="Топ-3 за неделю"
          subtitle="Полная оклейка (легковые)"
          :data="getFullBrandingTop3"
          :width="300"
        ></v-card-statistic>
        <v-card-statistic
          title="Анти-топ-3 за неделю"
          subtitle="Полная оклейка (легковые)"
          :data="getFullBrandingAntiTop3"
          :width="300"
        ></v-card-statistic>
        <v-card-statistic
          title="Топ-3 за месяц"
          subtitle="по городам"
          :data="getMonthBrandingTop3"
          :width="300"
        ></v-card-statistic>
        <v-card-statistic
          title="Анти-топ-3 за месяц"
          subtitle="по городам"
          :data="getMonthBrandingAntiTop3"
          :width="300"
        ></v-card-statistic>
      </div>
      <!--  -->
      <h2 class="text-white mb-5">Количество брендированных авто в странах</h2>
      <v-card class="card-statistic">
        <v-carousel hide-delimiters class="carousel-wrapper">
          <v-carousel-item>
            <v-card-title>Полная оклейка</v-card-title>
            <v-doughnut
              :height="400"
              class="mb-5"
              v-if="!loading"
              type="fullBrand"
            ></v-doughnut>
          </v-carousel-item>

          <v-carousel-item>
            <v-card-title>Наклейка на заднем стекле</v-card-title>
            <v-doughnut
              class="mb-5"
              :height="400"
              v-if="!loading"
              type="RearWindowSticker"
            ></v-doughnut>
          </v-carousel-item>

          <v-carousel-item>
            <v-card-title>Полная оклейка (грузовые)</v-card-title>
            <v-doughnut
              class="mb-5"
              :height="400"
              v-if="!loading"
              type="cargoFullBrand"
            ></v-doughnut>
          </v-carousel-item>

          <v-carousel-item>
            <v-card-title>Реклама на кузове</v-card-title>
            <v-doughnut
              class="mb-5"
              :height="400"
              v-if="!loading"
              type="cargoBodyBrand"
            ></v-doughnut>
          </v-carousel-item>

          <v-carousel-item>
            <v-card-title>Реклама на кабине</v-card-title>
            <v-doughnut
              :height="400"
              v-if="!loading"
              type="cargoCabinBrand"
            ></v-doughnut>
          </v-carousel-item>
        </v-carousel>
      </v-card>

      <h2 class="text-white my-5">Динамика брендирования</h2>
      <v-carousel hide-delimiters class="carousel-wrapper mb-5" :height="600">
        <v-carousel-item v-for="type of getTypeBranding" :key="type">
          <v-card class="py-5">
            <v-card-title>{{ typeBranding[type] }}</v-card-title>
            <v-line
              :height="400"
              class="card-dynamics"
              type="Полная оклейка"
              :chartData="getFormatedDataForLine(getTotalCarsByDate(type))"
              v-if="!loading"
            ></v-line>
          </v-card>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </div>
</template>

<script>
import vDoughnut from "@/components/charts/vDoughnut.vue";
import vLine from "@/components/charts/vLine.vue";
import vCardStatistic from "@/components/main/vCardStatistic.vue";
import lineChartsDataMixin from "@/mixins/lineChartData";

import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: { vDoughnut, vCardStatistic, vLine },
  mixins: [lineChartsDataMixin],
  data: () => ({
    loading: true,
    typeBranding: {
      fullBrand: "Полная оклейка (легковые)",
      RearWindowSticker: "Реклама на заднем стекле",
      cargoFullBrand: "Полная оклейка (грузовые)",
      cargoBodyBrand: " Реклама на кузове (грузовые)",
      cargoCabinBrand: "Реклама на кабине (грузовые)",
    },
    // getTotalCarsByDate: null,
  }),

  computed: {
    ...mapGetters([
      "getTypeBranding",
      "getTopBrandingDataByCity",
      "getMonthTopBrandingDataByCity",
      "getTotalCarsByDate",
    ]),
    getFullBrandingTop3() {
      return this.getTopBrandingDataByCity("fullBrand").slice(0, 3);
    },
    getFullBrandingAntiTop3() {
      return this.getTopBrandingDataByCity("fullBrand").slice(-3).reverse();
    },
    getMonthBrandingTop3() {
      return this.getMonthTopBrandingDataByCity("fullBrand").slice(0, 3);
    },
    getMonthBrandingAntiTop3() {
      return this.getMonthTopBrandingDataByCity("fullBrand")
        .slice(-3)
        .reverse();
    },
  },

  async mounted() {
    this.loading = true;

    await this.$store.dispatch("getDataOfBrandingCars", "");
    await this.$store.dispatch("getCarsByAllCity", "fullBrand");
    await this.$store.dispatch("getCarsByAllCity", "RearWindowSticker");

    await this.$store.dispatch("getLastDataByCountry", "fullBrand");
    await this.$store.dispatch("getLastDataByCountry", "RearWindowSticker");
    await this.$store.dispatch("getLastDataByCountry", "cargoFullBrand");
    await this.$store.dispatch("getLastDataByCountry", "cargoCabinBrand");
    await this.$store.dispatch("getLastDataByCountry", "cargoBodyBrand");
    this.loading = false;
  },
};
</script>

<style>
.container {
  background: #1e1e1e;
}
.carousel-wrapper {
  /* background: #f5f5f5; */
  padding: 2rem;
  border-radius: 10px;
}
.text-white {
  color: #fff;
}
.cards-statistics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
.card-dynamics,
.card-statistic {
  padding: 2rem;
}
</style>