import React from "react";
import ProductListItem from "../../../admin/components/ProductListItem";
import Constants from "../../../constants/Constants";
import AdminLayout from "../../layout/AdminLayout";
import { Link } from "react-router-dom";

class ProductsView extends React.Component {
    constructor(props) {
        super(props);
        this.loadProducts();
    }

    state = {
        products: [],
        pages: [],
        perPage: 12
    }

    deleteProduct = (id) => {
        const token = localStorage.getItem('token');

        fetch(Constants.BASE_URL + `Products/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            this.loadProducts(1, this.state.perPage)
        }).catch(error => {
            console.error(error);
        });
    }

    changePerPage = (value) => {
        this.setState({
            perPage: value
        }, () => {
            this.loadProducts(1, this.state.perPage)
        })
    }

    changePage = (event, page) => {
        event.preventDefault();
        this.loadProducts(page, this.state.perPage);
    }

    loadProducts = (page = 1, perPage = 12) => {
        const token = localStorage.getItem('token');

        fetch(Constants.BASE_URL +
            'Products' + `?CurrentPage=${page}&CategoryId=${0}&PriceFrom=0&PriceTo=0&Order=0&PerPage=${perPage}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
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
            <AdminLayout>
                <div className="d-flex">
                    <div>
                        <h3>All Products</h3>
                    </div>
                    <div className="ms-5">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="ms-5">
                        <label>Per page: </label>
                        <select onChange={(e) => this.changePerPage(e.target.value)}>
                            <option value={12}>12</option>
                            <option value={24}>24</option>
                            <option value={0}>All</option>
                        </select>
                    </div>
                </div>
                <div>
                    <Link to="/admin/createproduct">Add new product</Link>
                </div>
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map(product =>
                            <ProductListItem product={product} delete={this.deleteProduct}></ProductListItem>
                        )}
                    </tbody>
                </table>
                <ul className="pagination">
                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                    {this.state.pages.map(page =>
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
            </AdminLayout>
        );
    }
}

export default ProductsView;