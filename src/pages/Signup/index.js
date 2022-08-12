import React, { Component } from "react";
import { Helmet } from 'react-helmet';
import Navbar from "../../components/Navbar";
import './style.css';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { signup } from '../../store/modules/Signup/action';

class Signup extends Component {

  constructor(props){
    super(props);
    this.state = {
        email: '',
        password: '',
        cpassword: '',
        emailError: '',
        passwordError: '',
        cpasswordError: '',
        isEmailValid: false,
        isPasswordValid: false,
        iscPasswordValid: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkEmailInput = this.checkEmailInput.bind(this);
    this.checkPasswordInput = this.checkPasswordInput.bind(this);
    this.checkcPasswordInput = this.checkcPasswordInput.bind(this);
    this.resetInput = this.resetInput.bind(this);
}

handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(e){
    e.preventDefault();
    const { email, password, cpassword } = this.state; 
    const { onSignup } = this.props;
   await onSignup(
         email, password, cpassword
    );
    this.setState({
      password: '',
      cpassword: ''
    });
  }

  checkEmailInput(e) {
    const validEmailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!validEmailRegex.test(e.target.value)) {
      this.setState({
        emailError: 'Invalid Email!',
        isEmailValid: false,
      });
    } else {
      this.setState({
        emailError: '',
        isEmailValid: true,
      });
    }
  }

  checkPasswordInput(e) {
    const validPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    if (!validPasswordRegex.test(e.target.value)) {
      this.setState({
        passwordError: 'Should be alphanumeric, 8 characters long including special chars and capital.',
        isPasswordValid: false,
      });
    } else {
      this.setState({
        passwordError: '',
        isPasswordValid: true,
      });
    }
  }

  checkcPasswordInput(e) {
    const validPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    if (!validPasswordRegex.test(e.target.value)) {
      this.setState({
        cpasswordError: 'Should be alphanumeric, 8 characters long including special chars and capital.',
        iscPasswordValid: false,
      });
    } else {
      this.setState({
        cpasswordError: '',
        iscPasswordValid: true,
      });
    }
  }

  resetInput(e) {
    if (e.target.id === 'email') {
      this.setState({ emailError: '', isEmailValid: false });
    }
    if (e.target.id === 'password') {
      this.setState({ passwordError: '', isPasswordValid: false });
    }
    if (e.target.id === 'cpassword') {
      this.setState({ cpasswordError: '', iscPasswordValid: false });
    }
  }
    render() {
      const { email, password, cpassword, emailError, passwordError, cpasswordError } = this.state;
      const { user } = this.props;

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
                <form onSubmit={this.handleSubmit}>
                <div className="error pb-2">{emailError}</div>
                    <div className="form-group">
                        <input 
                       type="text" 
                       className="form-control" 
                       placeholder="Email" 
                       name="email"
                       id="email"
                       value={email}
                       onChange={this.handleChange}
                       onKeyUp={this.checkEmailInput}
                       onFocus={this.resetInput}
                       />   
                    </div>
                    <div className="error pb-2">{passwordError}</div>
                    <div className="form-group">
                        <input 
                       type="password" 
                       className="form-control" 
                       placeholder="Password" 
                       name="password"
                       id="password"
                       value={password}
                       onChange={this.handleChange}
                       onKeyUp={this.checkPasswordInput}
                       onFocus={this.resetInput}
                       />   
                    </div>
                    <div className="error pb-2">{cpasswordError}</div>
                    <div className="form-group">
                        <input 
                       type="password" 
                       className="form-control" 
                       placeholder="Confirm Password" 
                       name="cpassword"
                       id="cpassword"
                       value={cpassword}
                       onChange={this.handleChange}
                       onKeyUp={this.checkcPasswordInput}
                       onFocus={this.resetInput}
                       />   
                    </div>
                    { user.isLoading ?
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
                    Signup
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
        );
    }
}

const mapStateToProps = (state) =>({
  user: state.userSignup,
});

const mapDispatchToProps = (dispatch) =>({
  onSignup: (email, password, cpassword) => dispatch(signup(email, password, cpassword)),
});
export default connect(mapStateToProps, mapDispatchToProps) (Signup);