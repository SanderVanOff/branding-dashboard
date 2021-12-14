export default {
  state: {
    countries: {
      Азербайджан: "az",
      Армения: "am",
      Беларусь: "by",
      Бразилия: "br",
      Вьетнам: "vn",
      Грузия: "ge",
      Индия: "in",
      Индонезия: "id",
      Иран: "ir",
      Казахстан: "kz",
      Колумбия: "co",
      Малайзия: "my",
      Перу: "pe",
      Россия: "ru",
      Таджикистан: "tj",
      Украина: "ua",
      Филиппины: "ph",
      Чили: "cl"
    },
    colors: [
      "IndianRed",
      "GreenYellow",
      "Aquamarine",
      "Plum",
      "LightSlateGray",
      "Coral",
      "LightSeaGreen",
      "Orange",
      "SteelBlue",
      "BlueViolet",
      "Crimson",
      "SpringGreen",
      "Gold",
      "Indigo",
      "NavajoWhite",
      "PaleGreen",
      "PaleVioletRed",
      "Khaki"
    ],
    typeBranding: [
      "fullBrand",
      "RearWindowSticker",
      "cargoFullBrand",
      "cargoCabinBrand",
      "cargoBodyBrand"
    ]
  },
  getters: {
    getCountries: (s) => s.countries,
    getColors: (s) => s.colors,
    getTypeBranding: (s) => s.typeBranding
  }
};
