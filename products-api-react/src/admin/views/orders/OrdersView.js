import React from "react";
import AdminLayout from "../../layout/AdminLayout";
import { Link } from "react-router-dom";
import Constants from "../../../constants/Constants";

class OrdersView extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        orders: []
    }

    loadOrders = () => {
        const token = localStorage.getItem('token');
        fetch(Constants.BASE_URL + 'Order', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => response.json())
            .then(response => {
                this.setState({
                    orders: response
                })
            });
    }

    componentDidMount() {
        this.loadOrders();
    }

    render() {
        return (
            <AdminLayout>
                <div className="d-flex">
                    <div>
                        <h3>All Orders</h3>
                    </div>
                    <div className="ms-5">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
                <div>
                </div>
                <table class="table table-striped table-sm text-center">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">User Email</th>
                            <th scope="col">User Mobile</th>
                            <th scope="col">Shipping Address</th>
                            <th scope="col">Status</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Date</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.orders.map(order =>
                            <tr>
                                <td scope="col">{order.id}</td>
                                <td scope="col">{order.userEmail}</td>
                                <td scope="col">{order.mobilePhone}</td>
                                <td scope="col">{order.shippingAddress}</td>
                                <td scope="col">{order.status}</td>
                                <td scope="col">{order.totalPrice}$</td>
                                <td scope="col">{order.orderDate}</td>
                                <td scope="col">
                                    <Link to={{ pathname: "/admin/order", state: { orderId: order.id } }}>Details</Link>
                                    <span> / </span>
                                    <Link className="text-warning">Shipped</Link>
                                    <span> / </span>
                                    <Link className="text-success">Finished</Link>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </AdminLayout>
        );
    }
}

export default OrdersView;