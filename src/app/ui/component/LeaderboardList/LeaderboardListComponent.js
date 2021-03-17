import './LeaderboardListStyle';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Loader from 'react-loader';

class LeaderboardListComponent extends PureComponent
{
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        data: PropTypes.object.isRequired,
        error: PropTypes.string
    };

    formatDate(timestamp)
    {
        const date = new Date(parseInt(timestamp));
        return `${ date.getDate() }/${ date.getMonth() + 1 }/${ date.getFullYear() }`;
    }

    render()
    {
        const { 
            loading, error, data 
        } = this.props;
        
        if (loading) {
            return (
                <Loader loaded={ !loading } color={ '#fff' }>
                    <div block="LeaderboardList">Loading...</div>
                </Loader>
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
                    <div block="LeaderboardList" elem="Content">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Player</th>
                                    <th>Score</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                data.getLeaderboard.map(( player, idx ) => (
                                    <tr key={ idx }>
                                        <td>{ idx + 1 }</td>
                                        <td>{ player.nickname }</td>
                                        <td>{ player.score }</td>
                                        <td>{ this.formatDate(player.created_at) }</td>
                                    </tr>
                                ))    
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
    }
}

export default LeaderboardListComponent;
