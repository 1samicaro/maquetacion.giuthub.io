import { CHANGE_lANGUAGE } from "../actions/changeLanguageAction"

const initialState = {
    id:1
}

export default function changeLanguageReducer (state = initialState, action){
    switch(action.type){
        case CHANGE_lANGUAGE:
            return {
                id:action.payload,
            }
        default:
            return state
    }
}