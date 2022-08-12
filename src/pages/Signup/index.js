import React, { Component } from "react";
import { Helmet } from 'react-helmet';
import Navbar from "../../components/Navbar";
import './style.css';

class Signup extends Component {
    render() {
        return(
            <>
    <Helmet>
        <title>Signup</title>
    </Helmet>
    <Navbar />

    <section>
        <div className="container">
            <div className="row">
                <div className="col-md-4 mx-auto login-column">
            <div className="card bg-light text-center">
                <div className="card-body">
                <h5 className="mt-3 mb-4">Signup</h5>
                <form>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Your email"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Your password"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm password"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-block text-white mt-3">
                    Signup
                </button>
                </form>
                </div>
            </div>
                </div>
            </div>
        </div>
    </section>
</>
        );
    }
}
export default Signup;