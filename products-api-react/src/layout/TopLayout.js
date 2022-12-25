import "./TopLayout.css";
import React from "react";
import { PersonFill, HeartFill, CartFill, EnvelopeAt, Facebook, Whatsapp, Star, StarFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import CategoriesList from "../components/categories-list/CategoriesList";

class TopLayout extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="p-0 container-fluid bg-light">
                    <div className='container-xxl d-flex justify-content-between review-contacts'>
                        <div className="review-link">
                            <Link className='text-decoration-none'>
                                <div className='d-flex align-items-center'>
                                    <Star className='me-1'></Star>
                                    <span>Client Reviews</span>
                                </div>
                            </Link>
                        </div>
                        <div className="contacts d-flex">
                            <Link className='text-decoration-none'>
                                <div className='contact-item me-4 d-flex align-items-center'>
                                    <EnvelopeAt className='me-1'></EnvelopeAt>
                                    <span>contact@myonlineshop.com</span>
                                </div>
                            </Link>
                            <Link className='text-decoration-none'>
                                <div className='contact-item d-flex align-items-center'>
                                    <Facebook className='me-1'></Facebook>
                                    <span>MyOnlineShop</span>
                                </div>
                            </Link>
                            <Link className='text-decoration-none'>
                                <div className='contact-item ms-4 d-flex align-items-center'>
                                    <Whatsapp className='me-1'></Whatsapp>
                                    <span>0898888888</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid container-xxl">
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
                                    <div class="main-search-input-wrap">
                                        <div class="main-search-input fl-wrap">
                                            <div class="main-search-input-item">
                                                <input type="text" placeholder="Search Products..." />
                                            </div>
                                            <button class="main-search-button">Search</button>
                                        </div>
                                    </div>
                                    {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-primary" type="submit">Search</button> */}
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
                                        <Link className="position-relative nav-link d-flex flex-column align-items-center mt-1">
                                            <HeartFill size={23}></HeartFill>
                                            <span className="nav-link-text">Favorites</span>
                                            <span class="position-absolute top-0 start-50 badge rounded-pill bg-danger">
                                                2
                                                <span class="visually-hidden">unread messages</span>
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="nav-item ms-4">
                                        <Link className="position-relative nav-link d-flex flex-column align-items-center mt-1">
                                            <CartFill size={23}></CartFill>
                                            <span className="nav-link-text">Cart</span>
                                            <span class="position-absolute top-0 start-50 badge rounded-pill bg-danger">
                                                2
                                                <span class="visually-hidden">unread messages</span>
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
                <CategoriesList></CategoriesList>
                {this.props.children}
            </div>
        );
    }
}

export default TopLayout;