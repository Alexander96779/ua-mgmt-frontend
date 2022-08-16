import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import moment from 'moment';
import cogoToast from 'cogo-toast';
import Spinner from 'react-bootstrap/Spinner';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import avatar from '../../assets/avatar.jpg';
import './style.css';
import { getUser } from '../../store/modules/ViewUser/actions';
import { addProfile } from '../../store/modules/Profile/actions';

class Profile extends Component {
    async componentDidMount() {
        await this.props.displayUserInfo();
        const { profileData } = this.props;
        this.setState({
            imageUrl: profileData.data.payload.profile && profileData.data.payload.profile.photoUrl ? profileData.data.payload.profile.photoUrl : '',
            firstName: profileData.data.payload.profile && profileData.data.payload.profile.firstName ? profileData.data.payload.profile.firstName : '',
            lastName: profileData.data.payload.profile && profileData.data.payload.profile.lastName ? profileData.data.payload.profile.lastName : '',
            dob: profileData.data.payload.profile && profileData.data.payload.profile.dateOfBirth ? profileData.data.payload.profile.dateOfBirth : '',
            nationality: profileData.data.payload.profile && profileData.data.payload.profile.nationality ? profileData.data.payload.profile.nationality : '',
            gender: profileData.data.payload.profile && profileData.data.payload.profile.gender ? profileData.data.payload.profile.gender : '',
            maritalStatus: profileData.data.payload.profile && profileData.data.payload.profile.maritalStatus ? profileData.data.payload.profile.maritalStatus : '',
            age: profileData.data.payload.profile && profileData.data.payload.profile.age ? profileData.data.payload.profile.age : '',
            vStatus: profileData.data.payload.profile.verification && profileData.data.payload.profile.verification.status ? profileData.data.payload.profile.verification.status : ''
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            dob: '',
            nationality: '',
            gender: '',
            maritalStatus: '',
            age: '',
            file: '',
            imageUrl: '',
            vStatus: ''

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGenderSelect = this.handleGenderSelect.bind(this);
        this.handleMaritalSelect = this.handleMaritalSelect.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }    

    handleFile(event) {
        const file = event.target.files[0];
        const fileSize = Math.round(file.size / 1024);
    if (file.name.match(/\.(jpeg)$/) || file.name.match(/\.(png)$/) || file.name.match(/\.(gif)$/) || file.name.match(/\.(jpg)$/)) {
        if (fileSize > 2048) {
            cogoToast.error('File too big, Please select file less than 2mb', { hideAfter: 5, position: 'top-center'});
            return;
        }
        this.setState({
            file: file
        });
        } else {
            cogoToast.error('Please select valid image document', { hideAfter: 5, position: 'top-center' });
            return;
        }
      }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      }

    handleGenderSelect(event) {
        this.setState({gender: event.target.value});  
       }
    
    handleMaritalSelect(event) {
        this.setState({maritalStatus: event.target.value});  
       }

    async handleSubmit(e){
        e.preventDefault();
        const { firstName, lastName, dob, nationality, gender, maritalStatus, age, file } = this.state; 
        const { onAddProfile } = this.props;
        if(file !== '' && firstName !== '' && lastName !== '' && lastName !=='' && dob !== '' 
        && nationality !== '' & gender !== '' && maritalStatus !== '' && age !== '') {
        var dateOfBirth = new Date(dob);
        const dataToAdd = { firstName, lastName, dateOfBirth, nationality, gender, 
                            maritalStatus, age, file };

        const formData = new FormData();

        Object.entries(dataToAdd).forEach(([key, value]) =>{
            formData.append(key, value);
        });
       await onAddProfile(formData);
       await this.props.displayUserInfo();
       const { profileData } = this.props;
       this.setState({
        imageUrl: profileData.data.payload.profile && profileData.data.payload.profile.photoUrl ? profileData.data.payload.profile.photoUrl : '',
        firstName: profileData.data.payload.profile && profileData.data.payload.profile.firstName ? profileData.data.payload.profile.firstName : '',
        lastName: profileData.data.payload.profile && profileData.data.payload.profile.lastName ? profileData.data.payload.profile.lastName : '',
        dob: profileData.data.payload.profile && profileData.data.payload.profile.dateOfBirth ? profileData.data.payload.profile.dateOfBirth : '',
        nationality: profileData.data.payload.profile && profileData.data.payload.profile.nationality ? profileData.data.payload.profile.nationality : '',
        gender: profileData.data.payload.profile && profileData.data.payload.profile.gender ? profileData.data.payload.profile.gender : '',
        maritalStatus: profileData.data.payload.profile && profileData.data.payload.profile.maritalStatus ? profileData.data.payload.profile.maritalStatus : '',
        age: profileData.data.payload.profile && profileData.data.payload.profile.age ? profileData.data.payload.profile.age : '',
        vStatus: profileData.data.payload.profile.verification && profileData.data.payload.profile.verification.status ? profileData.data.payload.profile.verification.status : ''
                    });
        } else {
        cogoToast.error('All fields are required', { hideAfter: 5, position: 'top-center' });
        }
      }

    render(){
        const { firstName, lastName, dob, nationality, gender, maritalStatus, age, 
            imageUrl, vStatus } = this.state;
        const { profile, profileData } = this.props;
        return(
    <>
        <Helmet>
            <title>User Profile</title>
        </Helmet>
        <Navbar />
        <Sidebar />
        <section>
        <div className="container">
            <div className="row">
                {
                    profileData.isLoading ?
                    <div className="text-center mt-5">
                    <Spinner animation="border" variant="dark" />
                </div>
                  :
                <div className="col-md-9 mx-auto mt-5">
                <div className="card bg-light">
                    <div className="card-body">
                    <h5 className="text-center my-3">User Profile</h5>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-md-4 avatar-side">
                            <div className="text-right badge-class">
                                { vStatus === 'VERIFIED' ?
                                <p><i className="fa fa-check-circle" aria-hidden="true"></i></p>
                                :
                                <p>Status: {vStatus}</p>
                                }
                            </div>
                            <img src={imageUrl ? `${process.env.REACT_APP_BASE_URL}/uploads/user/profiles/${imageUrl}` : avatar} alt="" className="img-fluid rounded-circle w-100 mb-3" />
                            <div className="form-group">
                            <label htmlFor="file">Add Image</label>
                            <input 
                            type="file" 
                            id="file" 
                            className="form-control-file"
                            onChange={this.handleFile} />
                            <small id="fileHelp" className="form-text text-muted">Max 2mb size</small>
                             </div>
                            </div>
                            <div className="col-md-8">
                            <div className="form-row">
                            <div className="form-group col-md-6">
                            <label htmlFor="firstName">First Name</label>
                            <input
                            id="firstName"
                            type="text"
                            className="form-control"
                            placeholder="Your first name"
                            name="firstName"
                            value={firstName}
                            onChange={this.handleChange}
                            />
                            </div>
                            <div className="form-group col-md-6">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                            id="lastName"
                            type="text"
                            className="form-control"
                            placeholder="Your last name"
                            name="lastName"
                            value={lastName}
                            onChange={this.handleChange}
                            />
                            </div>
                            </div>
                            <div className="form-row">
                            <div className="form-group col-md-6">
                            <label htmlFor="dob">Date of Birth</label>
                            <input 
                            type="date"
                            className="form-control"
                            id="dob"
                            name="dob"
                            value={moment(dob).format("YYYY-MM-DD")}
                            onChange={this.handleChange}
                            />
                            </div>
                            <div className="form-group col-md-6">
                            <label htmlFor="nationality">Nationality</label>
                            <input
                            id="nationality"
                            type="text"
                            className="form-control"
                            placeholder="Your Nationality"
                            name="nationality"
                            value={nationality}
                            onChange={this.handleChange}
                            />
                            </div>
                            </div>
                            <div className="form-row">
                            <div className="form-group col-md-6">
                            <label htmlFor="gender">Gender</label>
                            <select id="gender" className="form-control" defaultValue={gender} onChange={this.handleGenderSelect}>
                            <option disabled value={gender}>{ gender? gender : 'Choose Gender' }</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            </select>
                            </div>
                            <div className="form-group col-md-6">
                            <label htmlFor="maritalStatus">Marital Status</label>
                            <select id="gender" className="form-control" defaultValue={maritalStatus} onChange={this.handleMaritalSelect}>
                            <option disabled value={maritalStatus}>{maritalStatus? maritalStatus : 'Choose Status'}</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Widowed">Widowed</option>
                            </select>
                            </div>
                            </div>
                            <div className="form-row">
                            <div className="form-group col-md-6">
                            <label htmlFor="age">Age</label>
                            <input
                            id="age"
                            type="text"
                            className="form-control"
                            placeholder="Your age"
                            name="age"
                            value={age}
                            onChange={this.handleChange}
                            />
                            </div>
                            </div>
                            </div>
                        </div>
                        <div className="text-center">
                        {
                        profile.isLoading ?
                        <button className="btn my-3 text-white" disabled>
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
                        <button type="submit" className="btn text-white my-3">
                            Save Changes
                        </button>
                        }
                        </div>
                    </form>
                    </div>
                    </div>
                </div>
                }
            </div>
        </div>
        </section>  
    </>       
        )
    }

}

const mapStateToProps = (state) =>({
    profileData: state.getUserInfo,
    profile: state.addNewProfile,
});

const mapDispatchToProps = (dispatch) =>({
    displayUserInfo: () => dispatch(getUser()),
    onAddProfile: (data) =>dispatch(addProfile(data)),
});

export default connect(mapStateToProps, mapDispatchToProps) (Profile);