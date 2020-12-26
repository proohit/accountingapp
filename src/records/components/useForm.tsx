import { ChangeEvent, useEffect, useState } from 'react';
import { useValidation } from '../../shared/hooks/useValidation';
import { UseValidationHook } from '../../shared/models/UseValidationHook';

interface FormFields {
  [name: string]: any;
}
type UseFormHook = [
  FormFields,
  (event: ChangeEvent<unknown>) => void,
  UseValidationHook<unknown>?
];

interface UseFormOptions {
  validation?: {
    validationFunction: (field: string, value: unknown) => string;
    initialValidation?: boolean;
  };
  fieldTransform?: (field: string, value: any) => any;
}

export const useForm = (
  fields: FormFields,
  options?: UseFormOptions
): UseFormHook => {
  const [fieldsState, setFieldsState] = useState(fields);
  const validation = useValidation(
    options?.validation?.validationFunction,
    fieldsState
  );
  const [, validateField, , validateObject, ,] = validation;
  const fieldKeys = Object.keys(fieldsState);

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
