import MainMenuScene from 'GameScene/MainMenuScene';
import Phaser from 'phaser';
import { PropTypes } from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import GameComponent from './GameComponent';

const mapStateToProps = (state) => ({
    userSettings: state.GameReducer.userSettings,
    currentScene: state.GameReducer.currentScene,
    isGameOver: state.GameReducer.isGameOver
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

        const { userSettings } = props;

        this.state = {
            initialize: true,
            game: {
                width: window.innerWidth > 1200 ? 1200 : window.innerWidth,
                height: window.innerHeight > 600 ? 600 : window.innerHeight,
                type: Phaser.AUTO,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: {
                            y: 800
                        },
                        debug: false
                    }
                },
                scene: [
                    MainMenuScene
                ],
                render: {
                    pixelArt: true
                },
                ...userSettings
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
