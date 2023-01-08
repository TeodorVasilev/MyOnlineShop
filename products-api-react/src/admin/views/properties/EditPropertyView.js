import React from "react";
import Constants from "../../../constants/Constants";
import AdminLayout from "../../layout/AdminLayout";
import { Link } from "react-router-dom";

class EditPropertyView extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        property: {},
        options: [],
        optionName: ''
    }

    loadProperty = () => {
        const token = localStorage.getItem('token');
        fetch(Constants.BASE_URL + `Properties/${this.props.location.state.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => response.json())
            .then(response => {
                this.setState({
                    property: response
                })
            })
    }

    deleteOption = (id) => {
        const token = localStorage.getItem('token');

        fetch(Constants.BASE_URL + `Options/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            }
        }).then(response => {
            this.loadOptions();
        })
    }

    createOption = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        fetch(Constants.BASE_URL + 'Options', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ name: this.state.optionName })
        }).then(response => {
            this.loadOptions();
        })
    }

    loadOptions = () => {
        const token = localStorage.getItem('token');
        fetch(Constants.BASE_URL + 'Options', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => response.json())
            .then(response => {
                this.setState({
                    ...this.state,
                    options: response
                })
            })
    }

    componentDidMount() {
        this.loadProperty();
        this.loadOptions();
    }

    render() {
        return (
            <AdminLayout>
                <div className="row">
                    <div className="col-6">
                        <div>
                            <h1>Property: {this.state.property.name}</h1>
                        </div>
                        <div>
                            <h3>Create new property option</h3>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <form onSubmit={(e) => this.createOption(e)}>
                                    <div class="form-group">
                                        <input type="text"
                                            class="form-control"
                                            id="propertyName"
                                            placeholder="Enter option name"
                                            onChange={e => this.setState({ ...this.state, optionName: e.target.value })}
                                        />
                                    </div>
                                    <button type="submit" class="btn btn-primary mt-3">Create option</button>
                                </form>
                            </div>
                        </div>
                        <div className="mt-3">
                            <p>You can assign options to property in when you check the option in the list</p>
                        </div>
                    </div>
                    <div className="col-5 border">
                        <h3>Options List</h3>
                        <table class="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Select</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.options.map(option =>
                                    <tr>
                                        <td>{option.id}</td>
                                        <td>{option.name}</td>
                                        <td>
                                            <input type="checkbox" />
                                        </td>
                                        <td>
                                            <Link >Edit</Link>
                                            <span> / </span>
                                            <Link className="text-danger" onClick={() => this.deleteOption(option.id)}>Delete</Link>
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

export default EditPropertyView;