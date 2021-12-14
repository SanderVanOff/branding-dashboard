export default {
  data: () => ({
    labels: [
      "январь",
      "февраль",
      "март",
      "апрель",
      "май",
      "июнь",
      "июль",
      "август",
      "сентябрь",
      "октябрь",
      "ноябрь",
      "декабрь"
    ]
  }),
  methods: {
    getFormatedDataForLine(computedProps, type) {
      let chartData = null;
      type ? (chartData = computedProps[type]) : (chartData = computedProps);

      const datasets = [
        {
          label: "2020",
          data: [],
          // backgroundColor: [],
          borderColor: "IndianRed",
          fill: false
        },
        {
          label: "2021",
          data: [],
          // backgroundColor: [],
          borderColor: "SteelBlue",
          fill: false
        }
      ];

      if (chartData !== undefined) {
        Object.keys(chartData).forEach((key) => {
          if (
            new Date(key).getFullYear() === 2020 &&
            new Date(key).getDate() === 1
          ) {
            datasets[0].data.push(chartData[key]);
          } else if (
            new Date(key).getFullYear() === 2021 &&
            new Date(key).getDate() === 1
          ) {
            datasets[1].data.push(chartData[key]);
          }
        });
      }

      return {
        labels: this.labels,
        datasets: datasets
      };
    }
  }
};
