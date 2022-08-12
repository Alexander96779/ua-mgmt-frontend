import React, { Component } from "react";
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import Navbar from "../../components/Navbar";
import { forgotPassword } from '../../store/modules/ForgotPassword/actions';

class ForgotPassword extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      }

      async handleSubmit(e){
        e.preventDefault();
        const { email } = this.state; 
        const { onForgotPassword } = this.props;
       await onForgotPassword(
             email
        );
      }

    render () {
        const { email } = this.state;
        const { forgotPasswordData } = this.props;
        return (
    <>
        <Helmet>
            <title>Forgot Password</title>
        </Helmet>
        <Navbar />
        
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mx-auto login-column">
                    <div className="card bg-light text-center">
                        <div className="card-body">
                        <h5 className="mt-3 mb-4">Forgot Password</h5>
                        <p>Please submit your email to get reset password link.</p>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                            <input 
                               type="text" 
                               className="form-control" 
                               placeholder="Email" 
                               name="email"
                               id="email"
                               value={email}
                               onChange={this.handleChange}
                               />   
                            </div>
                            { forgotPasswordData.isLoading ?
                        <button className="btn btn-block mt-3 text-white" disabled>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                              Loading...
                        </button>
                        :
                        <button type="submit" className="btn btn-block text-white mt-3">
                            Submit
                        </button>
                          }
                        </form>
                        </div>
                    </div>
                        </div>
                    </div>
                </div>
            </section>
    </>
        )
    }
}

const mapStateToProps = (state) =>({
    forgotPasswordData: state.userForgotPassword
});

const mapDispatchToProps = (dispatch) =>({
    onForgotPassword: (email) =>(dispatch(forgotPassword(email)))
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);