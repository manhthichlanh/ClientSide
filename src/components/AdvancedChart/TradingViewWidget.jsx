// TradingViewWidget.jsx

import { useEffect, useRef } from 'react';
let tvScriptLoadingPromise;

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef();

  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

      function createWidget() {
        if (document.getElementById('tradingview_1e2f9') && 'TradingView' in window) {
          new window.TradingView.widget({
            symbol: "BTC/USD", // default symbol
            interval: "1H", // default interval
            fullscreen: true, // displays the chart in the fullscreen mode
            container: "tradingview-widget-container",
            container_id: "tradingview_1e2f9"
          });
        }
      }
    },
    []
  );

  return (
    <div className='tradingview-widget-container container-fluid'>
      <div id='tradingview_1e2f9' />
      <div className="tradingview-widget-copyright">
      </div>
    </div>
  );
}
