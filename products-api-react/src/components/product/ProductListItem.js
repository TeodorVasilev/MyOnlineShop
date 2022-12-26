import "./ProductListItem.css";
import React from "react";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { connect } from "react-redux";
import * as actions from "../../actions/AuthActions";
import { bindActionCreators } from "redux";
import Constants from "../../constants/Constants";

class ProductsListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isFavorite : false,
    }

    toggleFavorites = () => {
        const token = localStorage.getItem('token');

        fetch(Constants.BASE_URL + 'User/ToggleFavorites', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`,
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

    render() {
        let icon;
        if(this.props.layout.isLogged){
            if(this.props.layout.user.favoriteIds.includes(this.props.id)){
                icon = <button onClick={this.toggleFavorites} className="heart-fill d-none fav-btn"><HeartFill size={32}></HeartFill></button>
            } else {
                icon = <button onClick={this.toggleFavorites} className="heart-empty d-none fav-btn"><Heart size={32}></Heart></button>
            }
        }

        return (
            <div class="col-3">
                <div class="product border rounded">
                    {icon}
                    <a href="/" class="text-decoration-none">
                        <div>
                            <img class="img-fluid p-1"
                                src="https://marks-uhren.de/wp-content/uploads/2021/04/Rolex-Datejust-26-vollgold-06.04.2021-2-scaled.jpg"
                                alt="" />
                        </div>
                        <div class="product-description ps-3">
                            <p class="mb-0 fw-bold product-name">{this.props.name}</p>
                            <p class="mt-0 mb-0 fw-light product-description">{this.props.description}</p>
                            <p class="mt-0 product-price">{this.props.price}$</p>
                        </div>
                    </a>
                    <div class="d-flex justify-content-center pb-3">
                        <button class="btn btn-secondary quick-view d-none">Quick View</button>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductsListItem)