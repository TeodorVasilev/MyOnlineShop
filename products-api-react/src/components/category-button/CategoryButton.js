import "./CategoryButton.css";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions/CategoryActions"
import * as productActions from "../../actions/ProductActions"
import { Link } from "react-router-dom";


class CategoryButton extends React.Component {
    constructor(props) {
        super(props);
    }

    selectCategory = () => {
        this.props.setCategory({
            categoryId: this.props.id,
            categoryName: this.props.name
        })

        const data = {
            categoryId: this.props.id,
            page: 1
        }

        this.props.setProducts(data);
    }

    render() {
        return (
            <div className="col-2 d-flex p-0">
                <Link onClick={this.selectCategory} to="/products"
                    className="cat-btn text-decoration-none w-100 border-0 fw-bold border-start text-uppercase">
                    {this.props.name}
                </Link>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setCategory: actions.setCategory,
        setProducts: productActions.setProducts
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(CategoryButton);