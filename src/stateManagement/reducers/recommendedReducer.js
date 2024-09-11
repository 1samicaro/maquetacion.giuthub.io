import { RECOMMENDED } from "../actions/recommendedAction"

const initialState = {
    recommended:[]
}

export default function recommendedReducer (state = initialState, action){
    switch(action.type){
        case RECOMMENDED:
            return {
                ...state,
                recommended:action.payload,
            }
        default:
            return state
    }
}