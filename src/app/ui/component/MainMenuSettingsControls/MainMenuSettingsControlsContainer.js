import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setActiveOption } from 'UIStore/MainMenu/MainMenuAction';

import MainMenuSettingsComponent from './MainMenuSettingsControlsComponent';

export const mapDispatchToProps = (dispatch) => ({
    setActiveOption: (optionName) => dispatch(setActiveOption(optionName))
});

export const mapStateToProps = (state) => ({
    activeOption: state.GameReducer.activeOption
});

class MainMenuSettingsControlsContainer extends PureComponent
{
    render()
    {
        return (
            <MainMenuSettingsComponent 
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default connect(null, mapDispatchToProps)(MainMenuSettingsControlsContainer);
