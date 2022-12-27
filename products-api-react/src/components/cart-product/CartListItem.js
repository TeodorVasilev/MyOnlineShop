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

    remove = () => {
        const token = localStorage.getItem('token');

        fetch(Constants.BASE_URL + `User/RemoveFromCart`,{
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
                cartIds: response
            })

            this.props.loadCartProducts();
        })
    }

    render() {
        return (
            <div className="col-12 border-bottom d-flex justify-content-evenly align-items-center">
                <div>
                    <img class="img-fluid p-1 product-img"
                        src="https://marks-uhren.de/wp-content/uploads/2021/04/Rolex-Datejust-26-vollgold-06.04.2021-2-scaled.jpg"
                        alt="" />
                </div>
                <div class="product-description ps-3">
                    <p class="mb-0 fw-bold product-name">{this.props.name}</p>
                    <p class="mt-0 mb-0 fw-light product-description">{this.props.description}</p>
                    <button onClick={this.remove}>Remove</button>
                </div>
                <div className="product-price">
                    <p class="mt-0 product-price">{this.props.price}$</p>
                </div>
                <div>
                    X
                </div>
                <div className="quantity">
                    <select>
                        <option>{this.props.quantity}</option>
                    </select>
                </div>
                <div>
                    =
                </div>
                <div className="total-price">
                    $
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