import React from "react";
import * as actions from "../../actions/AuthActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import TopLayout from "../../layout/TopLayout";

class AccountView extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.layout.isLogged === false){
            return <Redirect to="/login"></Redirect>
        }

        return(
            <TopLayout>
                <div className="container mt-4">
                    Account page
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

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setAuthState: actions.setAuthState,
        setUser: actions.setUser,
    }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountView));