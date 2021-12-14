<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
  mixins: [reactiveProp],
  props: ["chartData"],

  extends: Line,
  watch: {
    chartData() {
      this.$data._chart.update();
    },
  },

  mounted() {
    this.renderChart(this.chartData, {
      responsive: true,
      maintainAspectRatio: false,
      legend: { position: "bottom" },
    });
  },
};
</script>

<style>
</style>