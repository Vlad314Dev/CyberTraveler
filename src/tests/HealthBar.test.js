/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';

import HealthBarComponent from '../app/ui/component/HealthBar/HealthBarComponent';

describe('HealthBar', () => {
    it('Should render', () => {
        // eslint-disable-next-line no-unused-vars
        const component = shallow(
            <HealthBarComponent 
                p1Health={ 5 }
            />
        );
    });

    it('Should render layout', () => {
        const component = shallow(
            <HealthBarComponent 
                p1Health={ 5 }
            />
        );

        expect(component.getElements()).toMatchSnapshot();
    });
});
