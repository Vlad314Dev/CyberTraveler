import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import LeaderboardComponent from './AuthorizeLoginComponent';

class AuthorizeLoginContainer extends PureComponent
{
    containerFunctions = {
        handleNicknameChange: this.handleNicknameChange.bind(this),
        handleSubmit: this.handleSubmit.bind(this)
    };

    handleNicknameChange(data)
    {
        console.log(this, data);
    }

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
