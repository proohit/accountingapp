export const getUsernameValidationError = (username: string) => {
    if (!username) {
        return 'Missing username';
    }
    return '';
};

export const getPasswordValidationError = (password: string) => {
    if (!password) {
        return 'Missing password';
    }
    return '';
};

export const getEmailValidationError = (email: string) => {
    if (!email) {
        return 'Missing email';
    }
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
        return 'Invalid email';
    }

    return '';
};
