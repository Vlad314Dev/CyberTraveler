/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';

import MainMenuDefaultComponent from '../app/ui/component/MainMenuDefault/MainMenuDefaultComponent';

describe('MainMenuDefault', () => {
    it('Should render', () => {
        // eslint-disable-next-line no-unused-vars
        const component = shallow(
            <MainMenuDefaultComponent 
                activeOption={ '' }
                setActiveOption={ jest.fn() }
            />
        );
    });

    it('Should render layout', () => {
        const component = shallow(
            <MainMenuDefaultComponent 
                activeOption={ '' }
                setActiveOption={ jest.fn() }
            />
        );

        expect(component.getElements()).toMatchSnapshot();
    });
});
