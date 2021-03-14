import './AuthorizeSignupStyle';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class AuthorizeSignupComponent extends PureComponent
{
    static propTypes = {
        handleNicknameChange: PropTypes.func.isRequired,
        handlePasswordChange: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired
    };

    render()
    {
        const { 
            handleSubmit,
            handleNicknameChange
        } = this.props;

        return (
            <div block="AuthorizeSignup">
                <form onSubmit={ handleSubmit } block="AuthorizeSignup" elem="Form">
                    <div block="AuthorizeSignup" elem="Field">
                        <label>
                            Nickname:
                            <input type="text" onChange={ handleNicknameChange } />
                        </label>
                    </div>
                    <div block="AuthorizeSignup" elem="Field">
                        <label>
                            Password:
                            <input type="password" />
                        </label>
                    </div>
                    <div block="AuthorizeSignup" elem="Field">
                        <label>
                            Repeat Password:
                            <input type="password" />
                        </label>
                    </div>
                    <div block="AuthorizeSignup" elem="Submit">
                        <button type="submit">Signup</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AuthorizeSignupComponent;
