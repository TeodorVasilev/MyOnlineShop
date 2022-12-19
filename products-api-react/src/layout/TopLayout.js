import React from "react";
import { Link } from "react-router-dom";

class TopLayout extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav style={{height: "20vh"}} className="navbar navbar-expand-lg bg-light">
                    <div className="container">
                        <div className="me-auto w-25">
                            <a className="navbar-brand" href="#">MyOnlineShop</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <div className="ms-auto me-auto">
                                <form className="d-flex" role="search">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                                </form>
                            </div>
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Link</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Disabled</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {this.props.children}
            </div>
        );
    }
}

export default TopLayout;