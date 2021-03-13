import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import MainMenuTitleComponent from './MainMenuTitleComponent';

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

export default connect(null, null)(MainMenuTitleContainer);
