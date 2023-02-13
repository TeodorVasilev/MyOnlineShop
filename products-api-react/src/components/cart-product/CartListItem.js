import "./CartListItem.css";
import React from "react";
import Constants from "../../constants/Constants";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/AuthActions";

class CartListItem extends React.Component {
    constructor(props) {
        super(props)
    }

    increaseQnt = () => {
        const token = localStorage.getItem('token');

        fetch(Constants.BASE_URL + 'Cart/AddToCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                userId: this.props.layout.user.id,
                productId: this.props.id,
                quantity: 1
            })
        })
        .then(response => response.json())
        .then(response => {
            this.props.setUser({
                ...this.props.layout.user,
                cart: response
            })

            this.props.loadCartProducts();
        })
    }

    removeQnt = () => {
        if(this.props.quantity -1 === 0){
            this.remove();
        }

        const token = localStorage.getItem('token');

        fetch(Constants.BASE_URL + 'Cart/AddToCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                userId: this.props.layout.user.id,
                productId: this.props.id,
                quantity: -1
            })
        })
        .then(response => response.json())
        .then(response => {
            this.props.setUser({
                ...this.props.layout.user,
                cart: response
            })

            this.props.loadCartProducts();
        })
    }

    remove = () => {
        const token = localStorage.getItem('token');

        fetch(Constants.BASE_URL + `Cart/RemoveFromCart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                userId: this.props.layout.user.id,
                productId: this.props.id
            })
        })
            .then(response => response.json())
            .then(response => {
                this.props.setUser({
                    ...this.props.layout.user,
                    cart: response
                })

                this.props.loadCartProducts();
            })
    }

    render() {
        let image = '';
        if(this.props.images.length !== 0){
            image = `data:image/png';base64,${this.props.images[0].binaryData}`;
        }
        let price = this.props.quantity * this.props.price;
        return (
            <div className="cart-item col-12 border-bottom d-flex justify-content-evenly align-items-center">
                <div>
                    <img class="img-fluid p-1 product-img"
                        src={image}
                        alt="" />
                </div>
                <div class="product-description ps-3">
                    <p class="mb-0 fw-bold product-name">{this.props.name}</p>
                    <p class="mt-0 mb-0 fw-light product-description">{this.props.description}</p>
                    <button className="remove-btn p-0 text-danger fs-6" onClick={this.remove}>Remove</button>
                </div>
                <div className="product-price">
                    <p class="m-0 p-0 product-price">{this.props.price}$</p>
                </div>
                <div>
                    X
                </div>
                <div className="quantity w-25">
                    <div className="d-flex justify-content-evenly">
                        <button className="btn btn-success btn-sm" onClick={this.increaseQnt}>+</button>
                        <input className="quantity-field" readOnly value={this.props.quantity} />
                        <button className="btn btn-danger btn-sm" onClick={this.removeQnt}>-</button>
                    </div>
                </div>
                <div>
                    =
                </div>
                <div className="total-price">
                    {price}$
                </div>
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
        setUser: actions.setUser,
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(CartListItem);