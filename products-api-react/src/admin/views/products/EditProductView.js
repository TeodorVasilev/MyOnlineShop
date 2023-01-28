import React from "react";
import Constants from "../../../constants/Constants";
import AdminLayout from "../../layout/AdminLayout";
import PropertySelect from "../../components/PropertySelect";

class EditProductView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadProperties();
        this.loadProduct();
        this.loadCategories();
    }

    state = {
        product: {},
        categories: [],
        properties: [],
        propertySelectComponents: []
    }

    changeCategory = (e) => {
        this.setState({
            product: {
                ...this.state.product,
                categoryId: e.target.value
            }
        })
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

    loadProductProperties = () => {
        const propSelectComponents = this.state.product.properties.map((prop,index) =>
            <div className="col-md-3" >
                <PropertySelect
                    properties={this.state.properties}
                    selectedOptions={prop.options}
                    addProperty={this.addProperty}
                    removeProperty={this.removeProperty}
                    removePropertySelect={this.handleRemovePropertySelect}
                    selectPropertyCnt={this.state.product.properties.length}
                    id={index}
                    key={index}
                    defaultValue={prop.id}
                />
            </div>
        );

        console.log(propSelectComponents);

        this.setState({
            propertySelectComponents: propSelectComponents
        })
    }

    loadProduct = () => {
        const token = localStorage.getItem('token');

        fetch(Constants.BASE_URL + `Products/${this.props.location.state.productId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => response.json())
            .then(response => {
                this.setState({
                    product: response
                }, this.loadProductProperties)
            })
    }

    addProperty = (property) => {
        console.log(property);
        let prop = this.state.product.properties.find(p => p.id == property.id);
        if(this.state.product.properties.includes(prop)){
            let updatedProperties = this.state.product.properties.map(p => {
                if (p.id === prop.id) {
                    return {...p, options: property.options ? property.options : p.options }
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
        console.log(id);
        let updatedProperties = this.state.product.properties.filter(prop => prop.id !== id);
        this.setState({
            ...this.state,
            product: {
                ...this.state.product,
                properties: updatedProperties
            }
        });
        console.log(updatedProperties);
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
        console.log(this.state.propertySelectComponents);
        this.setState(state => {
            const propertySelectComponents = state.propertySelectComponents.map((component, index) => {
                if (index !== componentId) {
                    return component;
                }
            });
            return { propertySelectComponents };
        }, this.removeProperty(propertyId));
    }

    updateProduct = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const data = this.state.product;

        fetch(Constants.BASE_URL + `Products/Update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(response => {
                console.log(response);
            })
    }

    render() {
        return (
            <AdminLayout>
                <div>
                    <form onSubmit={e => this.updateProduct(e)}>
                        <div className="row">
                            <div className="col-3">
                                <div class="mb-3">
                                    <label class="form-label">Product ID:</label>
                                    <input readOnly defaultValue={this.state.product.id} type="text" class="form-control" placeholder="Product name" />
                                </div>
                            </div>
                            <div className="col-3">
                                <div class="mb-3">
                                    <label class="form-label">Product name:</label>
                                    <input defaultValue={this.state.product.name} type="text"
                                        class="form-control" placeholder="Product name"
                                        onChange={(e) => this.setState({ product: { ...this.state.product, name: e.target.value } })} />
                                </div>
                            </div>
                            <div className="col-3">
                                <div class="mb-3">
                                    <label class="form-label">Product price:</label>
                                    <input defaultValue={this.state.product.price} type="number" class="form-control" placeholder="Product name"
                                        onChange={(e) => this.setState({ product: { ...this.state.product, price: e.target.value } })} />
                                </div>
                            </div>
                            <div className="col-3">
                                <div class="mb-3">
                                    <label class="form-label">Product quantity:</label>
                                    <input defaultValue={this.state.product.quantity} type="number" class="form-control" placeholder="Product name"
                                        onChange={(e) => this.setState({ product: { ...this.state.product, quantity: e.target.value } })} />
                                </div>
                            </div>
                            <div className="col-3">
                                <div class="mb-3">
                                    <label class="form-label">Product category:</label>
                                    <select onChange={(e) => this.changeCategory(e)} class="form-control" value={this.state.product.categoryId}>
                                        {this.state.categories.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-12">
                                <div class="mb-3">
                                    <label class="form-label">Product description:</label>
                                    <textarea defaultValue={this.state.product.description} type="text" class="form-control" placeholder="Product name"
                                        onChange={(e) => this.setState({ product: { ...this.state.product, description: e.target.value } })} />
                                </div>
                            </div>
                            <div className="row">
                                {this.state.propertySelectComponents.map((propertySelect, index) => {
                                    return propertySelect;
                                })}
                            </div>
                            <div className="row">
                                <div className="col-2">
                                    <button className="btn btn-success" onClick={this.handleAddPropertySelect}>AddProperty</button>
                                </div>
                                <div className="col-2">
                                    <button className="btn btn-success" onClick={this.updateProduct}>Save changes</button>
                                </div>
                                <div className="col-2">
                                    <button className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        );
    }
}

export default EditProductView;