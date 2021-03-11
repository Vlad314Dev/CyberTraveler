import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import HudComponent from './HudComponent';

class HudContainer extends PureComponent
{
    render()
    {
        return (
            <HudComponent 
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default connect(null, null)(HudContainer);
