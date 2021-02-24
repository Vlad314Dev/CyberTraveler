import './UIWrapperStyle';

import TestSceneEmitter, {
    TEST_EVENT
} from 'GUIBridgeEmitter/TestSceneEmitter';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import LeaderboardList from 'UIComponent/LeaderboardList';

class UIWrapperComponent extends PureComponent
{
    static propTypes = {
        score: PropTypes.number.isRequired,
        p1Health: PropTypes.number.isRequired,
        debugData: PropTypes.object
    };

    renderP1Health(p1Health)
    {
        if (p1Health <= 0) {
            return ( 
                <div block="UI" elem="P1HealthBar">DEAD</div>
            );
        }

        const healthBar = Array.from(Array(p1Health).keys());

        return (
            <div block="UI" elem="P1HealthBar">
                {healthBar.map((value, index) => {
                    return <span 
                        block="P1HealthBar" 
                        elem="HealthElem"
                        key={ index }
                    ></span>
                })}
            </div>
        );
    }

    render()
    {
        const { 
            score,
            p1Health,
            debugData
        } = this.props;
        
        return (
            <div block="UIWrapper">
                UI Score: { score }
                { <LeaderboardList /> }
                <button onClick={ () => TestSceneEmitter.emit(TEST_EVENT) }>Click Me To Test Emitter</button>
                <div>
                    x: { debugData.x },
                    y: { debugData.y },
                    body_x: { debugData.body_x },
                    body_y: { debugData.body_y }
                </div>
                { this.renderP1Health(p1Health) }
            </div>
        );
    }
}

export default UIWrapperComponent;
