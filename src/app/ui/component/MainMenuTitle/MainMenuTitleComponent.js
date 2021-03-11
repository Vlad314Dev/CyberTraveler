import './MainMenuTitleStyle';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { 
    DEFAULT_OPTION,
    optionLabels
} from 'UIStore/MainMenu/MainMenuConfig';

class MainMenuTitleComponent extends PureComponent
{
    static propTypes = {
        activeOption: PropTypes.string.isRequired
    };

    getActiveOptionLabel()
    {
        const { activeOption } = this.props;
        const option = optionLabels.find((data) => data.key === activeOption);

        return option.label;
    }

    render()
    {
        const { activeOption } = this.props;

        if (activeOption !== DEFAULT_OPTION) {
            return (
                <div block="MainMenuTitle">
                    <div block="MainMenuTitle" elem="General">
                        <span block="MainMenuTitle" elem="Value">Cyber Traveler</span>
                    </div>
                    <div block="MainMenuTitle" elem="Sub">
                        <span block="MainMenuTitle" elem="Value">{ this.getActiveOptionLabel() }</span>
                    </div>
                </div>
            );
        }

        return (
            <div block="MainMenuTitle">
                <div block="MainMenuTitle" elem="General">
                    <span block="MainMenuTitle" elem="Value">Cyber Traveler</span>
                </div>
            </div>
        );
    }
}

export default MainMenuTitleComponent;
