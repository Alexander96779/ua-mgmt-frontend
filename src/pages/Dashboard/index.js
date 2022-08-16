import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

class Dashboard extends Component {
    render () {
        return(
    <>
        <Helmet>
            <title>Dashboard</title>
        </Helmet>
        <Navbar />
        <Sidebar />
    </>
        )
    }
}

export default Dashboard;