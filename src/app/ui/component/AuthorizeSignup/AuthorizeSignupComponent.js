import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class AuthorizeSignupComponent extends PureComponent
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
                        <label htmlFor="password">Nickname:</label>
                        <input type="text" name="nickname" id="nickname" />
                    </div>
                    <div block="Form" elem="Field">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <div block="Form" elem="Field">
                        <label htmlFor="password_repeat">Repeat Password:</label>
                        <input type="password" name="password_repeat" id="password_repeat" />
                    </div>
                    <div block="Form" elem="Submit">
                        <button type="submit">Signup</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AuthorizeSignupComponent;
