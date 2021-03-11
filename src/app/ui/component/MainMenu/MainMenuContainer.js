import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import MainMenuComponent from './MainMenuComponent';

export const mapStateToProps = (state) => ({
    activeOption: state.MainMenuReducer.activeOption
});

class MainMenuContainer extends PureComponent
{   
    render()
    {
        return (
            <MainMenuComponent 
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default connect(mapStateToProps, null)(MainMenuContainer);
