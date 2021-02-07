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
        score: PropTypes.number.isRequired
    };

    render()
    {
        const { score } = this.props;
        
        return(
            <div block="UIWrapper">
                UI Score: { score }
                { <LeaderboardList /> }
                <button onClick={ () => TestSceneEmitter.emit(TEST_EVENT) }>Click Me To Test Emitter</button>
            </div>
        );
    }
}

export default UIWrapperComponent;
