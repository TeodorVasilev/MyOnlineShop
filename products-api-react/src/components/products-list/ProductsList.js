import React from "react";
import ProductsListItem from "../product/ProductListItem";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/ProductActions";

class ProductsList extends React.Component {
    constructor(props) {
        super(props)
    }

    changePage = (event, page) => {
        event.preventDefault();
        const data = {
            categoryId: this.props.category.id,
            page
        }

        this.loadProducts(data);
    }

    componentDidMount(){       
        const data = {
            categoryId: this.props.category.id,
            page: 1
        }

        this.loadProducts(data);
    }

    loadProducts = (data) =>{
        this.props.setProducts(data);
    }

    render() {
        console.log(this.props.products);
        return (
            <div>
                <div class="row gx-3">
                    {this.props.products.products.map(product =>
                        <ProductsListItem {...product} key={product.id} width={this.props.width}></ProductsListItem>
                    )}
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                            {this.props.products.pages.map(page =>
                                <li className="page-item">
                                    <a className={`page-link`}
                                        onClick={(e) => this.changePage(e, page)}
                                        href="#">
                                        {page}
                                    </a>
                                </li>
                            )}
                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.products,
        category: state.category
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setProducts: actions.setProducts,
    }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductsList);