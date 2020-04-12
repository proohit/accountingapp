import { Wallet } from './../models/Wallet';
import config from '../../shared/config';
interface WalletRequest {
    /** The URL of the full request. Pulls the first part from src/shared/config api property and adds corresponding ending e.g. /records for records */
    url: string;
    /** Fetch params that you would put into the fetch function. POST and PUT expect a body which get stringified into JSON */
    params: RequestInit
}

export default class WalletRequestFactory {

    postRequest = (token: string | null, wallet: Wallet): WalletRequest => {
        return {
            url: config.api + "/wallets",
            params: {
                headers: { "Authorization": token ? token : '', "Content-Type": "application/json" },
                method: 'POST',
                body: JSON.stringify(wallet)
            }
        }
    }

    getRequest = (token: string | null): WalletRequest => {
        return {
            url: config.api + "/wallets",
            params: {
                headers: { "Authorization": token ? token : '', "Content-Type": "application/json" },
                method: 'GET',
            }
        }
    }

    putRequest = (token: string | null, oldWallet: Wallet, newWallet: Wallet): WalletRequest => {
        return {
            url: config.api + "/wallets/" + oldWallet.name,
            params: {
                headers: { "Authorization": token ? token : '', "Content-Type": "application/json" },
                method: 'PUT',
                body: JSON.stringify(newWallet)
            }
        }
    }

    deleteRequest = (token: string | null, wallet: Wallet): WalletRequest => {
        return {
            url: config.api + "/wallets/" + wallet.name,
            params: {
                headers: { "Authorization": token ? token : '', "Content-Type": "application/json" },
                method: 'DELETE',
            }
        }
    }
}