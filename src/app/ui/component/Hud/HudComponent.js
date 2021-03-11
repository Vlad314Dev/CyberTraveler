import './HudStyle';

import React, { PureComponent } from 'react';
import HealthBar from 'UIComponent/HealthBar';
import Score from 'UIComponent/Score';
import Weapons from 'UIComponent/Weapons';

class HudComponent extends PureComponent
{
    render()
    {
        return (
            <div block="Hud">
                <HealthBar/>
                <Weapons/>
                <Score/>
            </div>
        );
    }
}

export default HudComponent;
