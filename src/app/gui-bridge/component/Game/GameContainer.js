import BootScene from 'GameScene/BootScene';
import GameScene from 'GameScene/GameScene';
import Phaser from 'phaser';
import { PropTypes } from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import GameComponent from './GameComponent';

const mapStateToProps = (state) => ({
    userSettings: state.GameSettingsReducer.userSettings
});

class GameContainer extends PureComponent
{
    static propTypes = {
        userSettings: PropTypes.object
    }

    static defaultProps = {
        userSettings: {}
    }

    constructor(props) 
    {
        super(props);

        this.state = {
            initialize: true,
            game: {
                width: 800,
                height: 600,
                type: Phaser.AUTO,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: {
                            y: 800
                        },
                        debug: true
                    }
                },
                scene: [
                    BootScene,
                    GameScene
                ]
            }
        }
    }

    componentDidUpdate(prevProps) {
        const { userSettings } = this.props;
        const { userSettings: oldUserSettings } = prevProps;
        
        if (oldUserSettings !== userSettings) {
            const { game } = this.state;
            
            this.setState({
                game: {
                    ...game,
                    ...userSettings
                }    
            });
        }
    }

    render() 
    {
        return (
            <GameComponent
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default connect(mapStateToProps, null)(GameContainer);
