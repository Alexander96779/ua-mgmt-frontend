import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import cogoToast from "cogo-toast";
import Spinner from "react-bootstrap/esm/Spinner";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { addDocument } from '../../store/modules/Verification/actions';
import { getUser } from '../../store/modules/ViewUser/actions';
import './style.css';

class Verification extends Component {

    async componentDidMount() {
        await this.props.displayUserInfo();
        const { profileData } = this.props;
        this.setState({
            documents: profileData.data.payload.profile.verification ? profileData.data.payload.profile.verification: []
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            nidPassport: '',
            file: '',
            documents: []

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }    

    handleFile(event) {
        const file = event.target.files[0];
        const fileSize = Math.round(file.size / 1024);
    if (file.name.match(/\.(jpeg)$/) || file.name.match(/\.(png)$/) || file.name.match(/\.(gif)$/) || file.name.match(/\.(jpg)$/) || file.name.match(/\.(pdf)$/)) {
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

      async handleSubmit(e){
        e.preventDefault();
        const { nidPassport, file } = this.state; 
        const { onAddDocument } = this.props;
        if(file !== '' && nidPassport !== '') {
        const dataToAdd = { nidPassport, file };

        const formData = new FormData();

        Object.entries(dataToAdd).forEach(([key, value]) =>{
            formData.append(key, value);
        });
       await onAddDocument(formData);
       await this.props.displayUserInfo();
       const { profileData } = this.props;
       this.setState({
           documents: profileData.data.payload.profile.verification ? profileData.data.payload.profile.verification: []
       });

        } else {
        cogoToast.error('All fields are required', { hideAfter: 5, position: 'top-center' });
        }
      }

    render() {
        const { nidPassport, documents } = this.state;
        const { document, profileData } = this.props;
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
                <div className="col-md-6 mx-auto mt-5">
                    <div className="card bg-light">
                        <div className="card-body">
                    <h5 className="text-center mt-3">Add Document</h5>
                <form onSubmit={this.handleSubmit}>
                <div className="form-group row">
                    <label htmlFor="department" className="col-sm-4 col-form-label">National ID/Passport</label>
                    <div className="col-sm-8">
                    <input
                    id="nidPassport"
                    type="text"
                    className="form-control"
                    placeholder="Enter nid or passport number"
                    name="nidPassport"
                    value={nidPassport}
                    onChange={this.handleChange}
                    /> 
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="file" className="col-sm-4 col-form-label">Document Image</label>
                    <div className="col-sm-8">
                      <input
                          type="file"
                          className="form-control-file"
                          id="identity"
                          onChange={this.handleFile}
                        />
                        <small className="form-text text-muted">Max Size 2mb</small>
                    </div>
                </div>
                <div className="col-sm-4 ">
                <div className="form-group row">
                {
                document.isLoading ?
                <button className="btn my-3 btn-block text-white" disabled>
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
                <button type="submit" className=" btn my-3 btn-block text-white">Add Document</button>
                }
                </div>
                </div>
                </form>
                </div>
                </div>
            </div>
            </div>
            <div className="row">
                <div className="col-md-9 mx-auto my-5">
                {
                    profileData.isLoading ?
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="dark" />
                </div>
                  :
                <div className="table-responsive">
            <table className="table table-sm">
            <thead>
                <tr className="text-white d-flex table-header">
                    <th className="col-4">NID/Passport</th>
                    <th className="col-5">File name</th>
                    <th className="col-3">Status</th>
                </tr>
            </thead>
            <tbody>
                <tr className="d-flex">
                    <td className="col-4">{documents.nidPassport}</td>
                    <td className="col-5"><a href={`${process.env.REACT_APP_BASE_URL}/uploads/user/profiles/${documents.documentUrl}`} target="_blank" rel="noopener noreferrer">{documents.documentUrl}</a></td>
                    <td className="col-3">{documents.status}</td>
                </tr>
            </tbody>
        </table>
        </div>
                }
                </div>
            </div>
            </div>
        </section>
</>
        )
    }
}

const mapStateToProps = (state) =>({
    document: state.addNewDocument,
    profileData: state.getUserInfo,
});

const mapDispatchToProps = (dispatch) =>({
    onAddDocument: (data) =>dispatch(addDocument(data)),
    displayUserInfo: () => dispatch(getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps) (Verification);