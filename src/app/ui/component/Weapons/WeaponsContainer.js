import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import WeaponsComponent from './WeaponsComponent';

export const mapStateToProps = (state) => ({
    selectedWeapon: state.WeaponReducer.selectedWeapon,
    availableWeapons: state.WeaponReducer.availableWeapons
});

class WeaponsContainer extends PureComponent
{
    render()
    {
        return (
            <WeaponsComponent 
                { ...this.props }
                { ...this.state }
            />
        );
    }
}

export default connect(mapStateToProps, null)(WeaponsContainer);
