import { typeBrandingName } from "@/utils/translation.js";
const noDateTitle = ["type", "id_type", "country", "city"];

export const getters = {
  brandingData: (s) => s.brandingData,
  brandingDataByType: (s) => (type) => s.brandingData[type],

  //сравнение по неделям
  getTopBrandingDataByCity: (s, getters) => (type) => {
    const data = [];

    if (s.brandingDataByType[type]) {
      s.brandingDataByType[type].forEach((item) => {
        data.push({
          flag: getters.getCountries[item.country],
          city: item.city,
          country: item.country,
          dinamics:
            item.data[item.data.length - 1] - item.data[item.data.length - 2],
          startDate: item.dates[item.dates.length - 2],
          endDate: item.dates[item.dates.length - 1]
        });
      });
      data.sort((a, b) => b.dinamics - a.dinamics);
    }
    return data;
  },
  //сравнение по месяцам
  getMonthTopBrandingDataByCity: (s, getters) => (type) => {
    const data = [];

    if (s.brandingDataByType[type]) {
      s.brandingDataByType[type].forEach((item) => {
        const dateOfMonth = item.dates.map((d) => new Date(d).getDate());
        const lastIndex = dateOfMonth.lastIndexOf(1);
        const prevIndex = dateOfMonth.lastIndexOf(1, lastIndex - 1);
        data.push({
          flag: getters.getCountries[item.country],
          city: item.city,
          country: item.country,
          dinamics: item.data[lastIndex] - item.data[prevIndex],
          startDate: item.dates[prevIndex],
          endDate: item.dates[lastIndex]
        });
      });
      data.sort((a, b) => b.dinamics - a.dinamics);
    }
    return data;
  },
  getlastBrandingDataByCountries: (s) => s.lastBrandingDataByCountries,

  getDateForDoughnutCharts: (s, getters) => (type) => {
    const chartdata = s.lastBrandingDataByCountries[type];
    const labels = [];
    const datasets = [
      {
        label: type,
        data: [],
        backgroundColor: []
      }
    ];
    const colors = getters["getColors"];

    Object.keys(chartdata).forEach((key, i) => {
      if (chartdata[key]) {
        labels.push(key);
        datasets[0].data.push(chartdata[key]);
        datasets[0].backgroundColor.push(colors[i]);
      }
    });

    return { labels, datasets };
  },

  //данные по странам
  getDataByCountry: (s, getters) => {
    const noDateTitle = ["type", "id_type", "country", "city"];
    const availableCities = getters["availableCities"];
    // const countries = Object.keys(getters["getCountries"]);
    const countries = getters["availableCountries"];
    const typeBranding = getters["getTypeBranding"];
    const brandingData = s.brandingData;
    const processedData = {};

    countries.forEach((country) => {
      processedData[country] = {};
      typeBranding.forEach((type) => {
        processedData[country][type] = [];
      });
    });
    if (typeBranding !== undefined) {
      typeBranding.forEach((type) => {
        const dataByType = brandingData[type];
        if (dataByType !== undefined) {
          Object.keys(dataByType).forEach((key) => {
            if (availableCities.includes(key)) {
              const obj = {
                id: key,
                type: dataByType[key].type,
                country: dataByType[key].country,
                city: dataByType[key].city
                // dates: [],
                // data: []
              };
              for (let k in dataByType[key]) {
                if (!noDateTitle.includes(k)) {
                  if (new Date(k).getDate() === 1) {
                    obj[k] = dataByType[key][k];
                  }

                  // obj.dates.push(k);
                  // obj.data.push(dataByType[key][k]);
                }
              }
              processedData[obj.country][obj.type].push({
                ...obj,
                type: typeBrandingName[obj.type]
              });
            }
          });
        }
      });
    }
    return processedData;
  },

  //данные по кокретному городу

  getDataByCity: (s, getters) => (idCity) => {
    const brandingData = s.brandingData;
    const typesBrand = getters["getTypeBranding"];
    const data = [];
    const noDateTitle = ["id", "type", "id_type", "country", "city"];

    typesBrand.forEach((type) => {
      if (brandingData[type][idCity] !== undefined) {
        const obj = {
          id: idCity,
          ...brandingData[type][idCity],
          type: typeBrandingName[type],
          fieldsKeys: ["type"]
        };

        Object.keys(brandingData[type][idCity]).forEach((item) => {
          if (!noDateTitle.includes(item)) {
            obj.fieldsKeys.push(item);
          }
        });
        data.push(obj);
      }
    });
    return data;
  },

  //
  getDataByCountryByMonths: (s, getters) => (country) => {
    const noDateTitle = ["id", "type", "id_type", "country", "city"];
    const updatedData = {};
    if (country !== null) {
      const data = getters["getDataByCountry"][country];

      if (data !== undefined) {
        Object.keys(data).forEach((type) => {
          updatedData[type] = {};
          data[type].forEach((city) => {
            Object.keys(city).forEach((k) => {
              if (!noDateTitle.includes(k)) {
                updatedData[type][k] === undefined
                  ? (updatedData[type][k] = []).push(city[k])
                  : updatedData[type][k].push(city[k]);
              }
            });
          });
          Object.keys(updatedData[type]).forEach((date) => {
            updatedData[type][date] = updatedData[type][date].reduce(
              (sum, curr) => sum + curr,
              0
            );
          });
        });
      }
    }

    return updatedData;
  },

  //
  getTotalCarsByDate: (s, getters) => (type) => {
    // const json = await dispatch("getDataOfBrandingCars", type);
    const json = getters["brandingDataByType"](type);
    const dates = [];
    const dataByDates = {};

    for (let k in json[1]) {
      if (!noDateTitle.includes(k)) {
        dates.push(k);
      }
    }
    dates.forEach((item) => {
      if (!dataByDates?.[item]) {
        dataByDates[item] = [];
      }
    });
    //
    Object.keys(json).forEach((key) => {
      for (let item in json[key]) {
        if (item in dataByDates) {
          dataByDates[item].push(json[key][item]);
        }
      }
    });

    Object.keys(dataByDates).forEach((key) => {
      dataByDates[key] = dataByDates[key].reduce((acc, cur) => acc + cur, 0);
    });
    return dataByDates;
  }
};
