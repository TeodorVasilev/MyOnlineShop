import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductsList from "../../components/products-list/ProductsList";
import TopLayout from "../../layout/TopLayout";
import * as actions from "../../actions/AuthActions";

class HomeView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TopLayout>
                <div className="container mt-4">
                    <ProductsList width={3}></ProductsList>
                </div>
            </TopLayout>
        );
    }
}

const mapStateToProps = state => {
    return {
        layout: state.layout
    }
};

export default connect(mapStateToProps)(HomeView);