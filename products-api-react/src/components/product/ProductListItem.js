import "./ProductListItem.css";
import React from "react";
import { Link } from "react-router-dom";
import { Heart, HeartFill, CartPlus, CartPlusFill } from "react-bootstrap-icons";
import { connect } from "react-redux";
import * as actions from "../../actions/AuthActions";
import { bindActionCreators } from "redux";
import Constants from "../../constants/Constants";

class ProductsListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isFavorite: false,
    }

    toggleFavorites = () => {
        const token = localStorage.getItem('token');

        fetch(Constants.BASE_URL + 'Favorites/ToggleFavorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                userId: this.props.layout.user.id,
                productId: this.props.id
            })
        }).then(response => response.json())
            .then(response => {
                this.props.setUser({
                    ...this.props.layout.user,
                    favoriteIds: response
                })
            })
    }

    addToCart = () => {
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
            })
    }
    render() {
        let favoriteButton;
        let addToCartButton;
        if (this.props.layout.isLogged) {
            if (this.props.layout.user.favoriteIds.includes(this.props.id)) {
                favoriteButton = <button onClick={this.toggleFavorites} className="heart-fill d-none fav-btn"><HeartFill size={32}></HeartFill></button>
            } else {
                favoriteButton = <button onClick={this.toggleFavorites} className="heart-empty d-none fav-btn"><Heart size={32}></Heart></button>
            }

            if (this.props.layout.user.cart.productIds.includes(this.props.id)) {
                addToCartButton = <button onClick={this.addToCart} className="cart-fill d-none fav-btn"><CartPlusFill size={32}></CartPlusFill></button>
            } else {
                addToCartButton = <button onClick={this.addToCart} className="cart-empty d-none fav-btn"><CartPlus size={32}></CartPlus></button>
            }
        }

        const width = `col-${this.props.width} pb-3`
        return (
            <div className={width}>
                    <div className="product border rounded">
                        {favoriteButton}
                        {addToCartButton}
                        <Link to={{ pathname: "product", state: { productId: this.props.id } }} className="text-decoration-none">
                            <div>
                                <img class="img-fluid p-1"
                                    src="https://marks-uhren.de/wp-content/uploads/2021/04/Rolex-Datejust-26-vollgold-06.04.2021-2-scaled.jpg"
                                    alt="" />
                            </div>
                            <div className="product-description ps-3">
                                <p className="mb-0 fw-bold product-name">{this.props.name}</p>
                                <p className="mt-0 mb-0 fw-light product-description">{this.props.description}</p>
                                <p className="mt-0 product-price">{this.props.price}$</p>
                            </div>
                        </Link>
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
        setUser: actions.setUser
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsListItem)