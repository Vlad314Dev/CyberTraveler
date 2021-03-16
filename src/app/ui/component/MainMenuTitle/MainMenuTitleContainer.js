import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import MainMenuTitleComponent from './MainMenuTitleComponent';

export const mapStateToProps = (state) => ({
    isLoggedIn: state.AccountReducer.isLoggedIn,
    nickname: state.AccountReducer.nickname,
});

class MainMenuTitleContainer extends PureComponent
{
    render()
    {
        return (
            <MainMenuTitleComponent
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default connect(mapStateToProps, null)(MainMenuTitleContainer);
