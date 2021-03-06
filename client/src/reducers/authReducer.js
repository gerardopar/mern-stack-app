import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';

//initial state
const defaultState = {
    isAuthenticated: false,
    user: {}
};

//root reducer
export default (state = defaultState, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
        return {
            ...state,
            isAuthenticated: !isEmpty(action.payload),
            user: action.payload
        }

        default: 
            return state;
    }
}