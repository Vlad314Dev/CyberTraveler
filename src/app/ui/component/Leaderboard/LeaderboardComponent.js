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
                <div block="Leaderboard" elem="UserRank">Authorize to see your current rank</div>
                <LeaderboardList/>
            </div>
        )
    }
}

export default LeaderboardComponent;
