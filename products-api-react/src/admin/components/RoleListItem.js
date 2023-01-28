import React from "react";
import { Link } from "react-router-dom";

class RoleListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <tr>
                 <td>{this.props.role.id}</td>
                 <td>{this.props.role.name}</td>
                 <td>
                     <Link to={{ pathname: "/admin/role", state: { role: this.props.role.id } }}>Edit</Link>
                     <span> / </span>
                     <Link className="text-success">Orders</Link>
                     <span> / </span>
                     <Link className="text-danger">Delete</Link>
                 </td>
            </tr>
        );
    }
}

export default RoleListItem;