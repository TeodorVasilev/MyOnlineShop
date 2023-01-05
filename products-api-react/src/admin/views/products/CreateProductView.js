import React from "react";
import AdminLayout from "../../layout/AdminLayout";
import Constants from "../../../constants/Constants";

class CreateProductView extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        categories: [],
        product: {
            name: "",
            price: "",
            quantity: "",
            description: "",
            categoryId: 0
        }
    }

    componentDidMount() {
        this.loadCategories();
    }

    loadCategories = () => {
        const token = localStorage.getItem('token');

        fetch(Constants.BASE_URL + 'Categories', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => response.json())
            .then(response => {
                this.setState({
                    categories: response
                })
            })
    }

    createProduct = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const data = this.state.product;
        console.log(data);
        fetch(Constants.BASE_URL + `Products/Create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(response => {
                alert('Product successfully created');
            })
    }

    render() {
        return (
            <AdminLayout>
                <form onSubmit={this.createProduct}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="productName">Product Name</label>
                            <input type="text" className="form-control" id="productName"
                                value={this.state.product.name}
                                onChange={e => this.setState({ product: { ...this.state.product, name: e.target.value } })} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="productPrice">Product Price</label>
                            <input type="number" className="form-control" id="productPrice"
                                value={this.state.product.price}
                                onChange={e => this.setState({ product: { ...this.state.product, price: e.target.value } })} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="productCategory">Product Category</label>
                            <select className="form-control" id="productCategory"
                            onChange={e => this.setState({product: {...this.state.product, categoryId: e.target.value}})}>
                                {this.state.categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="productQuantity">Product Quantity</label>
                            <input type="number" className="form-control" id="productQuantity"
                                value={this.state.product.quantity}
                                onChange={e => this.setState({ product: { ...this.state.product, quantity: e.target.value } })} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="productDescription">Product Description</label>
                        <textarea className="form-control" id="productDescription" rows="3"
                            value={this.state.product.description}
                            onChange={e => this.setState({ product: { ...this.state.product, description: e.target.value } })}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Product</button>
                </form>
            </AdminLayout>
        );
    }
}

export default CreateProductView;