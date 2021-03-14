import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setActiveOption } from 'UIStore/MainMenu/MainMenuAction';

import MainMenuAuthorizeLoginComponent from './MainMenuAuthorizeLoginComponent';

export const mapDispatchToProps = (dispatch) => ({
    setActiveOption: (optionName) => dispatch(setActiveOption(optionName))
});

class MainMenuAuthorizeLoginContainer extends PureComponent
{
    render()
    {
        return (
            <MainMenuAuthorizeLoginComponent 
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(MainMenuAuthorizeLoginContainer);
