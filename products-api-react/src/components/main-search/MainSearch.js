import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import * as actions from "../../actions/ProductActions";
import { bindActionCreators } from "redux";
import "./MainSearch.css"

class MainSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        query: ''
    }
    
    searchProducts = () => {
        let data = {
            query: this.state.query,
            page: 1,
            perPage:4,
            categoryId: 0
        }
        this.props.setProducts(data);
    }

    render() {
        return (
            <div className="d-flex">
                <div className="main-search-input-wrap ms-5">
                    <div className="main-search-input fl-wrap">
                        <div className="main-search-input-item">
                            <input
                                type="text"
                                placeholder="Search Products..."
                                onChange={(e) => this.setState({query: e.target.value})}
                            />
                        </div>
                        <Link className="main-search-button text-decoration-none" onClick={this.searchProducts} to="/products">
                            Search
                        </Link>
                    </div>
                </div>
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
        setProducts: actions.setProducts
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(MainSearch);
