import { actions } from "./actions";
import { mutations } from "./mutations";
import { getters } from "./getters";

export default {
  state: {
    brandingData: {},
    brandingDataByType: {
      fullBrand: null,
      RearWindowSticker: null,
      cargoFullBrand: null,
      cargoCabinBrand: null,
      cargoBodyBrand: null
    },
    lastBrandingDataByCountries: {}
  },
  mutations,
  actions,
  getters
};
