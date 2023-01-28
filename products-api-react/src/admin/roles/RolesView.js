import React from "react";
import Constants from "../../constants/Constants";
import AdminLayout from "../layout/AdminLayout";
import RoleListItem from "../components/RoleListItem";

class RolesView extends React.Component{
    constructor(props){
        super(props);
    }

    state = {
        roles: []
    }

    loadRoles = () => {
        const token = localStorage.getItem('token');

        fetch(Constants.BASE_URL + 'Roles', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => response.json())
        .then(response => {
            this.setState({
                roles: response
            })
        })
    }

    componentDidMount(){
        this.loadRoles(); 
    }

    render(){
        console.log(this.state);
        return(
            <AdminLayout>
            <div className="d-flex">
                <div>
                    <h3>All Roles</h3>
                </div>
                <div className="ms-5">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">RoleName</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.roles.map(role =>
                        <RoleListItem role={role}></RoleListItem>
                    )}
                </tbody>
            </table>
        </AdminLayout>
        );
    }
}

export default RolesView;