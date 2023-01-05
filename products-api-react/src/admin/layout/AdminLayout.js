import React from "react";
import {HouseDoorFill, Speedometer, ListColumnsReverse, PeopleFill, Clipboard2CheckFill, Sliders2Vertical} from "react-bootstrap-icons";
import { Link } from "react-router-dom";

class AdminLayout extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div class="container-fluid">
                <div class="row flex-nowrap">
                    <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <span class="fs-5 d-none d-sm-inline">Menu</span>
                            </a>
                            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li class="nav-item">
                                    <Link to="/" class="nav-link align-middle px-0">
                                        <HouseDoorFill/> <span class="ms-1 d-none d-sm-inline">Home</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin" class="nav-link px-0 align-middle">
                                        <Speedometer/> <span class="ms-1 d-none d-sm-inline">Dashboard</span> 
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/products" class="nav-link px-0 align-middle">
                                        <ListColumnsReverse/> <span class="ms-1 d-none d-sm-inline">Products</span> 
                                    </Link>
                                </li>
                                <li>
                                    <Link class="nav-link px-0 align-middle">
                                        <Sliders2Vertical/> <span class="ms-1 d-none d-sm-inline">Props and Options</span> 
                                    </Link>
                                </li>
                                <li>
                                    <Link className="nav-link px-0 align-middle" to="/admin/users">
                                        <PeopleFill/> <span class="ms-1 d-none d-sm-inline">Users</span> 
                                    </Link>
                                </li>
                                <li>
                                    <a class="nav-link px-0 align-middle">
                                        <Clipboard2CheckFill/> <span class="ms-1 d-none d-sm-inline">Orders</span> 
                                    </a>
                                </li>
                            </ul>
                            <hr/>
                                <div class="dropdown pb-4">
                                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle"/>
                                            <span class="d-none d-sm-inline mx-1">admin</span>
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                                        <li><a class="dropdown-item" href="#">Settings</a></li>
                                        <li><a class="dropdown-item" href="#">Profile</a></li>
                                        <li>
                                            <hr class="dropdown-divider"/>
                                        </li>
                                        <li><a class="dropdown-item" href="#">Logout</a></li>
                                    </ul>
                                </div>
                        </div>
                    </div>
                    <div class="col py-3">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminLayout;