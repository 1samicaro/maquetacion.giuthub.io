export const RECOMMENDED = "RECOMMENDED"

export function recomendedAction (recommended){
    return {
        type: RECOMMENDED,
        payload: recommended
    }
}