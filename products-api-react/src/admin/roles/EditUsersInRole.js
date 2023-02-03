import React from "react";
import Constants from "../../constants/Constants";
import AdminLayout from "../layout/AdminLayout";

class EditUsersInRole extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        users: []
    }

    componentDidMount() {
        this.loadUsers();
    }

    updateRole = () => {

    }

    loadUsers() {
        const token = localStorage.getItem('token');
        fetch(Constants.BASE_URL + 'User/GetUsers' + `?roleId=${this.props.location.state.role.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response);
                this.setState({
                    users: response
                })
            })
    }

    render() {
        console.log(this.state);
        return (
            <AdminLayout>
                <div>
                    <h3>Role: {this.props.location.state.role.name}</h3>
                </div>
                <div>
                    <table class="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Email</th>
                                <th scope="col">Name</th>
                                <th scope="col">Is selected</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users && this.state.users.map(user => {
                                if (user) {
                                    return (
                                        <tr>
                                            <td>{user.id}</td>
                                            <td>{user.email}</td>
                                            <td>{user.firstName + ' ' + user.lastName}</td>
                                            <td><input type="checkbox" checked={user.isInRole}></input></td>
                                        </tr>
                                    );
                                }
                                return null;
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <button className="btn btn-success">Save changes</button>
                </div>
            </AdminLayout>
        );
    }
}

export default EditUsersInRole;