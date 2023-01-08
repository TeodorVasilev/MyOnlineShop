import React from "react";
import AdminLayout from "../../layout/AdminLayout";
import { Link } from "react-router-dom";
import Constants from "../../../constants/Constants";

class PropertiesView extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        propertyName: '',
        optionName: '',
        properties: []
    }

    createProperty = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const data = {
            name: this.state.propertyName
        }
        fetch(Constants.BASE_URL + 'Properties', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        }).then(response => {
            console.log(response);
            this.loadProperties();
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

    deleteProperty = (id) => {
        const token = localStorage.getItem('token');

        fetch(Constants.BASE_URL + `Properties/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            }
        }).then(response => {
            console.log(response);
            this.loadProperties();
        })
    }

    componentDidMount() {
        this.loadProperties();
    }

    render() {
        return (
            <AdminLayout>
                <div className="row">
                    <div className="col-6">
                        <div>
                            <h3>Create new product property</h3>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <form onSubmit={(e) => this.createProperty(e)}>
                                    <div class="form-group">
                                        <input type="text"
                                            class="form-control"
                                            id="propertyName"
                                            placeholder="Enter property name"
                                            onChange={e => this.setState({ ...this.state, propertyName: e.target.value })}
                                        />
                                    </div>
                                    <button type="submit" class="btn btn-primary mt-3">Create property</button>
                                </form>
                            </div>
                        </div>
                        <div className="mt-3">
                            <p>You can assign options to property in when you click Edit of the selected property from the properties list</p>
                        </div>
                    </div>
                    <div className="col-5 border">
                        <table class="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.properties.map(property =>
                                    <tr>
                                        <td>{property.id}</td>
                                        <td>{property.name}</td>
                                        <td>
                                            <Link to={{pathname : '/admin/property', state: {id: property.id}}}>Edit</Link>
                                            <span> / </span>
                                            <Link className="text-danger" onClick={() => this.deleteProperty(property.id)}>Delete</Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default PropertiesView;