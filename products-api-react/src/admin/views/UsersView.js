import React from "react";
import Constants from "../../constants/Constants";
import UserListItem from "../components/UserListItem";
import AdminLayout from "../layout/AdminLayout";

class UsersView extends React.Component {
    constructor(props) {
        super(props)
        this.loadUsers();
    }
    state = {
        users: []
    }

    loadUsers = () => {
        const token = localStorage.getItem('token');

        fetch(Constants.BASE_URL + 'User/GetUsers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => response.json())
            .then(response => {
                this.setState({
                    users: response
                })
            })
    }

    render() {
        return (
            <AdminLayout>
                <div className="d-flex">
                    <div>
                        <h3>All Users</h3>
                    </div>
                    <div className="ms-5"> 
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Name</th>
                            <th scope="col">Orders</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map(user =>
                        <UserListItem user={user}></UserListItem>
                        )}
                    </tbody>
                </table>
            </AdminLayout>
        );
    }
}

export default UsersView;