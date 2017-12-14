import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dashboard from '../Dashboard';
import LoginForm from '../login/LoginForm';
import { isLoggedIn } from '../../utils';
import NoMatch from './NoMatch';

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props => (
      isLoggedIn() ? (
        <Component {...props} />
        ) : <Redirect to="/login" />
      )}
    />
)

const Routes = () => (
    <Switch>
        <AuthRoute exact path="/" component={Dashboard} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="*" component={NoMatch} />
    </Switch>
)

AuthRoute.propTypes = {
  component: PropTypes.element.isRequired
}


export default Routes;
