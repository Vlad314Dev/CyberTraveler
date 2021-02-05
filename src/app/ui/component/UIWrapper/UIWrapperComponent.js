import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TestSceneEmitter, {
    TEST_EVENT
} from 'GameUIBridge/TestSceneEmitter';

import LeaderboardList from 'UIComponent/LeaderboardList';

import './UIWrapperStyle.scss';

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
