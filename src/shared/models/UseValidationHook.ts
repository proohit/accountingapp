import { ValidationResult } from './ValidationResult';

export type UseValidationHook<R> = [
  ValidationResult<R, string>,
  (field: keyof R, value: unknown) => boolean,
  boolean,
  (object: R, fieldsToValidate: (keyof R)[]) => boolean,
  (errors: ValidationResult<R, string>) => void
];
