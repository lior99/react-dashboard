import React, { Component } from 'react';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router-dom';

const HeaderContainer = styled.div`
    background-color: #17b3e5;
    color: white;
    font-weight: bold;
    font-size: 20px;
    height: 80px;
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-right: 10px;
    padding-left: 10px;
`;


class Header extends Component {
    constructor() {
        super();
        this.signout = this.signout.bind(this);
    }

    signout() {
        localStorage.removeItem('token');
        this.props.history.push('/login');
    }

    render() {
        return (
            <div>
                  <HeaderContainer>
                      <div>Dashboard</div>
                    <RaisedButton
                        backgroundColor="#f25656"
                        labelStyle={{color:"#fff"}}
                        label="sign out"
                        onClick={ this.signout }
                        />
                  </HeaderContainer>
            </div>
        );
    }
}

export default withRouter(Header);