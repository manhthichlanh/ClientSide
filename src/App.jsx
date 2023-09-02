import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'

//||Components
import Home from "./pages/Home/Home"
import OrderBook from "./pages/OrderBook/OrderBook";
import Market from "./pages/Market/Market";
import Layout from "./layouts/Layout";
import NoPage from "./pages/NoPage/NoPage";
//||Components
function App() {


  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="quote/:pair/" element={<Home />} />
          <Route path="orderbook" element={<OrderBook />} />
          <Route path="market" element={<Market />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
