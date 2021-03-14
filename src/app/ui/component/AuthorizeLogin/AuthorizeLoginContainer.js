import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import LeaderboardComponent from './AuthorizeLoginComponent';

class AuthorizeLoginContainer extends PureComponent
{
    containerFunctions = {
        handleSubmit: this.handleSubmit.bind(this)
    };

    handleSubmit(data)
    {
        console.log(this, data);
    }

    render()
    {
        return (
            <LeaderboardComponent 
                { ...this.props }
                { ...this.state }
                { ...this.containerFunctions }
            />
        );
    }
}

export default connect(null, null)(AuthorizeLoginContainer);
