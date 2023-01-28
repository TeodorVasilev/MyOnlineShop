import React from "react";
import { Link } from "react-router-dom";

class UserListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <tr>
                <td>{this.props.user.id}</td>
                <td>{this.props.user.email}</td>
                <td>{this.props.user.roleName}</td>
                <td>{`${this.props.user.firstName} ${this.props.user.lastName}`}</td>
                <td>
                    <Link to={{ pathname: "/admin/user", state: { user: this.props.user.id } }}>Edit</Link>
                    <span> / </span>
                    <Link className="text-success">Orders</Link>
                    <span> / </span>
                    <Link className="text-danger">Delete</Link>
                </td>
            </tr>
        );
    }
}

export default UserListItem;