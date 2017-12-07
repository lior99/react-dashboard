import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';
import LoginForm from './login/LoginForm';
import { isLoggedIn } from '../utils';

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isLoggedIn() ? (
        <Component {...props} />
      ) : <Redirect to='/login' />
    )} />
  )


const Routes = () => (
    <Switch>
        <AuthRoute exact={true} path="/" component={Dashboard} />
        <Route exact={true} path="/login" component={LoginForm} /> 
        <Route exact={true} path="/dashboard" component={Dashboard} />
        <Route path="*" render={() => {
            <Redirect to="/login" />
        }} /> 
    </Switch>
)

export default Routes;