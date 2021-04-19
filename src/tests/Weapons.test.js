/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';

import WeaponsComponent from '../app/ui/component/Weapons/WeaponsComponent';

describe('MainMenuTitle', () => {
    it('Should render', () => {
        // eslint-disable-next-line no-unused-vars
        const component = shallow(
            <WeaponsComponent 
                selectedWeapon={ '' }
                availableWeapons={ [] }
            />
        );
    });

    it('Should render layout', () => {
        const component = shallow(
            <WeaponsComponent 
                selectedWeapon={ '' }
                availableWeapons={ [] }
            />
        );

        expect(component.getElements()).toMatchSnapshot();
    });
});
