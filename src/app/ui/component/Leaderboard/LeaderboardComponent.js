import './LeaderboardStyle';

import React, { PureComponent } from 'react';
import LeaderboardList from 'UIComponent/LeaderboardList';

class LeaderboardComponent extends PureComponent
{
    render()
    {
        return (
            <div block="Leaderboard">
                <div block="Leaderboard" elem="Title">TOP 10</div>
                <LeaderboardList/>
            </div>
        )
    }
}

export default LeaderboardComponent;
