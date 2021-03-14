import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import GqlClient, {
    GET_LEADERBOARD
} from 'UIQuery';

import LeaderboardListComponent from './LeaderboardListComponent';

class LeaderboardListContainer extends PureComponent
{
    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            error: null,
            data: {}
        };
    }

    componentDidMount() {
        this.getLeaderboard();
    }

    async getLeaderboard() {
        try {
            await GqlClient.query({
                query: GET_LEADERBOARD
            }).then(
                ({ loading, error, data  }) => {
                    this.setState({
                            loading,
                            error,
                            data
                        });
                }
            );
        } catch (err) {
            console.log(err);
        }
    }

    render()
    {
        return (
            <LeaderboardListComponent 
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default connect(null, null)(LeaderboardListContainer);
