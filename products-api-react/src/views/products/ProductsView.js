import React from "react";
import { connect } from "react-redux";
import ProductsList from "../../components/products-list/ProductsList";
import TopLayout from "../../layout/TopLayout";

class ProductsView extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TopLayout>
                <div className="container mt-4 border rounded">
                    <div className="row gx-3 pt-3">
                        <div className="filters-panel col-3 border-end">
                            filters
                        </div>
                        <div className="col-9">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="title">
                                    <h3>{this.props.category.name}</h3>
                                </div>
                                <div className="order-by d-flex">
                                    <label className="me-2">Order by:</label>
                                    <select className="">
                                        <option>Newest</option>
                                        <option>Lowest price</option>
                                        <option>Highest price</option>
                                    </select>
                                </div>
                            </div>
                            <div className="per-page">
                                <label>Per page:</label>
                                <select>
                                    <option>20</option>
                                </select>
                            </div>
                            <div>
                                <ProductsList width={4}></ProductsList>
                            </div>
                        </div>
                    </div>
                </div>
            </TopLayout>
        );
    }
}

const mapStateToProps = state => {
    return {
        category: state.category
    }
};


export default connect(mapStateToProps)(ProductsView);