import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import dayjs from 'dayjs';

@ValidatorConstraint({ name: 'date', async: false })
export class DateValidator implements ValidatorConstraintInterface {
  validate(date: string) {
    return dayjs(date).isValid();
  }

  defaultMessage() {
    // here you can provide default error message if validation failed
    return 'Date ($value) is not a valid date';
  }
}
