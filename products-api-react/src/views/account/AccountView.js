import React from "react";
import * as actions from "../../actions/AuthActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import TopLayout from "../../layout/TopLayout";
import Constants from "../../constants/Constants";
import NetworkClient from "../../api/NetworkClient";

class AccountView extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        id: this.props.layout.user.id,
        firstName: null,
        lastName: null,
        email: null,
        oldPassword: null,
        newPassword: null,
    }

    updateUser = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const data = {
            ...this.state
        }
        fetch(Constants.BASE_URL + 'User/UpdateUser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
        .then(respone => respone.json())
        .then(response => {
            console.log(response);
        })
    }


    render() {
        if (this.props.layout.isLogged === false) {
            return <Redirect to="/login"></Redirect>
        }

        return (
            <TopLayout>
                <div className="container mt-4 border rounded">
                    <div className="titles d-flex justify-content-around">
                        <div>
                            <h3 className="text-uppercase">Profile</h3>
                        </div>
                        <div>
                            <h3 className="text-uppercase">Orders</h3>
                        </div>
                    </div>
                    <div>
                        <div className="w-50">
                            <form method="PUT" onSubmit={this.updateUser}>
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
                                    <label for="password" class="form-label">Old password</label>
                                    <input type="password"
                                        className="form-control border border-primary"
                                        id="password"
                                        value={this.state.oldPassword}
                                        onChange={(e) => this.setState({ oldPassword: e.target.value })}
                                    />
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">New password</label>
                                    <input type="password"
                                        className="form-control border border-primary"
                                        id="password"
                                        value={this.state.newPassword}
                                        onChange={(e) => this.setState({ newPassword: e.target.value })}
                                    />
                                </div>
                                <div className="mt-4">
                                    <button className="btn btn-primary mb-3" type="submit">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
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