import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import Navbar from '../../components/Navbar';
import { resetPassword } from '../../store/modules/ResetPassword/actions';

class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            cpassword: '',
            passwordError: '',
            cpasswordError: '',
            isPasswordValid: false,
            iscPasswordValid: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        const { password, cpassword } = this.state; 
        const { onResetPassword } = this.props;
       await onResetPassword(
             password, cpassword
        );
        this.setState({
          password: '',
          cpassword: ''
        });
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
        if (e.target.id === 'password') {
          this.setState({ passwordError: '', isPasswordValid: false });
        }
        if (e.target.id === 'cpassword') {
          this.setState({ cpasswordError: '', iscPasswordValid: false });
        }
      }

    render() {
        const { password, cpassword, passwordError, cpasswordError} = this.state;
        const {resetPasswordData} = this.props;

    return(
<>
    <Helmet>
        <title>Password Reset</title>
    </Helmet>
    <Navbar />

    <section>
        <div className="container">
            <div className="row">
                <div className="col-md-4 mx-auto login-column">
            <div className="card bg-light text-center">
                <div className="card-body">
                <h5 className="mt-3 mb-4">Reset Password</h5>
                <form onSubmit={this.handleSubmit}>
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
                    { resetPasswordData.isLoading ?
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
                    Reset Password
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
    resetPasswordData: state.userResetPassword
});

const mapDispatchToProps = (dispatch) =>({
    onResetPassword: (password, cpassword) =>(dispatch(resetPassword(password, cpassword)))
});

export default connect(mapStateToProps, mapDispatchToProps) (ResetPassword);