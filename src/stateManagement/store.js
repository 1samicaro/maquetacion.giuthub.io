import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import rootReducers from './reducers/combineReducers';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(
    rootReducers, composeWithDevTools(applyMiddleware(thunk)), 
)
export const persistor = persistStore(store);