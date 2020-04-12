import Record from '../models/Record';
import RecordRequestBuilder from './RecordRequests';

const requestBuilder = new RecordRequestBuilder();

const checkStatus = (res: Response) => {
    if (res.status === 403) {
        throw new Error('Please retry logging in!')
    } else if (res.status >= 500) {
        throw new Error('Something went wrong. Please try again later')
    }
}

export const postRecord = async (token: string | null, item: Record): Promise<Record[]> => {
    try {
        const req = requestBuilder.postRequest(token, item);
        const res = await fetch(req.url, req.params);
        checkStatus(res)
        const result = await res.json();
        return result;
    } catch (e) {
        throw e;
    }
}

export const getAllRecordsByUser = async (token: string | null): Promise<Record[]> => {
    try {
        const req = requestBuilder.getRequest(token);
        const res = await fetch(req.url, req.params)
        checkStatus(res)
        const response = await res.json();
        return response
    } catch (e) {
        throw e
    }
}