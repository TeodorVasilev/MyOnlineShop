import './TopLayout.css';
import React from "react";
import { PersonFill, HeartFill, CartFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

class TopLayout extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <div className="me-auto d-flex align-items-center">
                            <a className="navbar-brand logo" href="#"><span className="logo-my">My</span>OnlineShop</a>
                            <div className="slogan">
                                Only
                                <br></br>
                                Original
                                <br></br>
                                Merchandise
                            </div>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <div className="ms-auto me-auto">
                                <form className="d-flex" role="search">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-primary" type="submit">Search</button>
                                </form>
                            </div>
                            <div className="ms-auto">
                                <ul className="navbar-nav mb-2 mb-lg-0">
                                    <li className="nav-item me-4">
                                        <Link className="nav-link d-flex flex-column align-items-center" to="/login">
                                        <PersonFill size={28}></PersonFill>
                                        <span className="nav-link-text">Login</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link d-flex flex-column align-items-center mt-1">
                                        <HeartFill size={23}></HeartFill>
                                        <span className="nav-link-text">Favorites</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item ms-4">
                                        <Link className="nav-link d-flex flex-column align-items-center mt-1">
                                        <CartFill size={23}></CartFill>
                                        <span className="nav-link-text">Cart</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
                {this.props.children}
            </div>
        );
    }
}

export default TopLayout;