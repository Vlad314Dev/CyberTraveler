import { 
    SET_ACTIVE_OPTION
} from './MainMenuAction';
import { DEFAULT_OPTION } from './MainMenuConfig';

export const setActiveOption = (action, state) => {
    const { optionName } = action;

    return {
        ...state,
        activeOption: optionName
    }
};

export const MainMenuReducer = (
    state = {
        activeOption: DEFAULT_OPTION
    },
    action
 ) => {
    const { type } = action;

    switch (type) {
        case SET_ACTIVE_OPTION:
            return setActiveOption(action, state);
        default:
            return state;
    }
};

export default MainMenuReducer;
