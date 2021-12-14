import axios from "axios";

export const database = axios.create({
  baseURL: "https://ads-on-cars-e195e-default-rtdb.firebaseio.com/"
});

