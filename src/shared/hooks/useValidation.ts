import { useState } from 'react';
import { UseValidationHook } from '../models/UseValidationHook';
import { ValidationResult } from '../models/ValidationResult';

export const useValidation = <R>(
  validationFunction: (field: keyof R, value: unknown) => string,
  initialFormError?: ValidationResult<R, string>
): UseValidationHook<R> => {
  const [formErrors, setFormErrors] = useState<ValidationResult<R, string>>(
    initialFormError
  );
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  const validateField = (field: keyof R, value: unknown) => {
    const validationResult = validationFunction(field, value);
    const newFormErrors = { ...formErrors, [field]: validationResult };

    if (formErrors && newFormErrors[field] === formErrors[field]) {
      return isFormValid;
    }

    setFormErrors(newFormErrors);

    for (const validation in newFormErrors) {
      if (newFormErrors[validation] !== '') {
        setIsFormValid(false);
        return false;
      }
    }

    setIsFormValid(true);
    return true;
  };

  const validateObject = (object: R, fieldsToValidate: (keyof R)[]) => {
    const newFormErrors = { ...formErrors };
    fieldsToValidate.forEach((property) => {
      const field = property;
      const value = object[property];
      const validationResult = validationFunction(field, value);
      newFormErrors[field] = validationResult;
    });

    setFormErrors(newFormErrors);
    for (const validation in newFormErrors) {
      if (newFormErrors[validation] !== '') {
        setIsFormValid(false);
        return false;
      }
    }

    setIsFormValid(true);
    return true;
  };

  return [
    formErrors,
    validateField,
    isFormValid,
    validateObject,
    setFormErrors,
  ];
};
