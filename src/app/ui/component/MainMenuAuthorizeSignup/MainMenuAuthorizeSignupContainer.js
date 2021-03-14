import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setActiveOption } from 'UIStore/MainMenu/MainMenuAction';

import MainMenuAuthorizeSignupComponent from './MainMenuAuthorizeSignupComponent';

export const mapDispatchToProps = (dispatch) => ({
    setActiveOption: (optionName) => dispatch(setActiveOption(optionName))
});

class MainMenuAuthorizeSignupContainer extends PureComponent
{
    render()
    {
        return (
            <MainMenuAuthorizeSignupComponent 
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(MainMenuAuthorizeSignupContainer);
