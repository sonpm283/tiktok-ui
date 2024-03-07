import * as yup from 'yup'

export const loginSchema = yup
  .object({
    username: yup
      .string()
      .required('Email is required')
      .email('Invalid email format')
      .min(5, 'Length must be between 5 and 160 characters')
      .max(160, 'Length must be between 5 and 160 characters'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Length must be between 6 and 160 characters')
      .max(160, 'Length must be between 6 and 160 characters'),
  })
  .required()

export const registerSchema = yup
  .object({
    username: yup
      .string()
      .required('Email is required')
      .email('Invalid email format')
      .min(5, 'Length must be between 5 and 160 characters')
      .max(160, 'Length must be between 5 and 160 characters'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Length must be between 6 and 160 characters')
      .max(160, 'Length must be between 6 and 160 characters'),
    confirm_password: yup
      .string()
      .required('Confirm password is required')
      .min(6, 'Length must be between 6 and 160 characters')
      .max(160, 'Length must be between 6 and 160 characters')
      .oneOf([yup.ref('password')], 'Password do not match'),
  })
  .required()
