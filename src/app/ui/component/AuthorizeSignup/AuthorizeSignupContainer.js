// import { PropTypes } from 'prop-types';
import { sha256 } from 'crypto-hash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import GqlClient, {
    SIGNUP
} from 'UIQuery';

import AuthorizeSignupComponent from './AuthorizeSignupComponent';

class AuthorizeSignupContainer extends PureComponent
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            nickname: '',
            password: '',
            passwordRepeat: '',
            loading: false,
            isValidated: false
        }
    }

    containerFunctions = {
        handleSubmit: this.handleSubmit.bind(this),
        handleNickname: this.handleNickname.bind(this),
        handlePassword: this.handlePassword.bind(this),
        handlePasswordRepeat: this.handlePasswordRepeat.bind(this)
    };
    
    handleNickname(e)
    {
        this.setState({
            nickname: e.target.value
        });
    }

    handlePassword(e)
    {
        this.setState({
            password: e.target.value
        });
    }

    handlePasswordRepeat(e)
    {
        this.setState({
            passwordRepeat: e.target.value
        });
    }

    validateFormData()
    {
        const {
            nickname,
            password,
            passwordRepeat
        } = this.state;

        if (!nickname || !password) {
            alert('Error.');
            return false;
        }

        if (password !== passwordRepeat) {
            alert('Passwords do not match.');
            return false;
        }

        if (nickname.length < 3 || nickname.length > 15) {
            alert('Nickname has to be 3-15 characters long.');
            return false;
        }

        if (password.length < 6) {
            alert('Password is too short.');
            return false;
        }

        if (password.length > 255) {
            alert('Password is too long.');
            return false;
        }

        return true;
    }

    async handleSubmit(e)
    {        
        e.preventDefault();
        if (this.validateFormData()) {
            this.setState({
                loading: true
            });
    
            try {
                await this.signUp();
                alert('Success.');
            } catch (err) {
                alert('Something went wrong. Please try again.');
            }
    
            this.setState({
                loading: false
            });
        }
    }

    async signUp()
    {
        const {
            nickname,
            password
        } = this.state;
        const hashedPassword = await sha256(password);
        
        await GqlClient.mutate({
            mutation: SIGNUP,
            variables: {
                nickname: nickname,
                password: hashedPassword
            },
            fetchPolicy: 'no-cache'
        }).then(
            ({ error, data }) => {
                this.setState({
                    error,
                    data
                });
            }
        );
    }

    render()
    {
        return (
            <AuthorizeSignupComponent 
                { ...this.props }
                { ...this.state }
                { ...this.containerFunctions }
            />
        );
    }
}

export default connect(null, null)(AuthorizeSignupContainer);
