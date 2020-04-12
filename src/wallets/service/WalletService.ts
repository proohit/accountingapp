import WalletRequestFactory from "./WalletRequests";
import { Wallet } from "../models/Wallet";


const requestFactory = new WalletRequestFactory();

export const getAllWallets = async (token: string | null): Promise<Wallet[]> => {
    try {
        const req = requestFactory.getRequest(token);
        const res = await fetch(req.url, req.params);
        const response = await res.json();
        return response;
    } catch (e) {
        throw e;
    }
}

export const postWallet = async (token: string | null, item: Wallet): Promise<Wallet[]> => {
    try {
        const req = requestFactory.postRequest(token, item);
        const res = await fetch(req.url, req.params)
        const response = await res.json();
        return response;
    } catch (e) {
        throw e
    }
}

export const deleteWallet = async (token: string | null, item: Wallet): Promise<string> => {
    try {
        const req = requestFactory.deleteRequest(token, item);
        const res = await fetch(req.url, req.params)
        const response = await res.json();
        return response
    } catch (error) {
        throw error;
    }
}

export const editWallet = async (token: string | null, oldWallet: Wallet, newWallet: Wallet): Promise<Wallet[]> => {
    try {
        const req = requestFactory.putRequest(token, oldWallet, newWallet);
        const res = await fetch(req.url, req.params)
        const response = await res.json();
        if (!response.success) throw new Error(response.message)
        return response;
    } catch (error) {
        throw error
    }
}