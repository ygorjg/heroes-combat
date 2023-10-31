import axios from "axios";

const api = axios.create({
  baseURL: "http://homologacao3.azapfy.com.br/api/ps/metahumans",
  timeout: 5000,
});

export default api;
