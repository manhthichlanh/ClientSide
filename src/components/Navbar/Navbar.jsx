import { Link } from "react-router-dom";
import "./Navbar.scss";
export default function Navbar() {
    return (
        <header>

            <nav className="navbar navbar-light navbar-expand-md bg-faded justify-content-center">
                <div className="container-fluid">
                    <a href="/" className="navbar-brand d-flex w-50 me-auto">Navbar 3</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsingNavbar3">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse w-100" id="collapsingNavbar3">
                        <ul className="navbar-nav w-100 justify-content-center">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link m-2 menu-item">
                                    <i className="bi bi-bar-chart-line"></i>
                                    <div className="link-name">Chart</div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/orderbook" className="nav-link m-2 menu-item " >
                                    <i className="bi bi-database"></i>
                                    <div className="link-name">OrderBook</div>

                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/coinlist" className="nav-link m-2 menu-item ">
                                    <i className="bi bi-list-columns-reverse"></i>
                                    <div className="link-name">CoinList</div>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="manhnguyenf.a123@gmail.com" className="nav-link m-2 menu-item">
                                    <i className="bi bi-question-circle-fill"></i>
                                    <div className="link-name">CoinList</div>
                                </Link>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav ms-auto w-100 justify-content-end">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Right</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Right</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Menu </a>
                                <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarScrollingDropdown">
                                    <li><a className="dropdown-item" href="#">Item</a></li>
                                    <li><a className="dropdown-item" href="#">Item</a></li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li><a className="dropdown-item" href="#">Item</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            
        </header>

    )
}
