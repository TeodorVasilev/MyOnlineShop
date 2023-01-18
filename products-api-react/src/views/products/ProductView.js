import React from "react";
import TopLayout from "../../layout/TopLayout";
import Constants from "../../constants/Constants";

class ProductView extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        product: {}
    }

    loadProduct = () => {
        fetch(Constants.BASE_URL + `Products/${this.props.location.state.productId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response);
            })
    }

    componentDidMount(){
        this.loadProduct();
    }

    render() {
        console.log(this.state);
        return (
            <TopLayout>
                <div>
                    {this.props.location.state.productId}
                </div>
            </TopLayout>
        );
    }
}

export default ProductView