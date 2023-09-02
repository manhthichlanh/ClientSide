// import TradingViewWidget from "../../components/AdvancedChart/TradingViewWidget"
import { useEffect } from "react";
// import CoinTable from "../../components/CoinTable/CoinTable";
// import { coinAPi } from '../../utils/http';
// import { useQuery } from 'react-query';
// const useCoinMarketData = () => {
//   return useQuery(
//     'coinMarketData',
//     async () => {
//       const response = await coinAPi("api/currency/info?limit=10")

//       return response.data
//     }
//   );
// };
export default function Market() {
  // const [coinData, setCoinData] = useState([]);
  // const { data, isloading, error } = useCoinMarketData();
  useEffect(() => {
    console.log("hêlo")
  }, [])



  return (
    // <CoinTable data={coinData.length > 0 && coinData} isloading={isloading}></CoinTable>
    <h1>123</h1>
  )
}
