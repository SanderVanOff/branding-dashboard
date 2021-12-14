<template>
  <v-card elevation="2" :width="width">
    <v-skeleton-loader
      type="card"
      :max-width="width"
      v-if="!data.length"
    ></v-skeleton-loader>
    <template v-else>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
      <v-card-text>
        <div class="mb-2">
          <span class="pr-5">Начало:</span>
          <v-chip color="green" outlined small>{{
            new Date(data[0].startDate).toLocaleString("ru", options)
          }}</v-chip>
        </div>
        <div>
          <span class="pr-5">Конец:</span>
          <v-chip color="green" outlined small>{{
            new Date(data[0].endDate).toLocaleString("ru", options)
          }}</v-chip>
        </div>
      </v-card-text>
      <v-list dense>
        <v-list-item v-for="(item, i) in data" :key="i">
          <v-list-item-icon>
            <img class="flag" :src="`flags/1x1/${item.flag}.svg`" alt="" />
          </v-list-item-icon>
          <div class="list-item-text d-flex justify-space-between align-center">
            <p v-text="item.city"></p>
            <p class="text-h5 text--secondary">{{ item.dinamics }}</p>
          </div>
        </v-list-item>
      </v-list>
    </template>
  </v-card>
</template>

<script>
export default {
  name: "vCardStatistic",
  props: ["title", "subtitle", "data", "width"],
  data: () => ({
    options: {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  }),
};
</script>

<style>
.flag {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid lightgray;
}
.list-item-text {
  width: 70%;
}
</style>