import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import Navbar from '../../components/Navbar';
import { login } from '../../store/modules/Login/action';

class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
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
        const { email, password } = this.state; 
        const { onLogin } = this.props;
       await onLogin(
             email, password
        );
        this.setState({
          password: ''
        });
      }

    render() {

        const { email, password } = this.state;
        const { loginData } = this.props;

        return(
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Navbar />
        
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mx-auto login-column">
                    <div className="card bg-light">
                        <div className="card-body">
                        <h5 className="mt-3 mb-4 text-center">Login</h5>
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
                            <div className="form-group">
                                <input 
                               type="password" 
                               className="form-control" 
                               placeholder="Password" 
                               name="password"
                               id="password"
                               value={password}
                               onChange={this.handleChange}
                               />   
                            </div>
                            <div>
                                <a href="/forgotpassword" className="text-decoration-none forgot-link">Forgot your password?</a>
                            </div>
                            { loginData.isLoading ?
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
                            Login
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
    loginData: state.userLogin,
});

const mapDispatchToProps = (dispatch) =>({
    onLogin: (email, password) => dispatch(login(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps) (Login);