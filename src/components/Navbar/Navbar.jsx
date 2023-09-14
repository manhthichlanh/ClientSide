import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
    const { pathname } = useLocation();
    const splitLocation = pathname.split("/").slice(1)[0];
    const [showMenu, setShowMenu] = useState(false);
    const headerRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (headerRef.current && !headerRef.current.contains(e.target)) {
                if (showMenu) setShowMenu(false )
            }
        };
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showMenu]
    )
    return (
        <header ref={headerRef}>

            <nav className="navbar navbar-light navbar-expand-md bg-faded justify-content-center">
                <div className="container-fluid px-5">
                    <a href="/" className="navbar-brand d-flex w-50 me-auto">
                        <div className="nav-logo h1 m-0">
                            FINAN
                            <span>
                                CY
                            </span>

                        </div>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsingNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse w-100 h-100" id="collapsingNavbar">
                        <ul className="navbar-nav w-100 justify-content-center">
                            <li className={`nav-item ${["", "quote"].includes(splitLocation) ? "active" : ""}`}>
                                <Link to="/" className="nav-link m-2 menu-item">
                                    <i className="bi bi-bar-chart-line"></i>
                                    <div className="link-name">Chart</div>
                                </Link>
                            </li>

                            <li className={`nav-item ${splitLocation.includes("market") ? "active" : ""}`} >
                                <Link to="/market" className="nav-link m-2 menu-item ">
                                    <i className="bi bi-list-columns-reverse"></i>
                                    <div className="link-name">CoinMarket</div>
                                </Link>
                            </li>
                            <li className={`nav-item  ${splitLocation.includes("orderbook") ? "active" : ""}`} >
                                <Link to="/orderbook" className="nav-link m-2 menu-item">
                                    <i className="bi bi-database"></i>
                                    <div className="link-name">OrderBook</div>

                                </Link>
                            </li>



                        </ul>
                        <ul className="nav navbar-nav ms-auto w-100 justify-content-end">
                            <li className="nav-item">
                                <a href="https://mail.google.com/" className="nav-link m-2 menu-item">
                                    <i className="bi bi-question-circle-fill"></i>
                                    <div className="link-name">Help</div>
                                </a>
                            </li>
                            <li className="nav-item dropdown" onClick={() => { setShowMenu(!showMenu) }}>
                                <a className="nav-link menu-item m-1 d-flex justify-content-around" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <div className="person-icon">
                                        <i className="bi bi-person-square"></i>
                                    </div>

                                    <div className="link-name">
                                        <div className="name text-uppercase">nguyen van manh</div>
                                    </div>
                                    <div className="dropdown-icon">
                                        <svg
                                            className="dropdown-indicator-icon"
                                            width="15"
                                            height="15"
                                            viewBox="0 0 48 48"
                                            data-icon="caret-down"
                                        >
                                            <path d="M24.21 33.173l12.727-12.728c.78-.78.78-2.048 0-2.828-.78-.78-2.047-.78-2.828 0l-9.9 9.9-9.9-9.9c-.78-.78-2.047-.78-2.827 0-.78.78-.78 2.047 0 2.828L24.21 33.173z"></path>
                                        </svg>
                                    </div>
                                </a>
                                <div className={"dropdown-menu w-100 dropdown-menu-end " + (showMenu ? "show" : "")} aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item active" href='mailto:manhnguyenf.a123@gmail.com?subject=" subject text' >
                                        <div className="t-icon">
                                            <i className="bi bi-google"></i>

                                        </div>
                                        <span>manhnguyenf.a123@gmail.com</span>
                                    </a>
                                    <a className="dropdown-item" href='tel:+848344444916'>
                                        <div className="t-icon">
                                            <i className="bi bi-phone"></i>

                                        </div>
                                        <span>+84 834 4444 916</span>
                                    </a>
                                    <a className="dropdown-item" href="https://github.com/manhthichlanh/">
                                        <div className="t-icon">
                                            <i className="bi bi-github"></i>

                                        </div>
                                        <span>https://github.com/manhthichlanh/</span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </header >

    )
}
