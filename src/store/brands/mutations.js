export const mutations = {
  setBrandingDataToState(state, data) {
    Object.keys(data).forEach((key) => {
      state.brandingData[key] = data[key];
    });
  },

  setBrandCarByCityToState(state, payload) {
    state.brandingDataByType[payload.type] = payload.brand;
  },

  setLastBrandingDataByCountries(state, payload) {
    state.lastBrandingDataByCountries[payload.type] = payload.typeBrand;
  },
  clearBrandData(state) {
    state.brandingData = {};
    state.brandingDataByType = {
      fullBrand: null,
      RearWindowSticker: null,
      cargoFullBrand: null,
      cargoCabinBrand: null,
      cargoBodyBrand: null
    };
    state.lastBrandingDataByCountries = {};
  }
};
