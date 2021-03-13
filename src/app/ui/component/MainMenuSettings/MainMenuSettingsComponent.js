import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
    BACK_OPTION,
    optionLabels,
    SETTINGS_DISABLE_SOUND,
    SETTINGS_SHOW_CONTROLS,
} from 'UIStore/MainMenu/MainMenuConfig';

class MainMenuOptionComponent extends PureComponent
{
    static propTypes = {
        activeOption: PropTypes.string.isRequired,
        setActiveOption: PropTypes.func.isRequired
    };

    setActiveOption = (optionName) => () => {
        const { setActiveOption } = this.props;
        setActiveOption(optionName)
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
                    if (option.key === SETTINGS_DISABLE_SOUND 
                        || option.key === SETTINGS_SHOW_CONTROLS
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

export default MainMenuOptionComponent;
