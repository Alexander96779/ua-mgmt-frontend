import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class Dashboard extends Component {
    render () {
        return(
    <>
        <Helmet>
            <title>Dashboard</title>
        </Helmet>
        <section>
            <div className='container'>
            <h1>THIS IS THE LANDING PAGE IN WORKS.......</h1>
            </div>
        </section>
    </>
        )
    }
}

export default Dashboard;