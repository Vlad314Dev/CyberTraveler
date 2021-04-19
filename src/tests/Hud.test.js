/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';

import HudComponent from '../app/ui/component/Hud/HudComponent';

describe('Hud', () => {
    it('Should render', () => {
        // eslint-disable-next-line no-unused-vars
        const component = shallow(
            <HudComponent/>
        );
    });

    it('Should render layout', () => {
        const component = shallow(
            <HudComponent/>
        );

        expect(component.getElements()).toMatchSnapshot();
    });
});
