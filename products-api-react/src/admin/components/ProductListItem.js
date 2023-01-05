import React from "react";
import { Link } from "react-router-dom";
class ProductListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <tr>
                <td>{this.props.product.id}</td>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.price}$</td>
                <td>{this.props.product.quantity}</td>
                <td>
                <Link to={{ pathname: "/admin/product", state: { productId: this.props.product.id } }}>Edit</Link>
                    <span> / </span>
                    <Link className="text-danger" onClick={() => this.props.delete(this.props.product.id)}>Delete</Link>
                </td>
            </tr>
        );
    }
}

export default ProductListItem;