/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import './style.scss';

class Navbar extends Component {

    render(){

        return(
        // NAVBAR SECTION
            <nav className="navbar navbar-expand-sm navbar-light">
                <div className="container">
                <a href="/" className="navbar-brand text-white">UAMS</a>
                <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
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
        </ul>
      </div>
        </div>
    </nav>
        )
    }
}

export default Navbar;