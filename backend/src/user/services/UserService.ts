import { User } from '../../entity/User';
import { BadRequest, InvalidCredentials } from '../../shared/models/Errors';
import { repositories } from '../../shared/repositories/database';
import { sanitizePassword } from '../../shared/services/AuthenticationSanitizer';
import { getPasswordValidationError } from '../../shared/services/AuthenticationValidator';
import { services } from '../../shared/services/services';
export default class UserService {
    getByUsername(username: User['username']) {
        return repositories.users().findOne(username);
    }

    async changePasswordOfUser(
        username: User['username'],
        oldPassword: User['password'],
        newPassword: User['password'],
    ) {
        const user = await this.getByUsername(username);
        const sanitizedPassword = sanitizePassword(oldPassword);
        const passwordError = getPasswordValidationError(sanitizedPassword);
        if (passwordError) {
            throw new BadRequest(passwordError);
        }

        const privateKey = user.private_key;
        const dbPassword = user.password;

        const passwordDecryptedString = services.authenticationService.decodePassword(dbPassword, privateKey);

        if (sanitizedPassword !== passwordDecryptedString) {
            throw new InvalidCredentials();
        }
        const sanitizedNewPassword = sanitizePassword(newPassword);
        const newPasswordError = getPasswordValidationError(sanitizedNewPassword);
        if (newPasswordError) {
            throw new BadRequest(newPasswordError);
        }
        const { encryptedPassword: encryptedNewPassword } = services.authenticationService.encodePassword(
            sanitizedNewPassword,
            privateKey,
        );
        repositories.users().save({ ...user, password: encryptedNewPassword });
        return 'Successfully updated password';
    }

    async getAllUsers() {
        return repositories.users().find();
    }
}
