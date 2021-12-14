<template>
  <div class="profile">
    <v-overlay :value="loading" :absolute="true" :z-index="7">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container>
      <v-row dense>
        <v-col cols="6">
          <v-card color="#385F73" dark>
            <v-card-title class="text-h5"> О пользователе </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p class="text-subtitle-1">
                <span>ID: </span> {{ currentUser.uid }}
              </p>
              <p class="text-subtitle-1">
                <span>Логин: </span> {{ currentUser.login }}
              </p>
              <p class="text-subtitle-1">
                <span>email: </span> {{ currentUser.email }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!--  -->
      <v-row dense>
        <v-col cols="6">
          <v-card color="fff" v-if="listAccess.length">
            <v-card-title class="text-h5">
              Доступные подразделения
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-list dense v-for="(countryData, i) in listAccess" :key="i">
                <v-list-item-title
                  class="mb-5"
                  v-if="countryData[0]"
                  v-text="countryData[0].country"
                ></v-list-item-title>
                <v-list-item v-for="item of countryData" :key="item.id">
                  <v-list-item-icon>
                    <img
                      class="flag"
                      :src="`flags/1x1/${item.flag}.svg`"
                      alt=""
                    />
                  </v-list-item-icon>
                  <div
                    class="list-item-text d-flex justify-space-between align-center"
                  >
                    <!-- <p v-text="item.country"></p> -->
                    <p class="my-0 text--secondary">{{ item.city }}</p>
                  </div>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Profile",
  data: () => ({
    loading: true,
    listAccess: {},
  }),

  computed: {
    ...mapGetters(["currentUser", "getCountries"]),
  },
  mounted() {
    this.loading = true;
    if (this.currentUser) {
      if (this.currentUser?.access.length) {
        this.currentUser.access.forEach((item) => {
          const accessItem = {
            flag: this.getCountries[item.country],
            ...item,
          };
          this.listAccess?.[item.country]
            ? this.listAccess[item.country].push(accessItem)
            : (this.listAccess[item.country] = []);
        });
        this.listAccess = Object.values(this.listAccess).map((arr) => {
          return arr.sort((a, b) => a.city > b.city);
        });
      }
    }
    this.loading = false;
  },
};
</script>

<style>
.flag {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid lightgray;
}
</style>