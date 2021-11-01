import { combineReducers } from "redux";
import { HYDRATE } from 'next-redux-wrapper';

import summoner from './summoner';

const rootReducer = (state, action) => {
    switch(action.type) {
        case HYDRATE:
            return action.payload;
        default: {
            const combinedReducer = combineReducers( {
                summoner,
            });
            return combinedReducer(state, action)
        }
    }
}
export default rootReducer;