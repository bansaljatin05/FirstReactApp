import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Comments } from './Comments';
import { Leaders } from './Leaders';
import { Promotions } from './Promotions';
import { Dishes } from './Dishes';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const configureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            promotions: Promotions,
            leaders: Leaders,
            comments: Comments
        }),
        applyMiddleware(thunk, logger)
    );  

    return store;
}
