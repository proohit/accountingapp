import Record from "../models/Record"
import config from "../../shared/config"

interface RecordRequest {
    url: string;
    params: RequestInit;
}

export default class RecordRequestBuilder {

    getRequest = (token: string | null): RecordRequest => {
        return {
            url: config.api + "/records",
            params: {
                headers: { "Authorization": token ? token : '', "Content-Type": "application/json" },
                method: 'GET',
            }
        }
    }
    postRequest = (token: string | null, record: Record): RecordRequest => {
        return {
            url: config.api + "/records",
            params: {
                headers: { "Authorization": token ? token : '', "Content-Type": "application/json" },
                method: 'POST',
                body: JSON.stringify(record)
            }
        }
    }
    putRequest = (token: string | null, record: Record): RecordRequest => {
        return {
            url: config.api + "/records",
            params: {
                headers: { "Authorization": token ? token : '', "Content-Type": "application/json" },
                method: 'PUT',
                body: JSON.stringify(record)
            }
        }
    }
    deleteRequest = (token: string | null, id: number): RecordRequest => {
        return {
            url: config.api + "/records/" + id,
            params: {
                headers: { "Authorization": token ? token : '', "Content-Type": "application/json" },
                method: 'DELETE',
            }
        }
    }
}

/* = (token: string | undefined) => {
    const getParams: RequestInit = {
        headers: { "Authorization": token ? token : '', "Content-Type": "application/json" },
        method: 'GET',
    }
} */