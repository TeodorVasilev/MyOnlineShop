import React from "react";
import { connect } from "react-redux";
import ProductsList from "../../components/products-list/ProductsList";
import TopLayout from "../../layout/TopLayout";

class ProductsView extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        perPage: 3,
        orderBy: 0
    }

    render() {
        return (
            <TopLayout>
                <div className="container mt-4 border rounded">
                    <div className="row gx-3 pt-3">
                        <div className="filters-panel col-3 border-end">
                            <div className="price-filter">
                                <h4>Price</h4>
                                <div className="form-group">
                                    <div className="input-group">
                                        <input type="number" className="form-control" placeholder="Min Price" />
                                    </div>
                                </div>
                                <div className="form-group mt-2">
                                    <div className="input-group">
                                        <input type="number" className="form-control" placeholder="Max Price" />
                                    </div>
                                </div>
                                <div className="form-group mt-2">
                                    <button type="button" className="btn btn-primary">Filter</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="title">
                                    <h3>{this.props.category.name}</h3>
                                </div>
                                <div className="order-by d-flex">
                                    <label className="me-2">Order by:</label>
                                    <select defaultValue={0} onChange={e => this.setState({orderBy: e.target.value})}>
                                        <option value={0}></option>
                                        <option value={1}>Newest</option>
                                        <option value={2}>Lowest price</option>
                                        <option value={3}>Highest price</option>
                                    </select>
                                </div>
                            </div>
                            <div className="per-page mb-2">
                                <label className="me-2">Per page:</label>
                                <select defaultValue={3} onChange={e => this.setState({ perPage: e.target.value })}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>20</option>
                                </select>
                            </div>
                            <div>
                                <ProductsList width={4} perPage={this.state.perPage} orderBy={this.state.orderBy}></ProductsList>
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