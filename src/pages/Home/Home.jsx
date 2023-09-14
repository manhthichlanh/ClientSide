// import { useEffect } from 'react';
import LightWeightChart from '../../components/Light-Weight-Chart/LightWeightChart';
// import TableWiget from "../../components/OrderBookTable/TableWiget";
// import LightWeightChart from "."
import "./Home.scss"
import CoinTable from '../../components/CoinTable/CoinTable';
import { useParams } from 'react-router-dom';
import { cexApi } from '../../utils/http';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';

const useCoinPairData = () => {
  return useQuery(
    'coinPairData',
    async () => {
      const response = await cexApi.get("get_ticker");
      return Object.entries(response.data.data);
    }
  );
};
export default function Home() {
  const { pair } = useParams();
  const symbol = pair ? pair : "BTC-USD";
  const [currenCoinValue, setCurrenCoinValue] = useState(null);
  const { data, isLoading } = useCoinPairData();
  useEffect(() => {
    if (data) {
      const currenCoinProfile = data.filter(fil => fil[0] === symbol);
      setCurrenCoinValue(currenCoinProfile[0][1])
    }
  }, [data, symbol])
  return (
    <>
      <div className="container-fluid">
        <div className="row home-container">


          {/* <div className="col-4">
            <div className="bg-primary w-100 h-100">e</div>
          </div> */}
          <div className="col-lg-9 px-0">
            <div className="top-ticker">
              <div className="card rounded-0">
                {currenCoinValue &&
                  (<div className='d-flex justify-content-around align-items-center'>
                    <div className="bagde-item">
                      <div className="badge-title">Market</div>
                      <div className="badge-value">{symbol}</div>
                    </div>
                    <div className="vertical-divider"></div>
                    <div className="bagde-item">
                      <div className="badge-title">Best Bid</div>
                      <div className={"badge-value sucessColor"}>{currenCoinValue.bestBid} <span className='currency'> USD</span></div>
                    </div>
                    <div className="vertical-divider"></div>
                    <div className="bagde-item">
                      <div className="badge-title">Best Aks</div>
                      <div className={"badge-value warningColor"}>{currenCoinValue.bestAsk}  <span className='currency'> USD</span></div>
                    </div>
                    <div className="vertical-divider"></div>
                    <div className="bagde-item">
                      <div className="badge-title">Last Price</div>

                      <div className={"badge-value "}>{currenCoinValue.last}  <span className='currency'> USD</span></div>
                    </div>
                    <div className="vertical-divider"></div>
                    <div className="bagde-item">
                      <div className="badge-title">Price Change</div>
                      <div className={"badge-value " + (currenCoinValue.priceChange > 0 ? "sucessColor" : "warningColor")}> <span>{currenCoinValue.priceChange}  <span className='currency'> USD</span></span> <span>({currenCoinValue.priceChangePercentage}%)</span> </div>
                    </div>
                    <div className="vertical-divider"></div>
                    <div className="bagde-item">
                      <div className="badge-title">Volume</div>

                      <div className={"badge-value "}>{currenCoinValue.volumeUSD}  <span className='currency'> USD</span></div>
                    </div>
                  </div>)
                }

              </div>
            </div>
            <LightWeightChart themeColor="light" symbol={symbol} />
          </div>

          <div className="col-lg-3 d-lg-block d-none px-0"> 
            <CoinTable data={data} isLoading={isLoading}></CoinTable>
          </div>


        </div>

      </div>
    </>
  )
}
