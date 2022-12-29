import "./CategoryButton.css";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions/CategoryActions"
import { Link } from "react-router-dom";


class CategoryButton extends React.Component {
    constructor(props) {
        super(props);
    }

    selectCategory = () => {


        this.props.setCategory({
            id: this.props.id,
            name: this.props.name
        });
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
        category: state.category
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setCategory: actions.setCategory,
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(CategoryButton);