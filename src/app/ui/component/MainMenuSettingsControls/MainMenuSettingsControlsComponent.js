import './MainMenuSettingsControlsStyle';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
    BACK_OPTION,
    optionLabels,
    SETTINGS_OPTION
} from 'UIStore/MainMenu/MainMenuConfig';

class MainMenuSettingsControlsComponent extends PureComponent
{
    static propTypes = {
        setActiveOption: PropTypes.func.isRequired,
        type: PropTypes.string.isRequired
    };

    setActiveOption = (optionName) => () => {
        const { setActiveOption } = this.props;
        setActiveOption(optionName)
    }

    renderControls()
    {
        const { type } = this.props;

        return (
            <div block="SettingsControls" elem="Wrapper">
                <div block="SettingsControls" elem="Image" mods={ { type: type } }></div>
            </div>
        );
    }

    render()
    {
        return (
            <>
                { this.renderControls() }
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
                                    onClick={ this.setActiveOption(SETTINGS_OPTION) }
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

export default MainMenuSettingsControlsComponent;
