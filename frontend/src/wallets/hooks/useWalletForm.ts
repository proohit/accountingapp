import { FormikConfig, useFormik } from 'formik';
import * as yup from 'yup';

export type WalletFormValues = {
  name: string;
  balance: string;
};

export const useWalletForm = (
  formProps: Omit<FormikConfig<WalletFormValues>, 'initialValues'>,
  wallet?: WalletFormValues
) => {
  return useFormik({
    ...formProps,
    initialValues: {
      name: wallet?.name || '',
      balance: wallet?.balance || '0.00',
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      balance: yup
        .number()
        .typeError('Balance must be a number')
        .required('Balance is required'),
    }),
  });
};
