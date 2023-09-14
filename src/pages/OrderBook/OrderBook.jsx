// import React from 'react'
import { useEffect, useRef, useState } from "react";
import "./OrderBook.scss"
import socket from "../../utils/socket";
import TableWiget from "../../components/OrderBookTable/TableWiget";
import { useParams } from "react-router-dom";




export default function OrderBook() {
  const { pair } = useParams();

  const [orderData, setOrderData] = useState({
    id: 0,
    buy: [],
    sell: [],
    buy_total: 0,
    sell_total: 0,
    max_buy: 0,
    max_sell: 0,
    pair: '',
  });

  const [activeTab, setActiveTab] = useState('buy');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const tabRef = useRef(null);
  useEffect(() => {

    const symbol = pair || 'BTC-USD';

    socket.emit('get_md', symbol);

    socket.on(`md_data[${pair ? pair : 'BTC-USD'}]`, (receivedData) => {
      const { id, buy, sell, buy_total, pair, sell_total, max_buy, max_sell } = receivedData;


      return setOrderData({ id, buy, sell, buy_total, pair: pair.split(":").join("-"), sell_total, max_buy, max_sell });
    });
  }, [pair]);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    };
    // Thêm sự kiện lắng nghe thay đổi kích thước cửa sổ
    window.addEventListener('resize', handleResize);

    // Loại bỏ sự kiện lắng nghe khi component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []
  )

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
  const handleChangeTab = (tab) => {
    setActiveTab(tab);
  }


  return (
    <>
      <div className="container-fluid px-5 orderBook">
        <div className="top d-flex justify-content-between row">

          <div className="left-title d-flex align-items-center col-xs-12 col-md-6 col-lg-7 col-xl-9 ">
            <div className="main-title" style={{ paddingRight: "10px" }} >Order Book</div>
            <span className="sub-title">{orderData?.pair}</span>
          </div>

          <div className="right-item d-flex col-xs-12 col-md-6 col-lg-5 col-xl-3 justify-content-end">
            <div className="depth px-1 w-50">
              <div className="top-title">Depth</div>
              <select name="" id="" onChange={(e) => handleOnChangeDepth(e)} className="w-100">

                <option value="15">15</option>
                <option value="30">30</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="decimal px-1 w-50">
              <div className="top-title">Group</div>
              <select name="" id="" onChange={(e) => handleOnChangeGroup(e)} className="w-100">
                <option value="1">1 Decimal</option>
                <option value="2">2 Decimal</option>
                <option value="3">3 Decimal</option>
              </select>
            </div>
          </div>
        </div>

        <div className="main row">
          {
            windowWidth <= 768 && (
              <div className="d-xs-block " ref={tabRef} >
                <ul className="nav nav-tabs ">
                  <li className="nav-item" style={{ cursor: "pointer" }}>
                    <div className={`nav-link ${activeTab === 'buy' ? 'active' : ''}`} aria-current="page" onClick={() => handleChangeTab('buy')}>Buy Order</div>
                  </li>

                  <li className="nav-item" style={{ cursor: "pointer" }}>
                    <div className={`nav-link ${activeTab === 'sell' ? 'active' : ''}`} aria-current="page" onClick={() => handleChangeTab('sell')}>Sell Order</div>
                  </li>
                </ul>
              </div>
            )
          }


          <div className="col-xs-12 col-md-6 col-lg-6 ">

            {
              (!tabRef.current ? true : activeTab === "buy") && (
                <div className="card px-1 rounded-0">
                  <TableWiget
                    orderData={orderData.buy}
                    maxOrder={orderData.max_buy}
                    total={orderData.buy_total}
                    title={"Buy"}
                    decimal={decimal}
                    depth={depth}
                  />

                </div>
              )
            }




          </div>

          <div className="col-xs-12 col-md-6 col-lg-6">
            {
              (!tabRef.current ? true : activeTab === "sell") && (
                <div className="card px-1">
                  <TableWiget
                    orderData={orderData.sell}
                    maxOrder={orderData.max_sell}
                    total={orderData.sell_total}
                    title={"Sell"}
                    decimal={decimal}
                    depth={depth}
                  />
                </div>
              )

            }


          </div>

        </div>
      </div >

    </>
  )
}
