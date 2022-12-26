import "./LoginView.css"
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions/AuthActions";
import Constants from "../../constants/Constants";
import { Redirect, withRouter } from "react-router-dom";
import { CheckLg } from "react-bootstrap-icons";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.checkIfUserIsLogged();
    }

    state = {
        email: "",
        password: "",
    }

    checkIfUserIsLogged = () => {
        try {
            const token = localStorage.getItem('token');
            const decoded = jwt_decode(token);

            if (token !== null) {
                fetch(Constants.BASE_URL + `User?id=${decoded.UserId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(response => response.json())
                    .then(response => {
                        this.props.setAuthState(true);
                        this.props.setUser({
                            ...response
                        });
                    })
            }
        } catch (error) {
            console.log(error);
        }
    }

    loginAttempt = (event) => {
        event.preventDefault();

        fetch(Constants.BASE_URL + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(response => {
                if(response.token){
                    localStorage.setItem('token', response.token);
                    this.props.setAuthState(true);
                }
            })
    }

    render() {
        if(this.props.layout.isLogged === true){
            return <Redirect to="/"></Redirect>
        }

        return (
            <div className="login-panel container w-75">
                <div className="row border">
                    <div className="col-12 border-bottom d-flex justify-content-center align-items-center">
                        <h1 className="login-register-title text-uppercase">Login or register</h1>
                    </div>
                    <div className="col-6 login-column">
                        <div className="headline fw-bold">
                            <h4 className="mt-2">Registered customers</h4>
                        </div>
                        <div className="login-box">
                            <form method="POST" onSubmit={this.loginAttempt}>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email address</label>
                                    <input
                                        type="email"
                                        class="form-control border border-primary"
                                        id="email"
                                        aria-describedby="emailHelp"
                                        value={this.state.email}
                                        onChange={(e) => this.setState({ email: e.target.value })}
                                         />
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" 
                                    class="form-control border border-primary"
                                     id="password"
                                     value={this.state.password}
                                     onChange={(e) => this.setState({ password: e.target.value})}
                                      />
                                </div>
                                <p class="small"><a class="text-primary" href="forget-password.html">Forgot password?</a></p>
                                <div class="d-grid">
                                    <button class="btn btn-primary mb-3" type="submit">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-6 register-column text-center">
                        <div className="headline fw-bold mt-2">
                            <h4>New customers</h4>
                        </div>
                        <div className="registration-benefits">
                            <p>
                                <strong>Why should I register?</strong>
                            </p>
                            <ul className="list-group">
                                <li className="list-group-item border-0"><CheckLg size={20} className="text-success"></CheckLg>Be the first to learn about new sales</li>
                                <li className="list-group-item border-0">Shop fast and easy</li>
                                <li className="list-group-item border-0">History of your orders</li>
                                <li className="list-group-item border-0">Participation in loyal customer program</li>
                            </ul>
                        </div>
                        <div>
                            <Link to="/register" class="btn btn-primary mt-2" type="submit">Register</Link>
                        </div>
                    </div>
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginView));