import { create } from "apisauce";
import environment from "../environments/environment"

const api = create({
    baseURL: environment.baseApiUrl,
    headers: {
        // "Cache-Control": "no-cache",
        Accept: "/",
        Version:"0.0.1"
        // "Content-Type": "application/json",
        // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaHIzNDVAaG90bWFpbC5jb20iLCJqdGkiOiIwODNiNzdjMi1kYzBiLTQ5YTgtYWRjMC1jODU0MmU4Yjg5ZTYiLCJlbWFpbCI6ImRocjM0NUBob3RtYWlsLmNvbSIsInVpZCI6ImEzZTkyYmRkLWFiNmMtNGU1Yy05NmM3LTEyZDAzYzYzNzIzMSIsInJvbGVzIjoiQ2xpZW50ZSIsImV4cCI6MTYzODU1MDE4MSwiaXNzIjoiU2VjdXJlQXBpIiwiYXVkIjoiU2VjdXJlQXBpVXNlciJ9.TiBWPy4OvkAO-I-jbaVNyiL1WMUlIXunpn5KN2jVDpw',
        // credentials: 'same-origin'
    },
    timeout: 15000
});

export const getBooks = async(id) =>{
    try {
        const books = await api.get(`/resources/books?languageId=${id}`)
        return books.data
    } catch (error) {
        console.log("Algo malo ocurrio");
        console.log(error);
        return [`${error}`]
    }
}