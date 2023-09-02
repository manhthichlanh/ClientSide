// import { useEffect } from 'react';
import LightWeightChart from '../../components/Light-Weight-Chart/LightWeightChart';
// import TableWiget from "../../components/OrderBookTable/TableWiget";
// import LightWeightChart from "."
import CoinTable from '../../components/CoinTable/CoinTable';
import { useParams } from 'react-router-dom';

export default function Home() {
  const { pair } = useParams();


  return (
    <>
      <div className="container-fluid">
        <div className="row">


          {/* <div className="col-4">
            <div className="bg-primary w-100 h-100">e</div>
          </div> */}
          <div className="col-lg-9 px-0">
            <LightWeightChart themeColor="light" symbol={pair}/>
          </div>

          <div className="col-lg-3 d-lg-block d-none px-0" style={{ height: "500px" }}>
            <CoinTable></CoinTable>
          </div>
        </div>

      </div>
    </>
  )
}
