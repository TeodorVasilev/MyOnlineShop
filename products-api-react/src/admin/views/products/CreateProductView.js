import React from "react";
import AdminLayout from "../../layout/AdminLayout";
import Constants from "../../../constants/Constants";
import PropertySelect from "../../components/PropertySelect";
import FormData from "form-data";

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
            categoryId: 0,
            properties: [],
        },
        images: [],
        properties: [],
        propertySelectComponents: [[]]
    }

    componentDidMount() {
        this.loadCategories();
        this.loadProperties();
    }

    loadProperties = () => {
        const token = localStorage.getItem('token');
        fetch(Constants.BASE_URL + 'Properties', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(response => response.json())
            .then(response => {
                this.setState({
                    ...this.state,
                    properties: response
                })
            })
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

    saveImages = (productId) => {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('productId', productId);

        this.state.images.forEach((image) => {
            formData.append('images', image, image.name);
        });

        console.log(formData);

        fetch(Constants.BASE_URL + 'Images', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: formData
        });
    }

    createProduct = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const data = this.state.product;
        console.log(JSON.stringify(data));
        fetch(Constants.BASE_URL + `Products/Create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(response => {
                this.saveImages(response.id);
                alert('Product successfully created');
            })
    }

    addProperty = (property) => {
        let prop = this.state.product.properties.find(p => p.id == property.id);
        if (this.state.product.properties.includes(prop)) {
            let updatedProperties = this.state.product.properties.map(p => {
                if (p.id === prop.id) {
                    return { ...p, options: property.options ? property.options : p.options }
                } else {
                    return p;
                }
            });
            this.setState({
                ...this.state,
                product: {
                    ...this.state.product,
                    properties: updatedProperties
                }
            });
        } else {
            this.setState({
                ...this.state,
                product: {
                    ...this.state.product,
                    properties: [...this.state.product.properties, property]
                }
            })
        }
    }

    removeProperty = (id) => {
        let updatedProperties = this.state.product.properties.filter(prop => prop.id !== id);
        this.setState({
            ...this.state,
            product: {
                ...this.state.product,
                properties: updatedProperties
            }
        });
    }

    handleAddPropertySelect = (e) => {
        e.preventDefault();
        this.setState(state => {
            const id = state.propertySelectComponents.length;
            const propertySelectComponents = [...state.propertySelectComponents,
            <div className="col-md-3" key={id}>
                <PropertySelect properties={state.properties}
                    addProperty={this.addProperty}
                    removeProperty={this.removeProperty}
                    removePropertySelect={this.handleRemovePropertySelect}
                    selectPropertyCnt={this.state.propertySelectComponents.length}
                    id={id}
                />
            </div>]
            return { propertySelectComponents }
        });
    }

    handleRemovePropertySelect = (e, componentId, propertyId) => {
        e.preventDefault();
        console.log(componentId);
        console.log(propertyId);
        this.setState(state => {
            const propertySelectComponents = state.propertySelectComponents.map((component, index) => {
                if (index !== componentId) {
                    return component;
                }
            });
            return { propertySelectComponents };
        }, this.removeProperty(propertyId));
    }

    handleImageChange = event => {
        this.setState({
            images: Array.from(event.target.files)
        });
    };

    render() {
        console.log(this.state.images);
        return (
            <AdminLayout>
                <form onSubmit={this.createProduct}>
                    <div className="row">
                        <div className="form-group col-md-2">
                            <label htmlFor="productName">Product Name</label>
                            <input type="text" className="form-control" id="productName"
                                value={this.state.product.name}
                                onChange={e => this.setState({ product: { ...this.state.product, name: e.target.value } })} />
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="productPrice">Product Price</label>
                            <input type="number" className="form-control" id="productPrice"
                                value={this.state.product.price}
                                onChange={e => this.setState({ product: { ...this.state.product, price: e.target.value } })} />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="productCategory">Product Category</label>
                            <select className="form-control" id="productCategory"
                                onChange={e => this.setState({ product: { ...this.state.product, categoryId: e.target.value } })}>
                                {this.state.categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="productQuantity">Product Quantity</label>
                            <input type="number" className="form-control" id="productQuantity"
                                value={this.state.product.quantity}
                                onChange={e => this.setState({ product: { ...this.state.product, quantity: e.target.value } })} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="productDescription">Product Description</label>
                            <textarea className="form-control" id="productDescription" rows="3"
                                value={this.state.product.description}
                                onChange={e => this.setState({ product: { ...this.state.product, description: e.target.value } })}></textarea>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="productImages">Product Images</label>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={this.handleImageChange}
                            />
                            {this.state.images.map(image => (
                                <img key={image.name} src={URL.createObjectURL(image)} alt={image.name} />
                            ))}
                        </div>
                    </div>
                    <div className="row">
                        {this.state.propertySelectComponents.map(propertySelectComponent => propertySelectComponent)}
                    </div>
                    <div className="form-group col-4">
                        <button className="btn btn-success mt-3" onClick={this.handleAddPropertySelect}>AddProperty</button>
                    </div>
                    <button type="submit" className="btn btn-primary mt-5">Add Product</button>
                </form>
            </AdminLayout>
        );
    }
}

export default CreateProductView;