export const CHANGE_lANGUAGE = "CHANGE_lANGUAGE"

export function changeLanguageAction (language){
    return {
        type: CHANGE_lANGUAGE,
        payload: language
    }
}