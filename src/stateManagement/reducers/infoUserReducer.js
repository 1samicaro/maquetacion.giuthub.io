import { INFO_USER, INFO_TOKEN, LOG_OUT, USER_PAID } from "../actions/infoUserAction"

const initialState = {
    user:"",
    // userPaid:"",
    token:"",
    userUpdate:{},
    loading:false
}

export default function infoUserReducer (state = initialState, action){
    
    switch(action.type){
        case INFO_USER:
            return {
                ...state,
                user:action.payload,
                loading:false
            }
        case INFO_TOKEN:
            return {
                ...state,
                token:action.payload,
                loading:false
            }
        // case USER_PAID:
        //     return{
        //         ...state,
        //         userPaid:action.payload,
        //         loading:false
        //     }
        case LOG_OUT:
            return {
                ...state,
                user:"",
                token:"",
                loading:false
            }
        default:
            return state
    }
}