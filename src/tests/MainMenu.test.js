/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';

import MainMenuComponent from '../app/ui/component/MainMenu/MainMenuComponent';

describe('MainMenu', () => {
    it('Should render', () => {
        // eslint-disable-next-line no-unused-vars
        const component = shallow(
            <MainMenuComponent 
                activeOption={ '' }
            />
        );
    });

    it('Should render layout', () => {
        const component = shallow(
            <MainMenuComponent 
                activeOption={ '' }
            />
        );

        expect(component.getElements()).toMatchSnapshot();
    });
});
