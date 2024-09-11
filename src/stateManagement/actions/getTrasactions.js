export const GET_TRANSACTIONS = "GET_TRANSACTIONS"
export const GET_PAYPAL = "GET_PAYPAL"
export const GET_PAYPAL_PREMIUM = "GET_PAYPAL_PREMIUM"

export function transactionsHistory(transactions){
    return {
        type: GET_TRANSACTIONS,
        payload: transactions
    }
}

export function getPayPalCompleted (payPalAnswer){
    return {
        type: GET_PAYPAL,
        payload: payPalAnswer
    }
}

export function getPayPalCompletedPremium (payPalAnswer){
    return {
        type: GET_PAYPAL_PREMIUM,
        payload: payPalAnswer
    }
}