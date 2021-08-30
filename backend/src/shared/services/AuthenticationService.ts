import crypto from 'crypto-js';
import AES from 'crypto-js/aes';

export class AuthenticationService {
    decodePassword = (encryptedPassword: string, privateKey: string) => {
        const passwordDecrypted = AES.decrypt(encryptedPassword, privateKey);
        const passwordDecryptedString = crypto.enc.Utf8.stringify(passwordDecrypted);
        return passwordDecryptedString;
    };

    encodePassword = (password: string, privateKey?: string) => {
        let private_key = privateKey || '';
        if (!private_key) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < 32; i++) {
                private_key += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
        }
        const hashedPassword = crypto.enc.Utf8.parse(password);
        const passwordEncrypted = AES.encrypt(hashedPassword, private_key).toString();
        return { encryptedPassword: passwordEncrypted, privateKey: private_key };
    };
}
