// import React from 'react'
import { useEffect, useState } from "react";
import "./OrderBook.scss"
import socket from "../../utils/socket";
import TableWiget from "../../components/OrderBookTable/TableWiget";
export default function OrderBook() {

  const [orderData, setOrderData] = useState({ id: 0, buy: [], sell: [], buy_total: 0, sell_total: 0, max_buy: 0, max_sell: 0, pair: "" });
  const [depth, setDepth] = useState(15);
  const [decimal, setDecimal] = useState(1);

  const handleOnChangeDepth = (event) => {
    const value = event.target.value;
    setDepth(Number(value))
  }
  const handleOnChangeGroup = (event) => {
    const value = event.target.value;
    setDecimal(Number(value))
  }
  // const []
  useEffect(() => {
    (() => {
      // if (!socket) return;
      socket.on("md_data", (data) => {
        const { id, buy, sell, buy_total, pair, sell_total } = data;


        setOrderData({ id, buy, sell, buy_total, pair, sell_total });
      });
    }
    )()
  }, []);
  useEffect(() => {
    console.log(orderData)
  }, [orderData]
  )

  return (
    <>
      <div className="container orderBook">
        <div className="top d-flex justify-content-between">
          <div className="left-title">Order Book   <span className="small-title">BTC/USDT</span></div>
          <div className="right-item d-flex ">
            <div className="depth px-2">
              <div className="top-title">Depth</div>
              <select name="" id="" onChange={(e) => handleOnChangeDepth(e)} >

                <option value="15">15</option>
                <option value="30">30</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="decimal">
              <div className="top-title">Group</div>
              <select name="" id="" onChange={(e) => handleOnChangeGroup(e)} >
                <option value="1">1 Decimal</option>
                <option value="2">2 Decimal</option>
                <option value="3">3 Decimal</option>
              </select>
            </div>
          </div>
        </div>

        <div className="main row">
          <div className="col-lg-6 col-md-12">
            <div className="card px-1">
              <TableWiget
                orderData={orderData.buy}
                total={orderData.buy_total}
                title={"Buy"}
                decimal={decimal}
                depth={depth}
              />

            </div>



          </div>

          <div className="col-lg-6 col-md-12">

            <div className="card px-1">
              <TableWiget
                orderData={orderData.sell}
                total={orderData.sell_total}
                title={"Sell"}
                decimal={decimal}
                depth={depth}
              />
            </div>

          </div>

        </div>
      </div >

    </>
  )
}
