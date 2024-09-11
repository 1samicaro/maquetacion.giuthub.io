import { BOOKS_GENRES, BOOKS_COUNTRIES, BOOKS_AUTHORS } from "../actions/stateActions";

const initialState = {
    genres:[],
    countries:[],
    authors:[]
}

export default function booksStateReducers (state = initialState, action){
    switch(action.type){
        case BOOKS_GENRES:
            return {
                ...state,
                genres:action.payload,
            }
        case BOOKS_COUNTRIES:
            return {
                ...state,
                countries:action.payload,
            }
        case BOOKS_AUTHORS:
            return {
                ...state,
                authors:action.payload,
            }
        default:
            return state
    }
}