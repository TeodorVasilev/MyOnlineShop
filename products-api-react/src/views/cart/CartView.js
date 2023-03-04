import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/AuthActions";
import TopLayout from "../../layout/TopLayout";
import Constants from "../../constants/Constants";
import jwt_decode from "jwt-decode";
import CartProductList from "../../components/cart-product-list/CartList";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

class CartView extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        shippingAddres: '',
        mobilePhone: ''
    }

    order = () => {
        const token = localStorage.getItem('token');
        let data = {
            mobilePhone: this.state.mobilePhone,
            userId: this.props.layout.user.id,
            userEmail: this.props.layout.user.email,
            shippingAddress: this.state.shippingAddres,
            totalPrice: this.props.layout.user.cart.totalPrice,
        }
        console.log(data);
        fetch(Constants.BASE_URL + 'Order', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(response => {
                console.log(response);
            })
    }

    render() {
        if (this.props.layout.isLogged === false) {
            return <Redirect to="/login"></Redirect>
        }
        return (
            <TopLayout>
                <div className="container mt-4">
                    <div className="row gx-3">
                        <div className="col-8 cart-panel">
                            <div className="border rounded">
                                <div className="border-bottom">
                                    <h4 className="text-uppercase p-2">Cart</h4>
                                </div>
                                <div className="container-fluid">
                                    <CartProductList></CartProductList>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 order-panel">
                            <div className="border rounded">
                                <div className="border-bottom">
                                    <h4 className="text-uppercase p-2">Order</h4>
                                </div>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="shippingAddress">Mobile phone</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="shippingAddress"
                                            defaultValue={this.state.mobilePhone}
                                            onChange={(e) => this.setState({ mobilePhone: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="shippingAddress">Shipping Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="shippingAddress"
                                            defaultValue={this.state.shippingAddress}
                                            onChange={(e) => this.setState({ shippingAddres: e.target.value })}
                                        />
                                    </div>
                                </form>
                                <div className="d-flex flex-column align-items-center">
                                    <div>
                                        Total price: {this.props.layout.user.cart.totalPrice} $
                                    </div>
                                    <div>
                                        {/* <button className="btn btn-success" onClick={this.order}>Order</button> */}
                                        <PayPalScriptProvider options={{ "client-id": "AYKoWj-f0l52VJTRTS2lPHN8HnkVOJZ6AY0rkAo2gdK2woxpELy-peR26_hrSfchkTcx2lvmluZIRlUu" }}>
                                            <PayPalButtons style={{
                                                layout: "horizontal",
                                                color: "white",
                                                label: "buynow"
                                            }}
                                                createOrder={(data, actions) => {
                                                    return actions.order.create({
                                                        purchase_units: [{
                                                            amount: {
                                                                value: this.props.layout.user.cart.totalPrice,
                                                            }
                                                        }]
                                                    })
                                                }}
                                                onApprove={(data, actions) => {
                                                    return actions.order.capture().then((details) => {
                                                        this.order();
                                                        alert(`Your order is placed successfully`);
                                                        this.props.history.push('/');
                                                    });
                                                }}
                                            />
                                        </PayPalScriptProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </TopLayout>
        );
    }
}

const mapStateToProps = state => {
    return {
        layout: state.layout
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setAuthState: actions.setAuthState,
        setUser: actions.setUser,
    }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartView));