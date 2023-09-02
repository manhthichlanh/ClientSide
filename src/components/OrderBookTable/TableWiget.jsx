import PropTypes from "prop-types";
const renderPrice = (item, index, title, orderTotal, decimal) => {
    const price = item[0];
    const amout = item[1];
    const total = price * amout;
    // console.log({ width: total / orderTotal * 100000 })

    return (
        // <tr key={index} className="">
        //   <td scope="row">{title} {index + 1}</td>
        //   <td>{price.toFixed(decimal)}</td>
        //   <td>{amout.toFixed(8)}</td>
        //   <td>{total.toFixed(2)}</td>
        // </tr>


        <div className="row" key={index}>
            {title == "Buy" ?
                <>
                    <div className={"row-highlight " + title} style={{ backgroundColor: "rgb(0, 197, 130)", width: (total / orderTotal * 1000) + "%", right: "0" }}></div>
                </>
                :
                <>
                    <div className={"row-highlight " + title} style={{ backgroundColor: "rgb(255, 3, 114)", width: (total / orderTotal * 1000) + "%", left: "0" }}></div>
                </>

            }

            <div className="col text-capitalize"><b className={title}>{title} {index + 1}</b> </div>
            <div className="col text-capitalize">{price.toFixed(decimal)}</div>
            <div className="col text-capitalize">{amout.toFixed(8)}</div>
            <div className="col text-capitalize">{total.toFixed(2)}</div>

        </div>
    )
}
export default function TableWiget(props) {
    const { orderData, total, title, decimal, depth } = props;
    return (
        <div className={`grid-container table ${orderData.length > 0 ? "grid-hover" : ""}`}>
            <div className="grid-caption">
                <div className="caption bg-light d-flex justify-content-between">
                    <div className="left_tag">{title} Orders</div>
                    <div className="total-available">Total USD available: {total.toFixed(decimal)}</div>
                </div>
            </div>
            <div className="grid-header">
                <div className="row">
                    <div className="col text-capitalize">side</div>
                    <div className="col text-capitalize">price (USDT)</div>
                    <div className="col text-capitalize">Amout(BTC)</div>
                    <div className="col text-capitalize">total(USDT)</div>
                </div>
            </div>
            <div className="grid-body">
                {orderData.length > 0 ? (
                    orderData.slice(0, depth).map((item, index) => {
                        return renderPrice(item, index, title, total, decimal);
                        // return (
                        //   <div className="row" key={index}>
                        //     <div className="col">Buy {index + 1}</div>
                        //     <div className="col">{item[0]}</div>
                        //     <div className="col">{item[1]}</div>
                        //     <div className="col">{item[0] * item[1]}</div>
                        //   </div>
                        // )
                    })
                ) : (
                    Array.from(Array(depth).keys()).map(item => {
                        return (
                            <div className="row loading-row" key={item}>
                                <div className="col loading">
                                    <div className="bar"></div>
                                </div>
                                <div className="col loading">
                                    <div className="bar"></div>
                                </div>
                                <div className="col loading">
                                    <div className="bar"></div>
                                </div>
                                <div className="col loading">
                                    <div className="bar"></div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
TableWiget.propTypes = {
    orderData: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    decimal: PropTypes.number.isRequired, // Xác định kiểu dữ liệu cho prop "decimal"
    depth: PropTypes.number.isRequired,
};
