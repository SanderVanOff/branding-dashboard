<template>
  <div class="access-setting">
    <v-overlay :value="loading" :absolute="true" :z-index="7">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-container v-if="!loading">
      <v-table-users-list :users="userList"></v-table-users-list>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vTableUsersList from "@/components/users/vTableUsersList.vue";
export default {
  name: "AccessSetting",
  components: {
    vTableUsersList,
  },
  data: () => ({
    loading: true,
  }),
  computed: {
    ...mapGetters(["userList"]),
  },
  methods: {
    ...mapActions(["getUserList"]),
  },
  async mounted() {
    this.loading = true;
    await this.getUserList();
    this.loading = false;
  },
};
</script>

<style>
</style>