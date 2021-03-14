import './AuthorizeLoginStyle';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class AuthorizeLoginComponent extends PureComponent
{
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired
    };

    render()
    {
        const { 
            handleSubmit
        } = this.props;

        return (
            <div block="AuthorizeSignup">
                <form onSubmit={ handleSubmit } block="Form">
                    <div block="Form" elem="Field">
                        <label htmlFor="nickname">Nickname:</label>
                        <input type="text" name="nickname" id="nickname" />
                    </div>
                    <div block="Form" elem="Field">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <div block="Form" elem="Submit">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AuthorizeLoginComponent;
