import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import LeaderboardListComponent from './LeaderboardListComponent.js';
import {
    GqlClient,
    GET_USERS
} from 'Query';

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
        this.getUsers();
    }

    async getUsers() {
        await GqlClient.query({
            query: GET_USERS
        }).then(
            ({ loading, error, data  }) => {
                this.setState({
                        loading,
                        error,
                        data
                    });
            }
        );
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
