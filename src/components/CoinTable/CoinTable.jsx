// import { useEffect } from "react";
import "./CoinTableStyle.scss"
import { Link } from "react-router-dom";
// const useCoinPairData = () => {
//     return useQuery(
//         'coinPairData',
//         async () => {
//             const response = await cexApi.get("get_ticker");
//             return Object.entries(response.data.data);
//         }
//     );
// };
export default function CoinTable(props) {
    const { data, isLoading } = props;

    return (
        <div className="card tableContainer">
            {/* <div className="card-header px-2 d-flex justify-content-between">
                <div className="title">
                    Currency List
                </div>
                <div className="filter">
                    <select name="" id="" >
                        <option value="">Price</option>
                    </select>
                </div>
            </div> */}
            <div className="card-body table-responsive p-0">
                <table className={"table caption-top table-hover "}>

                    <thead>
                        <tr>
                            <th scope="col" className="text-capitalize">symbol</th>
                            <th scope="col" className="text-capitalize">price </th>
                            <th scope="col" className="text-capitalize">change</th>
                            <th scope="col" className="text-capitalize">%change</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            isLoading === false && data.length > 0 ? (
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><Link to={"/quote/" + item[0]}>{item[0]}</Link></td>
                                            <td >{item[1].last?.length > 8 ? Number(item[1].last)?.toFixed(5) : item[1].last}</td>
                                            <td className={item[1].priceChange > 0 ? "sucessColor" : "warningColor"}>
                                                <div className="d-flex flex-column ">
                                                    <div className="top ">{item[1].priceChange}</div>
                                                </div>
                                            </td>
                                            <td className={item[1].priceChangePercentage > 0 ? "sucessColor" : "warningColor"}>
                                                <div className="d-flex flex-column">
                                                    <div className="bottom">{item[1].priceChangePercentage}</div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                                )
                            ) : (
                                Array.from(Array(15).keys()).map((item, index) => {
                                    return (

                                        <tr key={index}>
                                            <td className="loading ">
                                                <div className="bar"></div>
                                            </td>
                                            <td className="loading">
                                                <div className="bar"></div>
                                            </td>
                                            <td className="loading">
                                                <div className="bar"></div>
                                            </td>
                                            <td className="loading">
                                                <div className="bar"></div>
                                            </td>
                                        </tr>


                                    )
                                })
                            )


                        }



                    </tbody>
                </table>
            </div>

        </div>
    )
}
