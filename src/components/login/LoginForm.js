import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import 'whatwg-fetch';
import { isLoggedIn, checkCredentials } from '../../utils';

const ErrorMessage = styled.div`
    margin-top: 10px;
    color: red;
    font-size: 15px;
    visibility: hidden;
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
`;

class LoginForm extends React.Component {
  constructor() {
    super();

    this.submit = this.submit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.state = {
      userName: '',
      password: '',
      hasError: false,
    }
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      hasError: false
    })
  }

  async submit(event) {
    event.preventDefault();
    const { userName, password } = this.state;
    const isValid = await checkCredentials(userName, password);
    if (!isValid) {
      this.setState({
        hasError: true
      });
    } else {
      window.localStorage.setItem('token', '123');

      this.setState({
        hasError: false,
      })
    }
  }

  handleKeyPress(event) {
    if (event.which === 13) {
      this.submit(event);
    }
  }

  render() {
    const { hasError } = this.state;

    if (isLoggedIn()) {
      return <Redirect from="/login" to="/dashboard" />
    }

    const style = hasError ? { visibility: 'visible' } : { visibility: 'hidden' };

    return (
      <FormContainer>
        <div>
              <TextField
                hintText="user name"
                onChange={event => this.onChange(event)}
                name="userName"
                value={this.state.userName}
                onKeyPress={this.handleKeyPress}
              />
        </div>
            <div>
              <TextField
                type="password"
                hintText="password"
                onChange={event => this.onChange(event)}
                name="password"
                value={this.state.password}
                onKeyPress={this.handleKeyPress}
              />
            </div>
            <div>
              <RaisedButton
                label="login"
                onClick={this.submit}
                primary
              />
            </div>
            <ErrorMessage style={style}>
                    user name or password are incorrect
            </ErrorMessage>
      </FormContainer>
    );
  }
}

export default LoginForm;
