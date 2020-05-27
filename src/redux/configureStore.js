import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Comments } from './Comments';
import { Leaders } from './Leaders';
import { Promotions } from './Promotions';
import { Dishes } from './Dishes';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms'; 

export const configureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            promotions: Promotions,
            leaders: Leaders,
            comments: Comments,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );  

    return store;
}
