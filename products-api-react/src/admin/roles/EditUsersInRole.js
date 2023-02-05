import React from "react";
import Constants from "../../constants/Constants";
import AdminLayout from "../layout/AdminLayout";

class EditUsersInRole extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        users: [],
        usersInRole: []
    }

    componentDidMount() {
        this.loadUsers();
    }

    updateRole = () => {
        const token = localStorage.getItem('token');
        const data = {
            id: this.props.location.state.role.id,
            name: '',
            users: this.state.usersInRole,
        }
        console.log(data);
        fetch(Constants.BASE_URL + 'Roles',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(response => {
                console.log(response);
            });
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
                    users: response,
                    usersInRole: response.filter(u => u.isInRole)
                })
            })
    }

    toggleUserInRole = (user) => {
        const usersInRole = this.state.usersInRole;
    
        if (usersInRole.find(u => u.id === user.id)) {
            this.setState({
                usersInRole: usersInRole.filter(u => u.id !== user.id)
            });
        } else {
            this.setState({
                usersInRole: [...usersInRole, user]
            });
        }
    }
    

    render() {
        console.log(this.state.usersInRole);
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
                                            <td><input type="checkbox" defaultChecked={user.isInRole} onChange={() => this.toggleUserInRole(user)}></input></td>
                                        </tr>
                                    );
                                }
                                return null;
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <button className="btn btn-success" onClick={this.updateRole}>Save changes</button>
                </div>
            </AdminLayout>
        );
    }
}

export default EditUsersInRole;