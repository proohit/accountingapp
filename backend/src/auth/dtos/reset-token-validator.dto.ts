import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Token } from '../token.model';

@ValidatorConstraint({ name: 'token', async: false })
export class ResetTokenValidator implements ValidatorConstraintInterface {
  validate(token: string) {
    const resetToken = Token.fromBase64(token);
    if (!resetToken || !resetToken.isValid()) {
      return false;
    }
    return true;
  }

  defaultMessage() {
    return 'Invalid token';
  }
}
