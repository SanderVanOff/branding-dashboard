<template>
  <div>
    <v-overlay :value="loading" :absolute="true" :z-index="7">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container v-if="!loading && availableCountries.length">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="countries"
          label="Выбери страну"
          solo
          v-model="country"
        ></v-select>
      </v-col>
      <!--  -->
      <v-carousel
        hide-delimiters
        class="carousel-wrapper mb-5"
        :height="600"
        v-if="availableCountries.includes(country)"
      >
        <v-carousel-item v-for="type of getTypeBranding" :key="type">
          <v-card class="py-5">
            <v-card-title>{{ typeBranding[type] }}</v-card-title>
            <v-line
              :height="400"
              v-if="!loading"
              class="card-dynamics"
              type="Полная оклейка"
              :chartData="getFormatedDataForLine(getCountryDataForLine, type)"
            ></v-line>
          </v-card>
        </v-carousel-item>
      </v-carousel>

      <v-table-by-country
        v-for="(item, i) of getFilterDataByCountry"
        :key="i"
        :dataBrand="item"
        :columns="columns"
        :country="country"
        :index="i"
      >
      </v-table-by-country>

      <!--  -->
    </v-container>
    <v-container v-else-if="!loading && !availableCountries.length">
      <div class="no-data">Доступных данных нет</div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import vLine from "@/components/charts/vLine.vue";
import vTableByCountry from "@/components/branding/vTableByCountry.vue";
import { brandingColumnsName } from "@/utils/translation.js";
import lineChartsDataMixin from "@/mixins/lineChartData";
export default {
  name: "BrandingByCountry",
  components: {
    vTableByCountry,
    vLine,
  },
  mixins: [lineChartsDataMixin],
  data() {
    return {
      loading: true,

      typeBranding: {
        fullBrand: "Полная оклейка (легковые)",
        RearWindowSticker: "Реклама на заднем стекле",
        cargoFullBrand: "Полная оклейка (грузовые)",
        cargoBodyBrand: " Реклама на кузове (грузовые)",
        cargoCabinBrand: "Реклама на кабине (грузовые)",
      },

      options: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      },

      noDateTitle: ["id", "type", "id_type", "country", "city"],
      countries: [],
      country: localStorage.getItem("country") || null,
      fields: {},
      columns: [],
      searchValue: "",
    };
  },
  computed: {
    ...mapGetters([
      "getCountries",
      "availableCountries",
      "getTypeBranding",
      "getDataByCountry",
      "getDataByCountryByMonths",
    ]),
    getAllCountries() {
      // return Object.keys(this.getCountries);
      return this.availableCountries;
    },
    getFilterDataByCountry() {
      return this.getDataByCountry[this.country];
    },
    getCountryDataForLine() {
      return this.getDataByCountryByMonths(this.country);
    },
  },
  watch: {
    country(value) {
      localStorage.setItem("country", value);
    },
  },

  async mounted() {
    this.loading = true;
    await this.$store.dispatch("getDataOfBrandingCars", "");
    this.countries = await this.getAllCountries;
    if (this.countries.length) {
      const fields = await this.$store.getters["getDataByCountry"][
        this.countries[0]
      ]["fullBrand"][0];
      Object.keys(fields).forEach((field) => {
        this.columns.push({
          text: !this.noDateTitle.includes(field)
            ? new Date(field).toLocaleString("ru", this.options)
            : brandingColumnsName[field],
          value: field,
          align: this.noDateTitle.includes(field) ? "start" : "none",
          class: field === "city" ? "fixed-column" : "",
          cellClass: field === "city" ? "fixed-column" : "",
        });
      });
    }
    this.loading = false;
  },
};
</script>
<style scoped>
.container {
  background: #1e1e1e;
}

.mb-1 {
  margin-bottom: 1rem;
}
.fixed-column {
  position: fixed;
}
.no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(30vh);
  font-size: 2rem;
  color: #fff;
}
</style>