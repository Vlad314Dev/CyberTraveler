import './MainMenuTitleStyle';

import React, { PureComponent } from 'react';

class MainMenuTitleComponent extends PureComponent
{
    render()
    {
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
