/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import React from 'react';

import MainMenuSettingsComponent from '../app/ui/component/MainMenuSettings/MainMenuSettingsComponent';

describe('MainMenuSettings', () => {
    it('Should render', () => {
        // eslint-disable-next-line no-unused-vars
        const component = shallow(
            <MainMenuSettingsComponent 
                activeOption={ 'SETTINGS_OPTION' }
                setActiveOption={ jest.fn() }
                userSettings={ {
                    audio: {
                        noAudio: 0
                    }
                } }
            />
        );
    });

    it('Should render layout', () => {
        const component = shallow(
            <MainMenuSettingsComponent 
                activeOption={ 'SETTINGS_OPTION' }
                setActiveOption={ jest.fn() }
                userSettings={ {
                    audio: {
                        noAudio: 0
                    }
                }  }
            />
        );

        expect(component.getElements()).toMatchSnapshot();
    });
});
