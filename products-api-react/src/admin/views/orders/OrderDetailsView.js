import React from "react";
import Constants from "../../../constants/Constants";
import AdminLayout from "../../layout/AdminLayout";

class OrderDetailsView extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        order: {},
    }

    loadOrder = () => {
        const token = localStorage.getItem('token');

        fetch(Constants.BASE_URL + `Order/${this.props.location.state.orderId}`,{
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(response => response.json())
        .then(response => {
            this.setState({
                order: response
            })
        })
    }
    
    componentDidMount(){
        this.loadOrder();
    }

    render() {
        // console.log(this.props.location.state.orderId);
        return (
            <AdminLayout>
                            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">User Details</h5>
                                <p className="card-text">Name: data</p>
                                <p className="card-text">Email: data</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Order Details</h5>
                                <p className="card-text">Order ID: {this.state.order.id}</p>
                                <p className="card-text">Order Date: {this.state.order.orderDate}</p>
                                <p className="card-text">Total Price: {this.state.order.totalPrice}$</p>
                                <p className="card-text">Shipping Address: {this.state.order.shippingAddress}</p>
                                <p className="card-text">Status: {this.state.order.status}</p>
                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary" >Ship</button>
                                    <button className="btn btn-success" >Finish</button>
                                    <button className="btn btn-danger" >Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </AdminLayout>
        );
    }
}

export default OrderDetailsView;