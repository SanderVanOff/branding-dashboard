<script>
import { Doughnut } from "vue-chartjs";
import { mapGetters } from "vuex";

export default {
  props: ["type"],

  data: () => ({}),
  computed: {
    ...mapGetters(["getDateForDoughnutCharts"]),
    getDataFromChart() {
      return this.getDateForDoughnutCharts(this.type);
    },
  },
  extends: Doughnut,

  mounted() {

    this.renderChart(
      {
        labels: this.getDataFromChart.labels,
        datasets: this.getDataFromChart.datasets,
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        legend: { position: "right" },
      }
    );
  },
};
</script>

<style>
</style>