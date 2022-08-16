/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import './style.scss';

class Navbar extends Component {

  onLogout = () => {
    localStorage.clear();
     window.location.href = '/';
   }

    render(){

      const email = localStorage.getItem('username');
      let element = email ?  <a href="/dashboard" className="navbar-brand text-white">
                                UAMS
                              </a>
                          : <a href="/" className="navbar-brand text-white">
                              UAMS
                            </a>
        return(
        // NAVBAR SECTION
            <nav className="navbar navbar-expand-sm navbar-light">
                <div className="container">
                {element}
                <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
        { email ?
                    <li className="nav-item dropdown dropdown-part">
                      <a href="#" className="nav-link dropdown-toggle text-white" data-toggle="dropdown">
                      {email}
                      </a>
                      <div className="dropdown-menu user-data">
                      <a href="user-profile" className="dropdown-item">
                        <i className="fa fa-user-circle-o"></i> Profile
                      </a>
                      <a onClick={() => this.onLogout()} className="dropdown-item">
                          <i className="fa fa-power-off"></i> Logout
                      </a>
                      </div>
                    </li>
                  :
          <>
          <li className="nav-item dropdown mr-3">
            <a href="/signup" className="nav-link text-white">
                Signup
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link text-white">
                Login
            </a>
          </li>
          </>
          }
        </ul>
      </div>
        </div>
    </nav>
        )
    }
}

export default Navbar;