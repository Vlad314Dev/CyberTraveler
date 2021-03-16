import { sha256 } from 'crypto-hash';
import { PropTypes } from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import GqlClient, {
    LOGIN,
    SIGNUP
} from 'UIQuery';
import { logIn } from 'UIStore/Account/AccountAction';
import { setActiveOption } from 'UIStore/MainMenu/MainMenuAction';
import { DEFAULT_OPTION } from 'UIStore/MainMenu/MainMenuConfig';

import AuthorizeSignupComponent from './AuthorizeSignupComponent';

export const mapDispatchToProps = (dispatch) => ({
    logIn: (data) => dispatch(logIn(data)),
    setActiveOption: (optionName) => dispatch(setActiveOption(optionName))
});

class AuthorizeSignupContainer extends PureComponent
{
    static propTypes = {
        logIn: PropTypes.func.isRequired,
        setActiveOption: PropTypes.func.isRequired
    };

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
            const { setActiveOption } = this.props;
            let success = false;

            this.setState({
                loading: true
            });
    
            try {
                success = await this.signUp();
                alert('Success.');
            } catch (ex) {
                if (ex.message.includes('ER_DUP_ENTRY')) {
                    alert('Nickname is already taken. Please choose another nickname.');
                } else {
                    alert('Something went wrong. Please try again.');
                }
            }
    
            this.setState({
                loading: false
            });

            if (success) {
                setActiveOption(DEFAULT_OPTION);
            }
        }
    }

    async signUp()
    {
        const {
            nickname,
            password
        } = this.state;
        const token = await sha256(nickname + ':' + password + ':' + '314');
        
        return await GqlClient.mutate({
            mutation: SIGNUP,
            variables: {
                nickname,
                password: token
            },
            fetchPolicy: 'no-cache'
        }).then(
            async ({ data: { signUp: result } }) => {
                let success = false;

                if (result) {
                    try {
                      success = await this.logIn(nickname, token);
                    } catch (ex) {
                        alert('Something went wrong. Please try again.');
                    }
                }

                return success;
            }
        );
    }

    async logIn(nickname, token)
    {
        return await GqlClient.query({
            query: LOGIN,
            variables: {
                nickname: nickname,
                password: token
            },
            fetchPolicy: 'no-cache'
        }).then(
            ({ data: { logIn: result } }) => {
                const { logIn } = this.props;
                
                if (result) {
                    logIn({ nickname, token });
                }

                return result;
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

export default connect(null, mapDispatchToProps)(AuthorizeSignupContainer);
