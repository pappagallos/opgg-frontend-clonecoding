import { combineReducers } from "redux";
import { HYDRATE } from 'next-redux-wrapper';

import cart from './cart';

const rootReducer = (state, action) => {
    switch(action.type) {
        case HYDRATE:
            return action.payload;
        default: {
            const combinedReducer = combineReducers( {
                cart,
            });
            return combinedReducer(state, action)
        }
    }
}
export default rootReducer;