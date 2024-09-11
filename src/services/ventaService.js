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

export const moneyTransfer = async (infoSend, token) =>{
    try {
        api.setHeader('Authorization', `Bearer ${token}`)
        const sendInfo = await api.put(`/business/transfers/?username=${infoSend.username}&amountMoney=${infoSend.money}&amountPoints=${infoSend.points}&categoryId=${infoSend.categoryId}`);
        return sendInfo;
    } catch (error) {
        console.log("Something went wrong...");
        console.log(error);
        return [`${error}`];
    }
}
export const sendPoint = async (infoSend, token) =>{
    try {
        api.setHeader('Authorization', `Bearer ${token}`)
        const sendInfo = await api.put(`/business/transfers/send?username=${infoSend.username}&amount=${infoSend.points}`);
        return sendInfo;
    } catch (error) {
        console.log("Something went wrong...");
        console.log(error);
        return [`${error}`];
    }
}
export const getTransactions = async (token) =>{
    try {
        api.setHeader('Authorization', `Bearer ${token}`)
        const sendInfo = await api.get(`/business/transfers/transactions`);
        return sendInfo.data;
    } catch (error) {
        console.log("Something went wrong...");
        console.log(error);
        return [`${error}`];
    }
}

export const mercadoPagoBackBasic = async () =>{
    const sendInfo = await api.post(`/auth/users/paySuscriptionBasic`);
    return sendInfo
}
export const mercadoPagoBackPremium = async () =>{
    console.log("enviando back");
    const sendInfo = await api.post(`/auth/users/paySuscriptionPremium`);
    return sendInfo
}