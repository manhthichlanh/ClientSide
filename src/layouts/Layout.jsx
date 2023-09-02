import { Outlet } from "react-router-dom"
import Header from "./Header";
// import Footer from "./Footer";
import "./Layout.css"
export default function Layout() {
    return (
        // <div className="wwwbinancecom-by-htmltodes1">
        //     <div className="divcss-tq0shg1">
        //         <Header></Header>
        //         <Outlet></Outlet>
        //         <Footer></Footer>
        //     </div>

        // </div>    
        <>
            <Header></Header>
            <Outlet></Outlet>
        </>

    );
}