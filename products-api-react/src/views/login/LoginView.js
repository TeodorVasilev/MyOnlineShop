import "./LoginView.css"
import React from "react";

class LoginView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="login-panel container w-75">
                <div className="row border">
                    <div className="col-12 border-bottom text-center">
                        <h1 className="login-register-title text-uppercase">Login or register</h1>
                    </div>
                    <div className="col-6 login-column">
                        <div className="headline fw-bold">
                            <h4>Registered clients</h4>
                        </div>
                        <div className="login-box">
                            <form method="POST">
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                                    <input type="email" class="form-control border border-primary" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Password</label>
                                    <input type="password" class="form-control border border-primary" id="exampleInputPassword1" />
                                </div>
                                <p class="small"><a class="text-primary" href="forget-password.html">Forgot password?</a></p>
                                <div class="d-grid">
                                    <button class="btn btn-primary" type="submit">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-6 register-column text-center">
                        <div className="headline fw-bold">
                            <h4>New clients</h4>
                        </div>
                        <div className="registration-benefits">
                            <p>
                                <strong>Why should I register?</strong>
                            </p>
                            <ul className="list-group">
                                <li className="list-group-item border-0">Be the first to learn about new sales</li>
                                <li className="list-group-item border-0">Shop fast and easy</li>
                                <li className="list-group-item border-0">History of your orders</li>
                                <li className="list-group-item border-0">Participation in loyal customer program</li>
                            </ul>
                        </div>
                        <div>
                            <button class="btn btn-primary" type="submit">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginView;