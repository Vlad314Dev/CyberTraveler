import './MainMenuAuthorizeStyle';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
    AUTHORIZE_LOGIN_OPTION,
    AUTHORIZE_SIGNUP_OPTION,
    BACK_OPTION,
    optionLabels
} from 'UIStore/MainMenu/MainMenuConfig';

class MainMenuAuthorizeComponent extends PureComponent
{
    static propTypes = {
        activeOption: PropTypes.string.isRequired,
        setActiveOption: PropTypes.func.isRequired
    };

    setActiveOption = (optionName) => () => {
        const { setActiveOption } = this.props;
        setActiveOption(optionName);
    }

    getActiveOptionLabel()
    {
        const { activeOption } = this.props;
        const option = optionLabels.find((data) => data.key === activeOption);

        return option.label;
    }

    render()
    {
        return (
            <div block="MainMenuOption" elem="List">
                <span block="MainMenuOption" elem="ActiveLabel">{ this.getActiveOptionLabel() }</span>
                {optionLabels.map((option, index) => {
                    if (option.key === AUTHORIZE_LOGIN_OPTION
                        || option.key === AUTHORIZE_SIGNUP_OPTION
                        || option.key === BACK_OPTION 
                    ) {
                        return <div 
                            block="MainMenuOption" 
                            elem="Wrapper" 
                            key={ index }
                        >
                            <span 
                                block="MainMenuOption" 
                                elem="Value"
                                key={ index }
                                onClick={ this.setActiveOption(option.key) }
                            >{ option.label }</span>
                        </div>
                    }
                    
                    return null;
                })}
            </div>
        );
    }
}

export default MainMenuAuthorizeComponent;
