import { createStore, applyMiddleware, combineReducers } from 'redux';
import workshopsListReducer from './reducers/workshopsList';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    workshopsList: workshopsListReducer
});

const store = createStore(
                rootReducer, 
                composeWithDevTools( applyMiddleware( thunk ) ) 
             );

export type RootState = ReturnType<typeof store.getState>

export default store;