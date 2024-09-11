import { BOOKS_COPY, BOOKS_INFO, BOOKS_CATALOGO } from "../actions/booksInfoAction"

const initialState = {
    books:[],
    booksCatalogo : [],
    booksCopy:[]
}

export default function booksInfoReducer (state = initialState, action){
    switch(action.type){
        case BOOKS_INFO:
            return {
                ...state,
                books:action.payload,
            }
        case BOOKS_COPY:
            return {
                ...state,
                booksCopy:action.payload,
            }
        case BOOKS_CATALOGO:
            return {
                ...state,
                booksCatalogo:action.payload,
            }
        default:
            return state
    }
}