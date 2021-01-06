import { ChangeEvent, useEffect, useState } from 'react';
import { useValidation } from '../../shared/hooks/useValidation';
import { UseValidationHook } from '../../shared/models/UseValidationHook';
import { ValidationResult } from '../../shared/models/ValidationResult';

type FormFields<R> = {
  [Key in keyof R]: any;
};

type UseFormHook<R> = [
  FormFields<R>,
  (event: ChangeEvent<unknown>) => void,
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

  const handleFieldChange = (event: ChangeEvent<any>) => {
    const name = event.target.name || event.currentTarget.name;
    const value = event.target.value || event.currentTarget.value;
    let newValue = value;
    if (options.fieldTransform) {
      newValue = options.fieldTransform(name, value);
    }
    const newFieldsState = { ...fieldsState };
    newFieldsState[name] = newValue;
    options?.validation?.validationFunction && validateField(name, newValue);
    setFieldsState(newFieldsState);
  };

  return [fieldsState, handleFieldChange, validation];
};
