import _ from 'lodash'
// import { scrollToElement, isElementInViewport } from 'shared/utils/dom'
// import { fieldErrorsClassName } from 'shared/components/FieldErrors'

const defaultMessage = 'This field is required'

export const is = {
  match:
    (testFunc: (value: any) => boolean, message = defaultMessage) =>
    (value: string) =>
      !testFunc(value) && message,
  required:
    (message = defaultMessage) =>
    (value: string) =>
      !value && message,
  min:
    (min: number, message = `Must be at least ${min} characters`) =>
    (value: string) =>
      !!value && value.length < min && message,
  max:
    (max: number, message = `Must be at most ${max} characters`) =>
    (value: string) =>
      !!value && value.length > max && message,
  email:
    (message = 'Must be a valid email') =>
    (value: string) =>
      !!value && !/.+@.+/.test(value) && message
}

export const getErrors = (values: any, validations: any) => {
  const errors: any = {}
  _.each(validations, (validators, fieldName) => {
    _.each(_.flatten([validators]), (validator) => {
      const errorMessage = validator(values[fieldName])
      if (errorMessage) {
        errors[fieldName] = errorMessage
        return false
      } else {
        errors[fieldName] = ''
      }
    })
  })
  return errors
}

// export const scrollToFirstError = () => {
//   const $firstError = document.querySelector(`.${fieldErrorsClassName}`)
//   if ($firstError && !isElementInViewport($firstError, 100)) {
//     scrollToElement($firstError, -120)
//   }
// }
