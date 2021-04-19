/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';

import ScoreComponent from '../app/ui/component/Score/ScoreComponent';

describe('MainMenuTitle', () => {
    it('Should render', () => {
        // eslint-disable-next-line no-unused-vars
        const component = shallow(
            <ScoreComponent 
                score={ 0 }
            />
        );
    });

    it('Should render layout', () => {
        const component = shallow(
            <ScoreComponent 
                score={ 0 }
            />
        );

        expect(component.getElements()).toMatchSnapshot();
    });
});
