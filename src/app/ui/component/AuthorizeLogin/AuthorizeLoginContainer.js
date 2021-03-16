import { sha256 } from 'crypto-hash';
import { PropTypes } from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import GqlClient, { LOGIN } from 'UIQuery';
import { logIn } from 'UIStore/Account/AccountAction';
import { setActiveOption } from 'UIStore/MainMenu/MainMenuAction';
import { DEFAULT_OPTION } from 'UIStore/MainMenu/MainMenuConfig';

import AuthorizeLoginComponent from './AuthorizeLoginComponent';

export const mapDispatchToProps = (dispatch) => ({
    logIn: (data) => dispatch(logIn(data)),
    setActiveOption: (optionName) => dispatch(setActiveOption(optionName))
});

class AuthorizeLoginContainer extends PureComponent
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
            loading: false
        }
    }

    containerFunctions = {
        handleSubmit: this.handleSubmit.bind(this),
        handleNickname: this.handleNickname.bind(this),
        handlePassword: this.handlePassword.bind(this)
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

    async handleSubmit(e)
    {
        e.preventDefault();

        this.setState({
            loading: true
        });

        try {
            const result = await this.logIn();

            if (result) {
                const { setActiveOption } = this.props;
                this.setState({
                    loading: false
                }); 
                setActiveOption(DEFAULT_OPTION);
            } else {
                this.setState({
                    loading: false
                }); 
                alert('Nickname or password is incorrect.');
            }
        } catch (ex) {
            this.setState({
                loading: false
            }); 
            alert('Something went wrong. Please try again.');
        }  
    }

    async logIn()
    {
        const {
            nickname,
            password
        } = this.state;
        const token = await sha256(nickname + ':' + password + ':' + '314');

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
            <AuthorizeLoginComponent 
                { ...this.props }
                { ...this.state }
                { ...this.containerFunctions }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(AuthorizeLoginContainer);
