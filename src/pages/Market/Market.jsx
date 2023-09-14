import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { coinApi } from "../../utils/http";
import { useCallback } from "react";
import { useRef } from "react";
import "./Market.scss"
import { useState } from "react";
import { Link } from "react-router-dom";
const fetchCrypto = async (pageParam, limit) => {
  const start = (pageParam - 1) * limit + 1;
  const response = await coinApi(`api/currency/info?start=${start}&limit=${limit}`);
  const data = await response.data;
  return data;
}


export default function Market() {

  const [range] = useState(20);

  const observerElem = useRef(null);

  const theadRef = useRef(null);

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery("cyptoData", ({ pageParam = 1, limit = range }) => fetchCrypto(pageParam, limit), {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage =
          lastPage.length === range ? allPages.length + 1 : undefined;
        return nextPage;
      },
    });

  const loadingItem = (itemLength) => {
    return (
      Array.from(Array(range).keys()).map((indexKey) =>
      (

        <tr key={range + indexKey} >
          {
            Array.from(Array(itemLength).keys()).map((item) => {
              return (
                <td className="loading " key={range + item}>
                  <div className="bar"></div>
                </td>
              )
            }
            )
          }
        </tr>
      ))
    )
  }

  const fomatMoney = (number) => {
    if (typeof number === "number") return number.toLocaleString("en-US", { style: "currency", currency: "USD" })
    else if (typeof number === "string") return number.toLocaleString("en-US", { style: "currency", currency: "USD" })
    else return undefined
  }


  const handleObserver = useCallback((entries) => {
    const [target] = entries
    if (target.isIntersecting) {
      fetchNextPage()
    }
  }, [fetchNextPage]);

  useEffect(() => {
    const element = observerElem.current
    const option = { threshold: 0 }

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element)
    return () => observer.unobserve(element)
  }, [fetchNextPage, hasNextPage, handleObserver]);

  return (
    <div className="market container-fluid">
      <h2 style={{ textAlign: "center" }} className="py-5">Cryptocurrency prices</h2>
      <div className="table-responsive">
        <table className={"table caption-top table-hover "}>

          <thead ref={theadRef}>
            <tr>
              <th scope="col" className="text-capitalize"></th>
              <th scope="col" className="text-capitalize">currency</th>
              <th scope="col" className="text-capitalize">price </th>
              <th scope="col" className="text-capitalize">1h </th>
              <th scope="col" className="text-capitalize">24h </th>
              <th scope="col" className="text-capitalize">7d </th>
              <th scope="col" className="text-capitalize">24h volume</th>
              <th scope="col" className="text-capitalize">market cap</th>
              <th scope="col" className="text-capitalize"></th>

            </tr>
          </thead>
          <tbody>

            {
              (isSuccess) ? (
                data.pages.map((page, pageNum) => (
                  page.map((item, index) => (
                    <tr key={index}>
                      <td >{pageNum * range + (index + 1)}</td>
                      <td data-label="currency" className="cryto-view-cell">
                        <div className="image">
                          <img src={item.logo} />
                        </div>
                        <div className="crypto-current-info">
                          <span className="crypto-name">{item.symbol}</span>
                          <span className="crypto-symbol">{item.name}</span>
                        </div>
                      </td>
                      <td data-label="price">{fomatMoney(item.quote.USD.price)}</td>

                      <td data-label="1h" className={item.quote.USD.percent_change_1h > 0 ? "sucessColor" : "warningColor"}>{item.quote.USD.percent_change_1h.toFixed(2) + "%"}</td>
                      <td data-label="24h" className={item.quote.USD.percent_change_24h > 0 ? "sucessColor" : "warningColor"}>{item.quote.USD.percent_change_24h.toFixed(2) + "%"}</td>
                      <td data-label="7d" className={item.quote.USD.percent_change_7d > 0 ? "sucessColor" : "warningColor"}>{item.quote.USD.percent_change_7d.toFixed(2) + "%"}</td>

                      <td data-label="24h volume">{fomatMoney(item.quote.USD.volume_24h)}</td>
                      <td >{fomatMoney(item.quote.USD.market_cap)}</td>

                      <td style={{}}><Link to={`/orderbook/${item.symbol}-USD`} className="btn btn-action">Subcribe</Link></td>
                    </tr>
                  ))
                )
                )
              ) :
                (
                  loadingItem(9)
                )
            }


          </tbody>
          <tfoot ref={observerElem}>
            {
              isFetchingNextPage && hasNextPage && (
                loadingItem(9)
              )

            }
          </tfoot>
        </table>
      </div>

    </div>

  )
}
