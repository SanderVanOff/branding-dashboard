<template>
  <v-card class="p-1 mb-5">
    <v-card-title>{{ typeBranding[index] }}</v-card-title>
    <v-text-field
      style="width: 300px"
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
      :headers="columns"
      :items="dataBrand"
      :items-per-page="5"
      class="elevation-1"
      @dblclick:row="onClickRow"
    ></v-data-table>
    <!-- <v-card-text v-else> Данных пока нет </v-card-text> -->
  </v-card>
</template>

<script>
import { VeLocale } from "vue-easytable";
import ruRU from "@/plugins/easy-table.js";
VeLocale.use(ruRU);

export default {
  props: ["dataBrand", "columns", "country", "index"],
  data: () => ({
    typeBranding: {
      fullBrand: "Полная оклейка (легковые)",
      RearWindowSticker: "Реклама на заднем стекле",
      cargoFullBrand: "Полная оклейка (грузовые)",
      cargoBodyBrand: " Реклама на кузове (грузовые)",
      cargoCabinBrand: "Реклама на кабине (грузовые)",
    },
    search: "",

    eventCustomOption: {},
  }),
  computed: {},
  methods: {
    onClickRow(_, { item }) {
      this.$router.push({ name: "BrandingByCity", params: { id: item.id } });
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