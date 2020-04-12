import React from "react";
export interface AuthenticationContextValue {
    token: string;
    setToken(token: string|null): void;
}
const AuthenticationContext = React.createContext<AuthenticationContextValue | undefined>(undefined)
export default AuthenticationContext