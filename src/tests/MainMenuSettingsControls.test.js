/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';

import MainMenuSettingsControlsComponent from '../app/ui/component/MainMenuSettingsControls/MainMenuSettingsControlsComponent';

describe('MainMenuSettings', () => {
    it('Should render', () => {
        // eslint-disable-next-line no-unused-vars
        const component = shallow(
            <MainMenuSettingsControlsComponent 
                setActiveOption={ jest.fn() }
                type={ '' }
            />
        );
    });

    it('Should render layout', () => {
        const component = shallow(
            <MainMenuSettingsControlsComponent 
                setActiveOption={ jest.fn() }
                type={ '' }
            />
        );

        expect(component.getElements()).toMatchSnapshot();
    });
});
