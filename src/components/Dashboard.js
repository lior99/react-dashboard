import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { isLoggedIn } from '../utils';
import { Redirect } from 'react-router-dom';
import CircularProgressContainer from './CircularProgressContainer';

class Dashboard extends Component {
    constructor() {
        super();

    }

    render() {
        const isUserLoggedIn = isLoggedIn();
        console.log('is logged in', isUserLoggedIn);

        if (!isUserLoggedIn) {
            console.log('will try and redirect');
            return (<Redirect from="/dashboard" to="/login" />)
        }

        return (
            <div>
                <Header />
                <CircularProgressContainer />
            </div>
        );
    }
}

Dashboard.propTypes = {

};

export default Dashboard;