import { create } from "apisauce";
import environment from "../environments/environment"

const api = create({
    baseURL: environment.baseUserUrl    ,
    headers: {
        Accept: "/",
        Version:"0.0.1",
        "Content-Type": "application/json",
    },
    timeout: 15000
});


export const postLogin = async (login) => {
    // const user = {
    //     email: email,
    //     password: password,
    // }
    try {
        const userLogin = await api.post(`/auth/authentication/login`, login);
        return userLogin.data;
    } catch (error) {
        console.log("Something went wrong...");
        console.log(error);
        return [`${error}`];
    }
}
export const recoverPass = async (prueba) => {
    try {
        const userLogin = await api.get(`/auth/users/reset/${prueba}`);
        return userLogin.data;
    } catch (error) {
        console.log("Something went wrong...");
        console.log(error);
        return [`${error}`];
    }
}
export const deleteUser = async (token) => {
    try {
        api.setHeader('Authorization', `Bearer ${token}`)
        const sendInfo = await api.delete(`/auth/users`);
        return sendInfo;
    } catch (error) {
        console.log("Something went wrong...");
        console.log(error);
        return [`${error}`];
    }
}
export const infoLoad = async (token, id) => {
    try {
        api.setHeader('Authorization', `Bearer ${token}`)
        const sendInfo = await api.get(`/auth/users/${id}`);
        return sendInfo.data;
    } catch (error) {
        console.log("Something went wrong...");
        console.log(error);
        return [`${error}`];
    }
}