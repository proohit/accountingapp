import config from "../../shared/config"

interface AuthenticationRequest {
    url: string;
    params: RequestInit;
}

export default class AuthenticationRequestFactory {

    loginRequest = (username: string, password: string): AuthenticationRequest => {
        return {
            url: config.api + "/login",
            params: {
                headers: { "Content-Type": 'application/json' },
                method: 'POST',
                body: JSON.stringify({ username: username, password: password })
            }
        }
    }

    registerRequest = (username: string, password: string): AuthenticationRequest => {
        return {
            url: config.api + "/register",
            params: {
                headers: { "Content-Type": 'application/json' },
                method: 'POST',
                body: JSON.stringify({ username: username, password: password })
            }
        }
    }
}
