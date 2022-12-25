import React from "react";
import Constants from "../../constants/Constants";
import CategoryButton from "../category-button/CategoryButton";

class CategoriesList extends React.Component {
    constructor(props) {
        super(props);
        this.loadCategories();
    }

    state = {
        categories: [],
    }

    loadCategories(){
        fetch(Constants.BASE_URL + 'Categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            this.setState({categories : response});
        })
    }

    render() {
        return (
            <div className="categories container-fluid bg-light d-flex justify-content-center border">
                <div className="row w-75 d-flex justify-content-center">
                    {this.state.categories.map(category => 
                        <CategoryButton {...category} key={category.id}></CategoryButton>)}
                </div>
            </div>
        );
    }
}

export default CategoriesList;