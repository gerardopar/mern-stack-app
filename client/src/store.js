import { createStore, applyMiddleware, compose } from 'redux'; 
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const defaultState = {};
const middleware = [thunk]; //middleware declared here

//redux store creator
const store = createStore(
    rootReducer,
    defaultState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    )
    
);

export default store;