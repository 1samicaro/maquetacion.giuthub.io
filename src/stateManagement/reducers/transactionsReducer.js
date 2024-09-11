import { GET_TRANSACTIONS, GET_PAYPAL, GET_PAYPAL_PREMIUM } from "../actions/getTrasactions";

const initialState = {
    history:{},
    payPalAnswer: false,
    payPalAnswerPremium: false,
    loading:false
}

export default function transactionsReducer (state = initialState, action){
    switch(action.type){
        case GET_TRANSACTIONS:
            return {
                ...state,
                history:action.payload,
                loading:false
            }
        case GET_PAYPAL:
            return{
                ...state,
                payPalAnswer: action.payload,
                loading:false

            }
        case GET_PAYPAL_PREMIUM:
            return{
                ...state,
                payPalAnswerPremium: action.payload,
                loading:false

            }
        default:
            return state
    }
}