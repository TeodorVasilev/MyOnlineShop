import React from "react";
import { Link } from "react-router-dom";

class UserListItem extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        console.log(this.props);
        return(
            <tr>
            <td>{this.props.user.id}</td>
            <td>{this.props.user.email}</td>
            <td>
                <select>
                    <option>Assign user to role</option>
                </select>
            </td>
            <td>{`${this.props.user.firstName} ${this.props.user.lastName}`}</td>
            <td>number of orders</td>
            <td>
                <Link>Edit</Link>
                <span> / </span>
                <Link className="text-danger">Delete</Link>
            </td>
        </tr>
        );
    }
}

export default UserListItem;