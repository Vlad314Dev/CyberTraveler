import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Loader from 'react-loader';

class AuthorizeLoginComponent extends PureComponent
{
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        handleNickname: PropTypes.func.isRequired,
        handlePassword: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired
    };

    render()
    {
        const { 
            handleSubmit,
            handleNickname,
            handlePassword,
            loading
        } = this.props;

        return (
            <Loader loaded={ !loading } color={ '#fff' }>
                <div block="AuthorizeSignup">
                    <form onSubmit={ handleSubmit } block="Form">
                        <div block="Form" elem="Field">
                            <label htmlFor="nickname">Nickname:</label>
                            <input type="text" name="nickname" id="nickname" onChange={ handleNickname } />
                        </div>
                        <div block="Form" elem="Field">
                            <label htmlFor="password">Password:</label>
                            <input type="password" name="password" id="password" onChange={ handlePassword } />
                        </div>
                        <div block="Form" elem="Submit">
                            <button type="submit" onSubmit={ handleSubmit }>Login</button>
                        </div>
                    </form>
                </div>
            </Loader>
        );
    }
}

export default AuthorizeLoginComponent;
