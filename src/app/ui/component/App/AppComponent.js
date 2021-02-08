import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TestSceneEmitter, {
    TEST_EVENT
} from '../UIWrapper/node_modules/GameUIBridge/TestSceneEmitter';

import LeaderboardList from 'Component/LeaderboardList';

import './UIStyle.scss';

class AppComponent extends PureComponent
{
    static propTypes = {
        score: PropTypes.number.isRequired
    };

    render()
    {
        const { score } = this.props;
        
        return(
            <div block="UI">
                UI Score: { score }
                { <LeaderboardList /> }
                <button onClick={ () => TestSceneEmitter.emit(TEST_EVENT) }>Click Me To Test Emitter</button>
            </div>
        );
    }
}

export default AppComponent;
