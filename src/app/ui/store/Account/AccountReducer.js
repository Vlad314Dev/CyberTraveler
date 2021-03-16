import {
    LOGIN
} from './AccountAction';

export const logIn = (action, state) => {
    const { data: { nickname, token } } = action;
    const isLoggedIn = nickname !== '' && token !== '';

    localStorage.setItem('nickname', nickname);
    localStorage.setItem('token', token);

    return {
        ...state,
        isLoggedIn,
        nickname
    }
};

const isLoggedIn = () => {
    const nickname = localStorage.getItem('nickname');
    const token = localStorage.getItem('token');

    return nickname !== '' && token !== '';
}

export const AccountReducer = (
    state = {
        isLoggedIn: isLoggedIn(),
        nickname: localStorage.getItem('nickname')
    },
    action
 ) => {
    const { type } = action;

    switch (type) {
        case LOGIN:
            return logIn(action, state);
        default:
            return state;
    }
};

export default AccountReducer;
