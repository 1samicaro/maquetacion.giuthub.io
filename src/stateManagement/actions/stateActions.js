export const BOOKS_GENRES = "BOOKS_GENRES"
export const BOOKS_COUNTRIES = "BOOKS_COUNTRIES"
export const BOOKS_AUTHORS = "BOOKS_AUTHORS"

export function booksGenres (books){
    return {
        type: BOOKS_GENRES,
        payload: books
    }
}

export function booksCountries(books){
    return {
        type: BOOKS_COUNTRIES,
        payload: books
    }
}

export function booksAuthors(books){
    return {
        type: BOOKS_AUTHORS,
        payload: books
    }
}