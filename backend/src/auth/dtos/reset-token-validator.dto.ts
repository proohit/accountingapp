import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import dayjs from 'dayjs';
import { ResetToken } from '../reset-token.model';

@ValidatorConstraint({ name: 'token', async: false })
export class ResetTokenValidator implements ValidatorConstraintInterface {
  validate(token: string) {
    const resetToken = ResetToken.fromBase64(token);
    if (
      !resetToken ||
      !resetToken.validUntil ||
      !resetToken.id ||
      !dayjs(resetToken.validUntil).isValid() ||
      dayjs().isAfter(dayjs(resetToken.validUntil))
    ) {
      return false;
    }
    return true;
  }

  defaultMessage() {
    return 'Invalid token';
  }
}
