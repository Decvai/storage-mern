const SET_USER = 'SET_USER';
const RESET_USER = 'RESET_USER';

const defaultState = {
	currectUser: {},
	isAuth: false,
};

export default function userReducer(state = defaultState, action) {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				currectUser: action.payload,
				isAuth: true,
			};
		case RESET_USER:
			localStorage.removeItem('token');
			return {
				...state,
				...defaultState,
			};
		default:
			return state;
	}
}

export const setUser = user => ({ type: SET_USER, payload: user });
export const resetUser = () => ({ type: RESET_USER });
