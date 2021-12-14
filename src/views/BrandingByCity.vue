<template>
  <div>
    <v-overlay :value="loading" :absolute="true" :z-index="7">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container>
      <div class="brand-city" v-if="!loading && getBrandingDataByIdCity.length">
        <v-btn
          text
          color="success"
          dark
          @click="$router.push({ name: 'BrandingByCountry' })"
        >
          Назад
        </v-btn>
        <h2 class="text-white mb-5">
          Информация по брендированию в
          {{ getBrandingDataByIdCity[0].city }}
        </h2>
        <v-carousel hide-delimiters class="carousel-wrapper mb-5" :height="600">
          <v-carousel-item
            v-for="(type, i) of getBrandingDataByIdCity"
            :key="type.type"
          >
            <v-card class="py-5">
              <v-card-title>{{ type.type }}</v-card-title>
              <v-card class="py-5">
                <v-line
                  :height="400"
                  v-if="!loading"
                  class="card-dynamics"
                  type="Полная оклейка"
                  :chartData="
                    getFormatedDataForLine(getBrandingDataByIdCity[i])
                  "
                ></v-line>
              </v-card>
            </v-card>
          </v-carousel-item>
        </v-carousel>

        <!--  -->
        <v-table-by-city
          class="mt-5"
          :columns="columns"
          :dataBrand="getBrandingDataByIdCity"
        ></v-table-by-city>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vLine from "@/components/charts/vLine.vue";
import vTableByCity from "@/components/branding/vTableByCity.vue";
import { brandingColumnsName } from "@/utils/translation.js";
import lineChartsDataMixin from "@/mixins/lineChartData";

export default {
  name: "BrandingByCity",
  components: { vLine, vTableByCity },
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
    options: {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    },
    noDateTitle: ["id", "type", "id_type", "country", "city"],
    brandData: {},
    columns: [],
  }),
  computed: {
    ...mapGetters(["getTypeBranding", "brandingData", "getDataByCity"]),
    getBrandingDataByIdCity() {
      return this.getDataByCity(this.$route.params.id) || [];
    },
  },
  methods: {
    ...mapActions(["getCarsByAllCity", "getDataOfBrandingCars"]),
  },
  async created() {
    this.loading = true;
    await this.getDataOfBrandingCars("");
    this.getBrandingDataByIdCity[0].fieldsKeys.forEach((field) => {
      this.columns.push({
        text: !this.noDateTitle.includes(field)
          ? new Date(field).toLocaleString("ru", this.options)
          : brandingColumnsName[field],
        value: field,
        width: "130px",
        align: "center",
        class: field === "type" ? "fixed-column" : "",
        cellClass: field === "type" ? "fixed-column" : "",
      });
    });
    this.loading = false;
  },
};
</script>

<style>
th > .v-icon {
  display: none !important;
}
td {
  border-right: thin solid #e1e1e1;
}
</style>