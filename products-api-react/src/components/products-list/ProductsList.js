import React from "react";
import Constants from "../../constants/Constants";
import ProductsListItem from "../product/ProductListItem";

class ProductsList extends React.Component {
    constructor(props) {
        super(props)
        this.loadProducts();
    }

    state = {
        products: [],
        pages: [],
        currentPage: 1
    }

    changePage = (event, page) => {
        event.preventDefault();
        this.setState({
            currentPage: page
        }, function (){
            this.loadProducts();
        })
    }

    loadProducts = () => {
        fetch(Constants.BASE_URL + 'Products' + `?CurrentPage=${this.state.currentPage}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    products: response.products,
                    pages: Array.from({ length: response.totalPages }, (_, i) => i + 1)
                })
            })
    }

    render() {
        return (
            <div>
                <div class="row gx-3">
                    {this.state.products.map(product =>
                        <ProductsListItem {...product} key={product.id} ></ProductsListItem>
                    )}
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                            {this.state.pages.map(page =>
                                <li className="page-item">
                                    <a className={`page-link`}
                                        onClick={(e) => this.changePage(e,page)}
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

export default ProductsList;