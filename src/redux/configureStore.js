import { createStore } from 'redux';
import { Reducer, initialState } from './Reducer';

export const configureStore = () => {
    const store = createStore(
        Reducer, 
        initialState
    );  

    return store;
}
