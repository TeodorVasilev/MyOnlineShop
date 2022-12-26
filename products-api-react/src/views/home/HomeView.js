import React from "react";
import ProductsList from "../../components/products-list/ProductsList";
import TopLayout from "../../layout/TopLayout";

class HomeView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TopLayout>
                <div className="container mt-4">
                    <ProductsList></ProductsList>
                </div>
            </TopLayout>
        );
    }
}

export default HomeView;