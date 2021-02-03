import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './LeaderboardListStyle.scss';

class LeaderboardListComponent extends PureComponent
{
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        data: PropTypes.object.isRequired,
        error: PropTypes.string
    };

    render()
    {
        const { 
            loading, error, data 
        } = this.props;
        
        if (loading) {
            return (
                <div block="LeaderboardList">Loading...</div>
            );
        }

        if (error) {
            return (
                <div block="LeaderboardList">Error: { error }</div>
            )
        }

        if (data) {
            return (
                <div block="LeaderboardList">
                    Leaderboard
                    {
                        data.getUsers.map(( user, idx ) => (
                            <p key={ idx }>{ user.nickname }</p>
                        ))
                    }
                </div>
            )
        }
    }
}

export default LeaderboardListComponent;
