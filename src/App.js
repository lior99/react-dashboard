import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/login/LoginForm';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Routes from './components/routes/Routes';

class App extends Component {
  render() {
    return (
        <MuiThemeProvider>      
            <Routes />
        </MuiThemeProvider>      
    );
  }
}

export default App;
