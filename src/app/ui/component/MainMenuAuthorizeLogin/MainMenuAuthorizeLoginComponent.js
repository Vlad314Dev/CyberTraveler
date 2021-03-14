import './MainMenuAuthorizeLoginStyle';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import AuthorizeLogin from 'UIComponent/AuthorizeLogin';
import {
    AUTHORIZE_OPTION,
    BACK_OPTION,
    optionLabels
} from 'UIStore/MainMenu/MainMenuConfig';

class MainMenuAuthorizeLoginComponent extends PureComponent
{
    static propTypes = {
        setActiveOption: PropTypes.func.isRequired
    };

    setActiveOption = (optionName) => () => {
        const { setActiveOption } = this.props;
        setActiveOption(optionName)
    }

    render()
    {
        return (
            <>
                <AuthorizeLogin />
                <div block="MainMenuOption" elem="List">
                    {optionLabels.map((option, index) => {
                        if (option.key === BACK_OPTION) {
                            return <div 
                                block="MainMenuOption" 
                                elem="Wrapper" 
                                key={ index }
                            >
                                <span 
                                    block="MainMenuOption" 
                                    elem="Value"
                                    key={ index }
                                    onClick={ this.setActiveOption(AUTHORIZE_OPTION) }
                                >{ option.label }</span>
                            </div>
                        }
                        
                        return null;
                    })}
                </div>
            </>
        );
    }
}

export default MainMenuAuthorizeLoginComponent;
