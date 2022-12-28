import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/AuthActions";
import NetworkClient from "../../api/NetworkClient";
import Constants from "../../constants/Constants";
import CartProductListItem from "../cart-product/CartListItem";

class CartProductList extends React.Component{
    constructor(props){
        super(props);
        this.loadCartProducts();
    }

    state = {
        products: [],
    }

    loadCartProducts = () => {
        NetworkClient.get(Constants.BASE_URL + `Cart/UserCart?userId=${this.props.layout.user.id}`)
        .then(response => response.json())
        .then(response => {
            this.setState({
                products: response.products,
            });
            this.props.setUser({
                ...this.props.layout.user,
                cart: {
                    ...this.props.layout.user.cart,
                    totalPrice: response.totalPrice
                }
            })
        })
    }

    render(){
        return(
            <div className="row">
                    {this.state.products.map(product =>
                        <CartProductListItem {...product} key={product.id} loadCartProducts={this.loadCartProducts} ></CartProductListItem>
                    )}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartProductList);