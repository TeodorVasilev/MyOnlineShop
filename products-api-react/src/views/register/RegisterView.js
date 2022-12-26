import "./RegisterView.css";
import React from "react";
import Constants from "../../constants/Constants";
import * as actions from "../../actions/AuthActions";
import { Redirect, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class RegisterView extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }

    registerAttempt = (event) =>{
        event.preventDefault();

        fetch(Constants.BASE_URL + 'Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(response => {
            if(response.ok){
                this.props.setAuthState(true);
            }
        })
    }

    render() {
        if(this.props.layout.isLogged === true){
            return <Redirect to="/"></Redirect>
        }

        return (
            <div className="register-panel container w-25 border">
                <div className="border-bottom d-flex justify-content-center align-items-center">
                    <h1 className="register-title text-uppercase p-1">Register</h1>
                </div>
                <form method="POST" onSubmit={this.registerAttempt}>
                    <div className="mb-3">
                        <label for="firstName" className="form-label">First name</label>
                        <input
                            type="firstName"
                            className="form-control border border-primary"
                            id="firstName"
                            value={this.state.firstName}
                            onChange={(e) => this.setState({ firstName: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label for="lastName" className="form-label">Last name</label>
                        <input
                            type="lastName"
                            className="form-control border border-primary"
                            id="lastName"
                            value={this.state.lastName}
                            onChange={(e) => this.setState({ lastName: e.target.value })}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control border border-primary"
                            id="email"
                            aria-describedby="emailHelp"
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password"
                            className="form-control border border-primary"
                            id="password"
                            value={this.state.password}
                            onChange={(e) => this.setState({ password: e.target.value })}
                        />
                    </div>
                    <div className="d-grid mt-4">
                        <button className="btn btn-primary mb-3" type="submit">Register</button>
                    </div>
                </form>
            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterView));