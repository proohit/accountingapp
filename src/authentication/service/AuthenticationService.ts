import AuthenticationRequestFactory from "./AuthenticationRequests";


const authenticationFactory = new AuthenticationRequestFactory();

export const login = async (username: string, password: string): Promise<string> => {
    try {
        const req = authenticationFactory.loginRequest(username, password);
        const res = await fetch(req.url, req.params);
        const response = await res.json();
        if (res.status === 403 || res.status === 400) {
            throw new Error(response.message)
        }
        return response.token;
    } catch (error) {
        throw error;
    }
}

export const register = async (username: string, password: string): Promise<void> => {
    try {
        const req = authenticationFactory.registerRequest(username, password);
        const res = await fetch(req.url, req.params);
        await res.json();
    } catch (error) {
        throw error;
    }
}