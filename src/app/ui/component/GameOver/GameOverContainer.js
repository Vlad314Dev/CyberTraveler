import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import GqlClient, {
    ADD_TO_LEADERBOARD,
    LOGIN
} from 'UIQuery';

import GameOverComponent from './GameOverComponent';

export const mapStateToProps = (state) => ({
    score: state.ScoreReducer.score
});

class GameOverContainer extends PureComponent
{
    static propTypes = {
        score: PropTypes.number.isRequired
    };

    componentDidMount()
    {
        this.savePlayerScore();
    }

    savePlayerScore()
    {
        try {
            let nickname = localStorage.getItem('nickname');
            const token = localStorage.getItem('token');

            GqlClient.query({
                query: LOGIN,
                variables: {
                    nickname: nickname,
                    password: token
                },
                fetchPolicy: 'no-cache'
            }).then(
                ({ data: { logIn: result } }) => {
                    const { score } = this.props;
    
                    if (!result) {
                        nickname = 'Guest';
                    }
    
                    GqlClient.query({
                        query: ADD_TO_LEADERBOARD,
                        variables: {
                            score: score,
                            userId: result,
                            nickname: nickname
                        },
                        fetchPolicy: 'no-cache'
                    });
    
                }
            );   
        } catch(ex) {
            return;
        }
    }

    render()
    {
        return (
            <GameOverComponent
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default connect(mapStateToProps, null)(GameOverContainer);
