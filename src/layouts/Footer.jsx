// import React from 'react'

export default function Footer() {
    return (
        <footer className="container-flud pt-5">
            <div className="px-5">
                <div className="hm-footer-details px-1">
                    <div className="row">
                        <div className=" col-md-3 col-sm-6 col-xs-12">
                            <div className="hm-footer-widget">
                                <div className="hm-foot-title">
                                    <h4>cex.io API</h4>
                                </div>
                                <div className="hm-foot-menu">

                                    <div className="d-flex flex-column justify-content-start">
                                        <a className="text-secondary mb-2" href="https://cex.io/"><i className="bi bi-chevron-right"></i>
                                            home</a>
                                        <a className="text-secondary mb-2" href="https://docs.plus.cex.io/"><i className="bi bi-chevron-right"></i>
                                            trading api</a>
                                        <a className="text-secondary mb-2" href="https://cex.io/websocket-api"><i className="bi bi-chevron-right"></i>
                                            websocket</a>
                                        <a className="text-secondary mb-2" href="https://terminal.plus.cex.io/trade"><i className="bi bi-chevron-right"></i>
                                            trading</a>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" col-md-3 col-sm-6 col-xs-12">
                            <div className="hm-footer-widget">
                                <div className="hm-foot-title">
                                    <h4>Order Website</h4>
                                </div>
                                <div className="hm-foot-menu">

                                    <div className="hm-foot-menu">

                                        <div className="d-flex flex-column justify-content-start">
                                            <a className="text-secondary mb-2" href="#"><i className="bi bi-chevron-right"></i>
                                                CoinMarketCap</a>
                                            <a className="text-secondary mb-2" href=""><i className="bi bi-chevron-right"></i>
                                                CoinMarketCap API</a>
                                            <a className="text-secondary mb-2" href="#"><i className="bi bi-chevron-right"></i>
                                                CoinGecko</a>
                                            <a className="text-secondary mb-2" href="https://www.coingecko.com/vi/api/documentation"><i className="bi bi-chevron-right"></i>
                                                CoinGecko API</a>
                                            <a className="text-secondary mb-2" href="https://crypto-view.onrender.com"><i className="bi bi-chevron-right"></i>
                                                Server Endpoint</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" col-md-3 col-sm-6 col-xs-12">
                            <div className="hm-footer-widget">
                                <div className="hm-foot-title">
                                    <h4>trading View</h4>
                                </div>
                                <div className="hm-foot-menu">
                                    <div className="d-flex flex-column justify-content-start">
                                        <a className="text-secondary mb-2" href="https://www.tradingview.com/"><i className="bi bi-chevron-right"></i>
                                            home</a>
                                        <a className="text-secondary mb-2" href="https://tradingview.github.io/lightweight-charts/"><i className="bi bi-chevron-right"></i>
                                            light weight chart</a>
                                        <a className="text-secondary mb-2" href="https://www.tradingview.com/charting-library-docs/"><i className="bi bi-chevron-right"></i>
                                            advanced charts</a>
                                        <a className="text-secondary mb-2" href="https://www.tradingview.com/chart/"><i className="bi bi-chevron-right"></i>
                                            demo</a>
                                        <a className="text-secondary mb-2" href="https://www.tradingview.com/widget/"><i className="bi bi-chevron-right"></i>
                                            all widget</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" col-md-3 col-sm-6  col-xs-12">
                            <div className="hm-footer-widget">
                                <div className="hm-foot-title">
                                    <h4>contact me</h4>
                                </div>
                                <div className="hm-foot-para">
                                    <p >
                                        Contact me for more detailed information (infomation in user status bar).
                                    </p>
                                </div>
                                <div className="hm-foot-email">
                                    <div className="foot-email-box">
                                        <input type="text" className="form-control" placeholder="Enter Email Here...." />
                                    </div>
                                    <div className="foot-email-subscribe">
                                        <span><i className="fa fa-location-arrow"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        </footer>
    )
}
