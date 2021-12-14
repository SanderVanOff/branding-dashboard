<template>
  <v-card class="p-1 mb-5">
    <v-card-title>Показатели по типам оклейки</v-card-title>
    <template v-if="dataBrand.length">
      <v-data-table
        :headers-length="50"
        :calculate-widths="true"
        :fixed-header="true"
        item-key="type"
        dense
        :headers="columns"
        :items="dataBrand"
        class="elevation-1"
        :hide-default-footer="true"
      ></v-data-table>
    </template>
    <v-card-text v-else> Данных пока нет </v-card-text>
  </v-card>
</template>

<script>
import { VeLocale } from "vue-easytable";
import ruRU from "@/plugins/easy-table.js";

VeLocale.use(ruRU);

export default {
  props: ["dataBrand", "columns"],
  data: () => ({
    typeBranding: {
      fullBrand: "Полная оклейка (легковые)",
      RearWindowSticker: "Реклама на заднем стекле",
      cargoFullBrand: "Полная оклейка (грузовые)",
      cargoBodyBrand: " Реклама на кузове (грузовые)",
      cargoCabinBrand: "Реклама на кабине (грузовые)",
    },
  }),
  computed: {},
  methods: {},
};
</script>

<style lang="scss">
th,
td {
  text-align: center;
}
th i {
  display: none;
}
.p-1 {
  padding: 1rem;
}

tr {
  position: relative;

  &:hover .fixed-column {
    background: inherit;
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