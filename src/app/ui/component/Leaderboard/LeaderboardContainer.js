import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import LeaderboardComponent from './LeaderboardComponent';

class LeaderboardContainer extends PureComponent
{
    render()
    {
        return (
            <LeaderboardComponent 
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default connect(null, null)(LeaderboardContainer);
