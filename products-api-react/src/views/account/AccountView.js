import React from "react";
import * as actions from "../../actions/AuthActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class AccountView extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>Account page</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountView);