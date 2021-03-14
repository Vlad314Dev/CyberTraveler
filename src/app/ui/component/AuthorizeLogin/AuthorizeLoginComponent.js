import './AuthorizeLoginStyle';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class AuthorizeLoginComponent extends PureComponent
{
    static propTypes = {
        handleNicknameChange: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired
    };

    render()
    {
        const { 
            handleSubmit,
            handleNicknameChange
        } = this.props;

        return (
            <div block="Authorize">
                <form onSubmit={ handleSubmit } block="Authorize" elem="Form">
                    <div block="Authorize" elem="Field">
                        <label>
                            Nickname:
                            <input type="text" onChange={ handleNicknameChange } />
                        </label>
                    </div>
                    <div block="Authorize" elem="Field">
                        <label>
                            Password:
                            <input type="password" />
                        </label>
                    </div>
                    <div block="Authorize" elem="Submit">
                        <button type="submit">Authorize</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AuthorizeLoginComponent;
