import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/AuthActions";
import Constants from "../../constants/Constants";
import CartProductListItem from "../cart-product/CartListItem";

class CartProductList extends React.Component{
    constructor(props){
        super(props);
        this.loadCartProducts();
    }

    state = {
        products: []
    }

    loadCartProducts = () => {
        const token = localStorage.getItem('token');

        fetch(Constants.BASE_URL + `User/UserCart?userId=${this.props.layout.user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(response => {
            this.setState({
                products: response
            });
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