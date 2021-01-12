import { ChangeEvent, useEffect, useState } from 'react';
import { useValidation } from './useValidation';
import { UseValidationHook } from '../models/UseValidationHook';
import { ValidationResult } from '../models/ValidationResult';

type FormFields<R> = {
  [Key in keyof R]: any;
};

type UseFormHook<R> = [
  FormFields<R>,
  (
    event?: ChangeEvent<HTMLInputElement>,
    field?: keyof R,
    value?: R[keyof R]
  ) => void,
  UseValidationHook<R>?
];

interface UseFormOptions<R> {
  validation?: {
    validationFunction: (field: keyof R, value: unknown) => string;
    initialValidation?: boolean;
  };
  fieldTransform?: (field: string, value: any) => any;
}

export const useForm = <R = {}>(
  fields: FormFields<R>,
  options?: UseFormOptions<R>
): UseFormHook<R> => {
  const [fieldsState, setFieldsState] = useState(fields);
  const validation = useValidation(
    options?.validation?.validationFunction,
    fieldsState as ValidationResult<R>
  );
  const [, validateField, , validateObject, ,] = validation;
  const fieldKeys = Object.keys(fieldsState).map((field) => field as keyof R);

  useEffect(() => {
    if (options?.validation?.initialValidation) {
      validateObject({ ...fieldsState }, fieldKeys);
    }
  }, []);

  const handleFieldChange = (
    event?: ChangeEvent<any>,
    field?: keyof R,
    value?: R[keyof R]
  ) => {
    const name = event?.target?.name || event?.currentTarget?.name || field;
    const currentValue =
      event?.target?.value || event?.currentTarget?.value || value;
    let newValue = currentValue;
    if (options.fieldTransform) {
      newValue = options.fieldTransform(name, currentValue);
    }
    const newFieldsState = { ...fieldsState };
    newFieldsState[name] = newValue;
    options?.validation?.validationFunction &&
      validateField(name as keyof R, newValue);
    setFieldsState(newFieldsState);
  };

  return [fieldsState, handleFieldChange, validation];
};
