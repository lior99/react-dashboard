import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { isLoggedIn } from '../../utils'

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
        this.checkCredentials = this.checkCredentials.bind(this);

        this.state = {
            userName: '',
            password: '',
            hasError: false,
            success: false
        }
    }

    async submit(event) {
        event.preventDefault();
        const { userName, password } = this.state;
       
        const isValid = await this.checkCredentials(userName, password);
        if (!isValid){
            this.setState({
                hasError: true
            });
        }
        else {
            localStorage.setItem('token', '123');

            this.setState({
                hasError: false,
                success: true
            })
        }
    }

    async checkCredentials(userName, password) {
        let url = '';

        // if debugging mode than set to local url
        let debug = true;
        if (debug) {
            url = 'http://localhost:777/credentials'
        }
        else {
            url = '';
        }

        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const params = `user=${userName}&password=${password}`;

        const response = await fetch(url, {
            method: 'POST',
            // mode: 'cors',
            headers,
            body: params
        })

        if (response.ok)  {            
            const result = await response.json();
            const { hasError, isValid } = result;

            return !hasError;
        }
        else {
            console.error('response not ok from server');
            return false;
        }

    }

    onChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value,
            hasError: false
        })
    }

    handleKeyPress = (event) => {
        if (event.which === 13) {
            this.submit(event);
        }
    }

    render() {
        const { hasError, success } = this.state;

        if (isLoggedIn()) {
            return <Redirect from="/login" to="/dashboard" />
        }

        const style = hasError ? { visibility: 'visible' } : { visibility: 'hidden'};

        return (
           <FormContainer>
                <div>
                    <TextField
                        hintText="user name"
                        onChange={(event) => this.onChange(event)}
                        name="userName" 
                        value={this.state.userName}
                        onKeyPress={this.handleKeyPress}
                        />
                </div>
                <div>
                    <TextField
                        type="password"
                        hintText="password"
                        onChange={(event) => this.onChange(event)}
                        name="password"
                        value={this.state.password}
                        onKeyPress={this.handleKeyPress} />
                </div>
                <div>
                    <RaisedButton
                        label="login"
                        onClick={this.submit}
                        primary={true} />
                </div>
                <ErrorMessage style={style}>
                    user name or password are incorrect
                </ErrorMessage>
           </FormContainer>
           
        );
    }
}


export default LoginForm;
