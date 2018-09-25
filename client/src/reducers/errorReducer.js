import { GET_ERRORS } from '../actions/types';

//initial state
const defaultState = {};

//root reducer
export default (state = defaultState, action) => {
    switch(action.type) {
        case GET_ERRORS: 
            return action.payload;

        default: 
            return state;
    }
}