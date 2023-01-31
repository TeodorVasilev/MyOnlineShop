import React from "react";
import Constants from "../../constants/Constants";
import AdminLayout from "../layout/AdminLayout";
import { Link } from "react-router-dom";

class EditRoleView extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        id: 0,
        role: {}
    }

    componentDidMount() {
        this.loadRole();
    }

    updateRole = (e) => {
        e.preventDefault()
    }

    loadRole = () => {
        const token = localStorage.getItem('token');
        fetch(Constants.BASE_URL + 'Roles/' + this.props.location.state.role, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response);
                this.setState({
                    role: { ...response }
                })
            })
    }

    render() {
        return (
            <AdminLayout>
                <div>
                    <h3>Edit Role</h3>
                </div>
                <form onSubmit={this.updateRole}>
                    <div className="row">
                        <div className="form-group col-md-2">
                            <label htmlFor="roleName">Role Name</label>
                            <input type="text" className="form-control" id="roleName"
                                value={this.state.role.name}
                                onChange={e => this.setState({ role: { ...this.state.role, name: e.target.value } })} />
                        </div>
                    </div>
                </form>
                <div className="mt-3">
                    <h3>Users in this role</h3>
                </div>
                <div>
                    <ul class="nav">
                        <li class="nav-item">
                            <Link to="/admin/roles" class="nav-link active ps-0" aria-current="page" href="#">Edit users in role</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <table class="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Email</th>
                                <th scope="col">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.role.users && this.state.role.users.map(user =>
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.firstName + ' ' + user.lastName}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </AdminLayout>
        );
    }
}

export default EditRoleView;