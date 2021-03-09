import './UIWrapperStyle';

import React, { PureComponent } from 'react';
import HealthBar from 'UIComponent/HealthBar';
import Score from 'UIComponent/Score';
import Weapons from 'UIComponent/Weapons';

class UIWrapperComponent extends PureComponent
{
    render()
    {
        return (
            <div block="UIWrapper">
                <HealthBar/>
                <Weapons/>
                <Score/>
            </div>
        );
    }
}

export default UIWrapperComponent;
