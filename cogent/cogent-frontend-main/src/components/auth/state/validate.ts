import _ from 'lodash'
import { is, getErrors } from '@/utils/validation'
import { UserData } from '@/components/auth/SignUp'

export const validateSignIn = (values: { email: string; password: string }) => {
  const errors = getErrors(values, {
    email: [is.required(), is.email()],
    password: [is.required()]
  })
  return { errors, isValid: _.isEmpty(errors) }
}

export const validateEmail = (values: UserData) => {
  const emailErrors = getErrors(values, {
    email: [is.required(), is.email()]
  })
  return emailErrors
}

export const validateSignUp = (values: UserData) => {
  const re = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,70}$/
  )

  const inputErrors: any = getErrors(values, {
    email: [is.required(), is.email()],
    firstName: [is.required()],
    lastName: [is.required()],
    password: [
      is.required(),
      is.min(8),
      is.match(
        (password) => re.test(password),
        'Password must include 1 uppercase, 1 digit and 1 special character'
      )
    ],
    passwordConfirmation: [
      is.required(),
      is.min(8),
      is.match(
        (passwordConfirmation) => passwordConfirmation === values.password,
        'Passwords must match'
      )
    ]
    // universityId: [is.required()]
  })
  return inputErrors
}
