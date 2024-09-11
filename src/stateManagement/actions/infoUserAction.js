export const INFO_USER = "INFO_USER"
export const LOG_OUT = "LOG_OUT"
export const INFO_TOKEN="INFO_TOKEN"
export const USER_PAID="USER_PAID"

export function infoUser(user){
    return {
        type: INFO_USER,
        payload: user
    }
}
export function infoToken(user){
    return {
        type: INFO_TOKEN,
        payload: user
    }
}
export function userLogOut(){
    return {
        type: LOG_OUT,
    }
}
// export function userPaid(user){
//     return{
//         type: USER_PAID,
//         payload:user
//     }
// }