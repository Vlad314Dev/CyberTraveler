import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setActiveOption } from 'UIStore/MainMenu/MainMenuAction';

import MainMenuLeaderboardComponent from './MainMenuLeaderboardComponent';

export const mapDispatchToProps = (dispatch) => ({
    setActiveOption: (optionName) => dispatch(setActiveOption(optionName))
});

class MainMenuLeaderboardContainer extends PureComponent
{
    render()
    {
        return (
            <MainMenuLeaderboardComponent 
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(MainMenuLeaderboardContainer);
