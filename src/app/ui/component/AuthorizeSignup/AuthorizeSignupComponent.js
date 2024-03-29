import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Loader from 'react-loader';

class AuthorizeSignupComponent extends PureComponent
{
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        handleNickname: PropTypes.func.isRequired,
        handlePassword: PropTypes.func.isRequired,
        handlePasswordRepeat: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired
    };

    render()
    {
        const { 
            handleSubmit,
            handleNickname,
            handlePassword,
            handlePasswordRepeat,
            loading
        } = this.props;

        return (
            <Loader loaded={ !loading } color={ '#fff' }>
                <div block="AuthorizeSignup">
                    <form onSubmit={ handleSubmit } block="Form">
                        <div block="Form" elem="Field">
                            <label htmlFor="nickname">Nickname:</label>
                            <input type="text" name="nickname" id="nickname" placeholder="Nickname" onChange={ handleNickname } />
                        </div>
                        <div block="Form" elem="Field">
                            <label htmlFor="password">Password:</label>
                            <input type="password" name="password" id="password" onChange={ handlePassword } />
                        </div>
                        <div block="Form" elem="Field">
                            <label htmlFor="password_repeat">Repeat Password:</label>
                            <input type="password" name="password_repeat" id="password_repeat" onChange={ handlePasswordRepeat } />
                        </div>
                        <div block="Form" elem="Submit">
                            <button type="submit">Signup</button>
                        </div>
                    </form>
                </div>
            </Loader>
        );
    }
}

export default AuthorizeSignupComponent;
