import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/AuthActions";
import TopLayout from "../../layout/TopLayout";
import Constants from "../../constants/Constants";
import jwt_decode from "jwt-decode";
import CartProductList from "../../components/cart-product-list/CartList";

class CartView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.layout.isLogged === false) {
            return <Redirect to="/login"></Redirect>
        }
        console.log(this.props.layout.user.cart)

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
                                <div className="d-flex flex-column align-items-center">
                                <div>
                                    Total price: {this.props.layout.user.cart.totalPrice} $
                                </div>
                                <div>
                                    <button className="btn btn-success">Order</button>
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