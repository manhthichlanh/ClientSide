import axios from "axios";

const binanceApi = axios.create({
  baseURL: 'https://api.binance.com/api/v3',
});
const cexApi = axios.create({
  baseURL: 'https://api.plus.cex.io/rest-public',
})
const coinAPi = axios.create({
  method: "GET",
  baseURL: 'https://crypto-view.onrender.com',
})
export { binanceApi, cexApi, coinAPi };