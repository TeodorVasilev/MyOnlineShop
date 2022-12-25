import "./CategoryButton.css";
import React from "react";

class CategoryButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-3 d-flex p-0">
                <button className="cat-btn w-100 border-0 fw-bold border-start text-uppercase">Category</button>
            </div>
        );
    }
}

export default CategoryButton;