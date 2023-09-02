// import { createChart } from 'lightweight-charts';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { cexApi } from '../../utils/http';
import { useQuery } from 'react-query';
import moment from 'moment/moment';
import PropTypes from "prop-types";
import "./chartStyle.scss"
import Select from 'react-select';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const seriesesData = [
    ["1m", "1Min", "1 minute"],
    ["5m", "5Min", "5 minute"],
    ["15m", "15Min", "15 minute"],
    ["30m", "30Min", "30 minute"],
    ["1h", "1H", "1 hour"],
    ["2h", "2H", "2 hours"],
    ["4h", "4H", "4 hours"],
    ["1d", "1D", "1 day"],
];
const defaultColor = {
    light:
    {
        line: {
            primary: 'rgba(41,98,355,1)'
        },
        area: {
            primary1: 'rgba(41,98,355,1)',
            primary2: 'rgba(41,98,355,0.5)',
            primary3: 'rgba(41,98,355,0.1)',

        },
        candlestick: {
            success: 'rgba(8,153,129,1)',
            warning: 'rgba(242,54,69,1)'
        },
        histogram: {
            success: 'rgba(8,153,129,0.5)',
            warning: 'rgba(242,54,69,0.5)'
        },
        bar: {
            success: 'rgba(8,153,129,1)',
            warning: 'rgba(242,54,69,1)'
        }

    },
    dark: {
        line: {
            primary: 'rgba(41,98,355,1)'
        },
        area: {
            primary1: 'rgba(41,98,355,1)',
            primary2: 'rgba(41,98,355,0.5)',
            primary3: 'rgba(41,98,355,0.1)',

        },
        candlestick: {
            success: 'rgba(8,153,129,1)',
            warning: 'rgba(242,54,69,1)'
        },
        histogram: {
            success: 'rgba(8,153,129,0.5)',
            warning: 'rgba(242,54,69,0.5)'
        },
        bar: {
            success: 'rgba(8,153,129,1)',
            warning: 'rgba(242,54,69,1)'
        }
    }
}
const options = [
    {
        value: 1,
        text: 'Line',
        icon: <svg className="H(15px) W(16px) Mend(8px) Cur(p)" width="16" height="16" viewBox="0 0 24 24" data-icon="line-type-line">
            <path d="M9.048 19.345c-.263 0-.518-.103-.707-.293l-2.985-2.986L2.71 18.73c-.39.39-1.022.393-1.415.003-.392-.39-.393-1.023-.004-1.414l3.354-3.375c.186-.19.44-.295.707-.295h.003c.265 0 .52.105.707.293l2.625 2.625 2.623-6.52c.125-.312.398-.54.726-.607.332-.07.67.034.908.272l4.28 4.265 3.774-9.352c.207-.512.794-.757 1.302-.553.513.207.76.79.554 1.3l-4.34 10.752c-.127.312-.4.538-.73.606-.327.067-.667-.034-.905-.272L12.6 12.195l-2.624 6.523c-.125.312-.4.54-.728.606-.066.014-.134.02-.2.02"></path>
        </svg>
    },
    {
        value: 2,
        text: 'Area',
        icon: <svg className="chartTypeBtn:h_Fill($linkColor)! chartTypeBtn:h_Stk($linkColor)! Cur(p)" width="16" height="16" viewBox="0 0 24 24" data-icon="chart-area"
        // style="fill: rgb(70, 78, 86); stroke: rgb(70, 78, 86); stroke-width: 0; vertical-align: bottom;"
        ><path d="M2.002 11.748c-.017-.376.1-.76.348-1.044.46-.526 1.2-.522 1.655.02l2.857 3.395 4.99-5.842c.218-.256.516-.4.826-.4.31 0 .61.143.828.4l2.526 2.943 3.765-5.513c.085-.176.203-.328.343-.444.463-.396 1.118-.344 1.53.15.22.267.33.61.33.955v12.268C22 19.39 21.473 20 20.824 20H3.176C2.526 20 2 19.39 2 18.636v-6.818c0-.023 0-.047.002-.07z"></path>
        </svg>
    },
    {
        value: 3,
        text: 'Candle',
        icon: <svg className="chartTypeBtn:h_Fill($linkColor)! chartTypeBtn:h_Stk($linkColor)! Cur(p)" width="16" height="16" viewBox="0 0 24 24" data-icon="chart-candle"
        // style="fill: rgb(70, 78, 86); stroke: rgb(70, 78, 86); stroke-width: 0; vertical-align: bottom;"
        ><path d="M18 24c-.6 0-1-.4-1-1V1c0-.6.4-1 1-1s1 .4 1 1v22c0 .6-.4 1-1 1zM6 24c-.6 0-1-.4-1-1V1c0-.6.4-1 1-1s1 .4 1 1v22c0 .6-.4 1-1 1zM3 7h6c.6 0 1 .4 1 1v11c0 .6-.4 1-1 1H3c-.6 0-1-.4-1-1V8c0-.6.4-1 1-1zM8 20H4c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2zM4 9v9h4V9H4zM15 4h6c.6 0 1 .4 1 1v11c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1zM20 17h-4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2zM16 6v9h4V6h-4z"></path>
        </svg>
    },
    {
        value: 4,
        text: 'Bar',
        icon: <svg className="chartTypeBtn:h_Fill($linkColor)! chartTypeBtn:h_Stk($linkColor)! Cur(p)" width="16" height="16" viewBox="0 0 24 24" data-icon="chart-bar"
        // style="fill: rgb(70, 78, 86); stroke: rgb(70, 78, 86); stroke-width: 0; vertical-align: bottom;"
        ><path d="M7 24c-.6 0-1-.4-1-1V1c0-.6.4-1 1-1s1 .4 1 1v22c0 .6-.4 1-1 1zM17 24c-.6 0-1-.4-1-1V1c0-.6.4-1 1-1s1 .4 1 1v22c0 .6-.4 1-1 1zM23 7h-6c-.6 0-1-.4-1-1s.4-1 1-1h6c.6 0 1 .4 1 1s-.4 1-1 1zM7 17H1c-.6 0-1-.4-1-1s.4-1 1-1h6c.6 0 1 .4 1 1s-.4 1-1 1zM13 11H7c-.6 0-1-.4-1-1s.4-1 1-1h6c.6 0 1 .4 1 1s-.4 1-1 1zM17 17h-6c-.6 0-1-.4-1-1s.4-1 1-1h6c.6 0 1 .4 1 1s-.4 1-1 1z"></path>
        </svg>
    },

];
const favoriteArray = ["1m", "30m", "1h", "1d"];
const useCandlestickData = (pair, limit, interval) => {
    const currentDate = new Date(Date.now()); // Convert Date.now() to a Date object
    currentDate.setDate(currentDate.getDate() + 1); // Add 2 days to the Date object
    return useQuery(
        ['candlestickData', pair, limit, interval],
        async () => {
            const requestBody = {
                pair: pair,
                toISO: Date.now(), // You can use the current timestamp as 'toISO'
                limit: limit,
                dataType: 'bestAsk',
                resolution: interval,
            };
            const response = await cexApi.post('get_candles', requestBody);
            return response.data;
        }
    );
};

export default function LightWeightChart(props) {
    const { themeColor, symbol } = props;

    const handle = useFullScreenHandle();

    const [selectedOption, setSelectedOption] = useState(options[0]);
    // const [candles, setCandles] = useState([]);
    // const [interval, setInterval] = useState(seriesesData[6]);
    const chartContainerRef = useRef(null);
    const chart = useRef(null);

    const [resolution, setResolution] = useState(seriesesData[6]);

    const [timeScale] = useState({
        from: 960,
        to: 1000
    });

    const { data, isLoading, error } = useCandlestickData(symbol, (timeScale.to + 1), resolution[0]);

    const [btnVisible, setBtnVisible] = useState(false);
    // handle onChange event of the dropdown
    const handleChange = e => {
        setSelectedOption(e);
        console.log(e)
    }
    const handleClickToTime = (event, index) => {
        setResolution(seriesesData[index])

    }
    const handleClickToChangeRange = (type) => {
        const visibleRange = chart.current.timeScale().getVisibleLogicalRange();
        const setVisibleRange = (from, to) => {
            if (from, to && from !== to) chart.current.timeScale().setVisibleLogicalRange({ from, to })
        }
        const zoomFactor = 0.2; // Tỷ lệ zoom, thay đổi tùy theo yêu cầu
        const zoomDelta = (visibleRange.to - visibleRange.from) * zoomFactor;
        switch (type) {
            case "+":
                setVisibleRange(visibleRange.from + zoomDelta, visibleRange.to)
                break;
            case "-":
                setVisibleRange(visibleRange.from - zoomDelta, visibleRange.to)
                break;
            case "r":
                setVisibleRange(visibleRange.from + 1, visibleRange.to + 1)

                break;
            case "l":
                setVisibleRange(visibleRange.from - 1, visibleRange.to - 1)
                break;
            case "b":
                setVisibleRange(timeScale.from, timeScale.to)
                break;
            default:
                break;
        }
    }
    const lineSetting = (chartTypeColor) => {
        const { primary } = chartTypeColor;
        const lineSeries = chart.current.addLineSeries({
            color: primary,
            lineWidth: 2,

        });
        lineSeries.priceScale().applyOptions({
            scaleMargins: {
                top: 0.1,
                bottom: 0.3, // lowest point will be at the very bottom.
            },
        });
        return lineSeries;
    }

    const areaSetting = (chartTypeColor) => {
        const { primary1, primary2, primary3 } = chartTypeColor;
        const areaSeries = chart.current.addAreaSeries({
            lineWidth: 2,
            lineColor: primary1,
            topColor: primary2,
            bottomColor: primary3
        });
        areaSeries.priceScale().applyOptions({
            scaleMargins: {
                top: 0.1,
                bottom: 0.3, // lowest point will be at the very bottom.
            },
        });
        return areaSeries;
    }
    const candlesSetting = (chartTypeColor) => {
        const { success, warning } = chartTypeColor;
        const candlestickSeries = chart.current.addCandlestickSeries({
            upColor: success,
            downColor: warning,
            borderVisible: false,
            wickUpColor: success,
            wickDownColor: warning,

        });
        candlestickSeries.priceScale().applyOptions({
            scaleMargins: {
                top: 0.1,
                bottom: 0.3, // lowest point will be at the very bottom.
            },
        });
        return candlestickSeries
    }
    const barSetting = (chartTypeColor) => {
        const { success, warning } = chartTypeColor;

        const barSeries = chart.current.addBarSeries({
            upColor: warning,
            downColor: success,

        });
        barSeries.priceScale().applyOptions({
            scaleMargins: {
                top: 0.1,
                bottom: 0.3, // lowest point will be at the very bottom.
            },
        });
        return barSeries;
    }
    const volumeSetting = () => {
        const volumeSeries = chart.current.addHistogramSeries({
            color: '#26a69a',
            priceScaleId: 'left',
            overlay: true, // Hoặc false, tùy thuộc vào yêu cầu của bạn
        });

        volumeSeries.priceScale().applyOptions({
            scaleMargins: {
                top: 0.8, // highest point of the series will be 70% away from the top
                bottom: 0, // lowest point will be at the very bottom.
            },
        });
        return volumeSeries
    }
    const generateChartSelected = useCallback((data, theme) => {

        const themeC = (theme === "light" && defaultColor.light) || (theme === "dark" && defaultColor.dark);

        // const { success, warning } = {
        //     success: [
        //         `rgba(${themeC.histogram.success.r},${themeC.histogram.success.b},${themeC.histogram.success.g}, ${themeC.histogram.success.a})`,
        //         `rgba(${themeC.success.r},${themeC.success.b},${themeC.success.g}, ${themeC.success.a})`
        //     ],
        //     warning: [
        //         `rgba(${themeC.warning.r},${themeC.warning.b},${themeC.warning.g}, ${themeC.success.a})`,
        //         `rgba(${themeC.warning.r},${themeC.warning.b},${themeC.warning.g}, ${themeC.success.a})`
        //     ]
        // }
        const volumes = [];

        const candles = [];

        const lines = []
        const uniqueTime = new Set();

        const newData = [];

        for (const item of data) {
            if (!uniqueTime.has(item.timestamp)) {
                uniqueTime.add(item.timestamp);
                newData.push(item);
            }
        }

        newData
            .sort((a, b) => {
                const momentA = moment(a);
                const momentB = moment(b);
                return momentA.isBefore(momentB) ? -1 : 1;
            }).map(item => {
                const { timestamp, volume, open, high, low, close } = item;
                volumes.push({ time: Math.floor(timestamp / 1000), value: Math.ceil(volume), color: open > close ? themeC.histogram.success : themeC.histogram.warning });
                lines.push({ time: Math.floor(timestamp / 1000), value: close })
                candles.push({ time: Math.floor(timestamp / 1000), open, high, low, close })
            })
        if (volumes.length > 0) {
            switch (selectedOption.value) {
                case 1:
                    lineSetting(themeC.line).setData(lines)
                    break;
                case 2:
                    areaSetting(themeC.area).setData(lines)
                    break;
                case 3:
                    candlesSetting(themeC.candlestick).setData(candles)
                    break;
                case 4:
                    barSetting(themeC.bar).setData(candles);
                    break;

                default:
                    break;
            }
            // volumeSeries.setData(volumes);
            volumeSetting().setData(volumes);
            // candlestickSeries.setData(candles);
        }
    }, [selectedOption]);

    const renderChart = useCallback((data, theme) => {
        const chartOptions = {
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight || 510,
            // autosize: true,
            layout: {
                textColor: 'black',
                background: { type: 'solid', color: '#fff' }

            }, localization: {
                locale: 'en-US',

            },
            crosshair: {
                mode: CrosshairMode.Normal,
            },
            leftPriceScale: {
                borderVisible: false,
                visible: true,

            },
            rightPriceScale: {
                borderVisible: false,
                visible: true, // Hiển thị thước đo bên phải
            },

            grid: {
                vertLines: {
                    color: "#F2F3F3"
                },
                horzLines: {
                    color: "#F2F3F3"
                }
            }
        };
        chart.current = createChart(chartContainerRef.current, chartOptions);

        chart.current.applyOptions({
            timeScale: {
                timeVisible: true,
                secondsVisible: false, // Không hiển thị giây
                // tickMarkFormatter: (time) => {
                //     return moment(time).format("DD-MM hh:mm")
                // },
                borderVisible: false,
            },
        });

        generateChartSelected(data, theme);

        chart.current.timeScale().subscribeVisibleLogicalRangeChange((range) => {

            if (range.from !== timeScale.from || range.to !== timeScale.to) {
                setBtnVisible(true)
            } else {
                setBtnVisible(false)
            }

        }
        )
        // console.log(leftPriceScaleWidth)
        chart.current.subscribeCrosshairMove((param) => {
            // console.log(params)
            if (
                param.point === undefined ||
                !param.time ||
                param.point.x < 0 ||
                param.point.x > chartContainerRef.current.clientWidth ||
                param.point.y < 0 ||
                param.point.y > chartContainerRef.current
            ) {
                //Xử lý số ===0
            } else {
                const seriesValue = Array.from(param.seriesData.values());


                const serie2 = seriesValue[1];
                // console.log(serie2)
                const volumePrice = serie2.value;
                const volumeColor = serie2.color.split(",").slice(0, -1).concat("1)").join(",");

                const volumeInnerHtml = `
                <div class="volume-color"></div>
                <div class="volume-info">
                    <span class='volume-symbol'>${symbol} (Vol)</span>
                    <span class='volume-price' style="color: ${volumeColor}">${volumePrice}</span>
                </div>`;

                // console.log(volumeTool)
                const existingVolumeTool = chartContainerRef.current.querySelector('.volume-container');
                const leftPriceScaleWidth = chartContainerRef.current.querySelector("td").clientWidth
                if (existingVolumeTool) {
                    // Thay thế nội dung div cùng lớp bằng giá trị mới
                    existingVolumeTool.innerHTML = volumeInnerHtml;
                    existingVolumeTool.style = `left: ${leftPriceScaleWidth}px`;
                } else {
                    // Tạo mới div và thêm vào chartContainerRef
                    const volumeTool = document.createElement('div');
                    volumeTool.className = 'volume-container';
                    volumeTool.innerHTML = volumeInnerHtml;
                    volumeTool.style = `left: ${leftPriceScaleWidth}px`;
                    chartContainerRef.current.appendChild(volumeTool);
                }
            }
        })

        chart.current.timeScale().setVisibleLogicalRange({ from: timeScale.from, to: timeScale.to })

    }, [timeScale, symbol, generateChartSelected]);

    useEffect(() => {
        const candles = data?.data;

        // console.log(candles?.map(item => ({ ...item, timestamp: moment(item.time).format("DD-MM-YYYY hh:mm:ss") })))
        if (typeof candles !== "undefined" && candles.length > 0) {

            renderChart(candles, themeColor);

            const handleResize = () => {
                chart.current.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                    height: handle.active === true ? handle.node.current.offsetHeight : 500

                });

            };
            handle.active === true && (
                setTimeout(() => {
                    chart.current.applyOptions({
                        width: chartContainerRef.current.clientWidth,
                        height: handle.node.current.offsetHeight
                    })
                }
                    , 100)
            )
            window.addEventListener(`resize`, handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.current.remove();
            }
        }
    }, [data, themeColor, handle, renderChart]);

    useEffect(() => {
        if (error) console.log(error)
    }, [error]);

    return (
        <FullScreen innerRef={chartContainerRef} handle={handle} >

            <div className="card chart-wiget w-100" style={{ border: "1px solid #E0E3EB", }}>

                {isLoading === false ? (
                    <>
                        <div className="card-header p-0" style={{ minHeight: "40px" }}>
                            <div className="d-flex align-items-center justify-content-between h-100" >
                                <div className="leftControl d-flex align-items-center">
                                    {
                                        seriesesData
                                            .map((element, index) => {

                                                if ([...favoriteArray, element[0].includes(resolution[0]) && element[0]].includes(element[0])) {
                                                    return (
                                                        <div className="btn m-0 time-tag" key={index} onClick={(e) => handleClickToTime(e, index)} style={{ color: element[0] === resolution[0] ? "#2962FF" : "", }}>{element[0]}</div>
                                                    )
                                                }


                                            })

                                    }

                                    <div className="btn-group interval-btn">
                                        <button type="button" className="btn border-0" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span className="visually-hidden">Toggle Dropdown</span>
                                            <svg
                                                className="dropdown-indicator-icon"
                                                width="15"
                                                height="15"
                                                viewBox="0 0 48 48"
                                                data-icon="caret-down"
                                            >
                                                <path d="M24.21 33.173l12.727-12.728c.78-.78.78-2.048 0-2.828-.78-.78-2.047-.78-2.828 0l-9.9 9.9-9.9-9.9c-.78-.78-2.047-.78-2.827 0-.78.78-.78 2.047 0 2.828L24.21 33.173z"></path>
                                            </svg>
                                        </button>
                                        <ul className="dropdown-menu mt-2" >
                                            {
                                                seriesesData.map((item, index) => {
                                                    return (

                                                        <li key={index} style={{ backgroundColor: item[0] === resolution[0] ? "#2962FF" : "", }}><a className={`dropdown-item ${item[0] === resolution[0] && "disabled"}`} style={{ cursor: "pointer", padding: "8px 10px", color: item[0] === resolution[0] ? "#FFF" : "" }} onClick={(e) => handleClickToTime(e, index)}>{item[2]}</a></li>

                                                    )
                                                }
                                                )
                                            }

                                        </ul>
                                    </div>

                                    <div className="vertical-divider"></div>

                                    <div className="float" style={{ zIndex: "50" }}>
                                        <Select
                                            defaultValue={options[0]}
                                            placeholder="Select Option"
                                            value={selectedOption}
                                            options={options}
                                            onChange={handleChange}
                                            getOptionLabel={e => (
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    {e.icon}
                                                    <span style={{ marginLeft: 5 }}>{e.text}</span>
                                                </div>

                                            )}

                                            styles={{
                                                control: (baseStyles) => ({
                                                    ...baseStyles,
                                                    border: "none",
                                                    backgroundColor: "transparent",
                                                    boxShadow: 'none', // Remove box shadow
                                                    cursor: 'pointer', // Show pointer cursor
                                                    ":hover": {

                                                        transform: "translateY(-2px)"

                                                    },

                                                }),
                                                option: (styles, state) => ({
                                                    ...styles,
                                                    backgroundColor: state.isSelected ? "#2962FF" : "",
                                                    color: state.isSelected ? "#fff" : "",
                                                    fill: state.isSelected ? "#fff" : "",
                                                }),
                                                singleValue: base => ({
                                                    ...base,
                                                }),
                                                dropdownIndicator: base => ({
                                                    ...base,
                                                    color: "#000",
                                                    padding: "0px",
                                                }),
                                                menu: base => ({
                                                    ...base,
                                                    width: "105px"
                                                })
                                            }}
                                            components={{
                                                IndicatorSeparator: () => null, // Remove the indicator separator
                                                DropdownIndicator: () => (
                                                    <svg
                                                        className="dropdown-indicator-icon"
                                                        width="15"
                                                        height="15"
                                                        viewBox="0 0 48 48"
                                                        data-icon="caret-down"
                                                    >
                                                        <path d="M24.21 33.173l12.727-12.728c.78-.78.78-2.048 0-2.828-.78-.78-2.047-.78-2.828 0l-9.9 9.9-9.9-9.9c-.78-.78-2.047-.78-2.827 0-.78.78-.78 2.047 0 2.828L24.21 33.173z"></path>
                                                    </svg>
                                                ),
                                            }}
                                        />
                                    </div>

                                </div>

                                <div className="rightControl">
                                    {
                                        handle.active ? (
                                            <div onClick={handle.exit} className='btn'>
                                                <i className="bi bi-fullscreen-exit" style={{ fontSize: "large" }}></i>
                                            </div>

                                        ) : (
                                            <div onClick={handle.enter} className='btn'>
                                                <i className="bi bi-fullscreen" style={{ fontSize: "large" }}></i>
                                            </div>
                                        )
                                    }
                                </div>


                            </div>

                        </div>
                        <div className="card-body p-0">


                            <div id="chart_container" ref={chartContainerRef} style={{ height: "100%", width: "100%", position: "relative" }}>

                            </div>

                            <div className="btn-group btn-control">
                                {/* { setTimeScale({ ...timeScale, visibleItem: timeScale.visibleItem + 20 }); console.log({ ...timeScale, visibleItem: timeScale.visibleItem + 20 }) } */}
                                <div className="btn btn-light" onClick={() => handleClickToChangeRange("+")}>
                                    <i className="bi bi-plus-lg"></i>
                                </div>

                                <div className="btn btn-light" onClick={() => handleClickToChangeRange("-")}>
                                    <i className="bi bi-dash-lg"></i>
                                </div>

                                <div className="btn btn-light" onClick={() => handleClickToChangeRange("l")}>
                                    <i className="bi bi-chevron-left"></i>
                                </div>

                                <div className="btn btn-light" onClick={() => handleClickToChangeRange("r")}>
                                    <i className="bi bi-chevron-right"></i>
                                </div>
                                <div className="btn btn-light" onClick={() => handleClickToChangeRange("b")} style={{ visibility: btnVisible ? "visible" : "hidden" }}>
                                    <i className="bi bi-arrow-counterclockwise"></i>
                                </div>


                            </div>
                        </div>
                    </>

                ) : (
                    <div className="card-body p-0 w-100 d-flex justify-content-center align-items-center loading-frame" style={{ height: handle.node.current ? handle.node.current.offsetHeight + "px" : "500px" }}>
                        <div className="spinner-border" role="status" id="loading" style={{ width: handle.node.current ? (handle?.node?.current?.offsetHeight * 0.1) + "px" : "50px", height: handle.node.current ? (handle?.node?.current.offsetHeight * 0.1) + "px" : "50px", fontSize: handle.node.current ? (handle?.node?.current.offsetHeight * 0.04) + "px" : "20px" }}>
                            {/* Thêm nội dung của spinner nếu cần */}
                        </div>
                    </div>
                )}
            </div>

        </FullScreen>

    )
}

LightWeightChart.defaultProps = {
    themeColor: "light",
    symbol: "BTC-USD"
};
LightWeightChart.prototype = {
    themeColor: PropTypes.string.isRequired,
}