/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';

import GameOverComponent from '../app/ui/component/GameOver/GameOverComponent';

describe('GameOver', () => {
    it('Should render', () => {
        // eslint-disable-next-line no-unused-vars
        const component = shallow(
            <GameOverComponent 
                score={ 0 }
            />
        );
    });

    it('Should render layout', () => {
        const component = shallow(
            <GameOverComponent 
                score={ 0 }
            />
        );

        expect(component.getElements()).toMatchSnapshot();
    });
});
