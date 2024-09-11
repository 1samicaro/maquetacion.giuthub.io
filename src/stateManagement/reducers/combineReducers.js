import { combineReducers } from 'redux';

import changeLanguageReducer from './changeLanguageReducer'
import booksInfoReducer from './booksInfoReducer'
import stateReducers from './stateReducers'
import recommendedReducer from './recommendedReducer';
import infoUserReducer from './infoUserReducer';
import transactionsReducer from './transactionsReducer'

export default combineReducers({
    changeLanguageReducer,
    booksInfoReducer,
    stateReducers,
    recommendedReducer,
    infoUserReducer,
    transactionsReducer,
})