import React from "react";
import CategoryButton from "../category-button/CategoryButton";

class CategoriesList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="categories container-fluid bg-light d-flex justify-content-center border">
                <div className="row w-50">
                    <CategoryButton></CategoryButton>
                </div>
            </div>
        );
    }
}

export default CategoriesList;