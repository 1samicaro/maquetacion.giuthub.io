import { create } from "apisauce";
import environment from "../environments/environment"

const api = create({
    baseURL: environment.baseUserUrl,
    headers: {
        Accept: "/",
        Version:"0.0.1",
        // "Content-Type": "application/json",
    },
    timeout: 15000
});

export const editProfile = async (infoSend, token) =>{
    try {
        api.setHeader('Authorization', `Bearer ${token}`)
        const sendInfo = await api.patch(`/auth/users`, infoSend);
        return sendInfo;
    } catch (error) {
        console.log("Something went wrong...");
        console.log(error);
        return [`${error}`];
    }
}

export const payProfile = async (infoSend, token) =>{
    try {
        api.setHeader('Authorization', `Bearer ${token}`)
        const sendInfo = await api.patch(`/auth/users/sendPay`, infoSend);
        return sendInfo;
    } catch (error) {
        console.log("Something went wrong...");
        console.log(error);
        return [`${error}`];
    }

}