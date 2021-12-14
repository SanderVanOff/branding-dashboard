import { database } from "@/plugins/axios";

const noDateTitle = ["type", "id_type", "country", "city"];

export const actions = {
  //получение данных по url
  async getDataOfBrandingCars({ commit }, type) {
    try {
      const { data } = await database.get(`brandData/${type}.json`);
      commit("setBrandingDataToState", data);
      return data;
    } catch (e) {
      console.log("e", e);
    }
  },

  //получить данные на последнюю дату по странам

  async getLastDataByCountry({ commit, getters }, type) {
    const data = await getters["brandingDataByType"](type);
    let arr = [];
    let countriesList = new Set();
    const noDateTitle = ["type", "id_type", "country", "city"];

    Object.keys(data).forEach((key) => {
      const obj = {
        country: data[key].country,
        data: []
      };

      countriesList.add(data[key].country);

      Object.keys(data[key]).forEach((k) => {
        if (!noDateTitle.includes(k)) {
          obj.data.push(data[key][k]);
        }
      });

      arr.push(obj);
    });
    countriesList = Array.from(countriesList);

    const typeBrand = {};
    countriesList.forEach((item) => {
      if (!typeBrand?.[item]) {
        typeBrand[item] = [];
      }
    });

    arr.forEach((item) => {
      if (typeBrand?.[item.country]) {
        typeBrand[item.country].push(item.data[item.data.length - 1]);
      }
    });

    for (let o in typeBrand) {
      typeBrand[o] = typeBrand[o].reduce((sum, curr) => sum + curr, 0);
    }
    commit("setLastBrandingDataByCountries", { type, typeBrand });
    return typeBrand;
  },

  //получение авто по датам
  async getTotalCarsByDate({ getters }, type) {
    const json = await getters["brandingDataByType"](type);
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
  },

  // получение всех городов по странам
  async getAllCityByCountries({ dispatch }, type) {
    const data = await dispatch("getDataOfBrandingCars", type);

    let countries = new Set([]);
    const updateData = [];

    Object.keys(data).forEach((key) => {
      countries.add(data[key].country);
      updateData.push({
        id: key,
        ...data[key]
      });
    });
    countries = Array.from(countries);

    const objData = {};
    for (let i = 0; i < countries.length; i++) {
      objData[countries[i]] = [];
    }

    updateData.forEach((item) => {
      objData[item.country].push({
        country: item.country,
        city: item.city,
        id: item.id
      });
      objData[item.country].sort((a, b) => a.city > b.city);
    });
    return objData;
  },

  //получение количества брендированных по городам
  async getCarsByAllCity({commit, getters }, type) {
    const json = await getters["brandingDataByType"](type);
    const brand = [];
    Object.keys(json).forEach((key) => {
      const obj = {
        id: key,
        type: json[key].type,
        country: json[key].country,
        city: json[key].city,
        dates: [],
        data: []
      };
      for (let k in json[key]) {
        if (!noDateTitle.includes(k)) {
          obj.dates.push(k);
          obj.data.push(json[key][k]);
        }
        // if (new Date(k).getDate() === 1) {
        //   obj.dates.push(k);
        //   obj.data.push(json[key][k]);
        // }
      }
      brand.push(obj);
    });

    commit("setBrandCarByCityToState", { brand, type });
    return brand;
  }
};
