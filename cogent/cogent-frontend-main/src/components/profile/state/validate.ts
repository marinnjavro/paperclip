import _ from 'lodash'
import { is, getErrors } from '@/utils/validation'

export const validateInputUser = (values: {
  name: string
  bio: string
  email: string
}) => {
  const errors = getErrors(values, {
    name: [is.required()],
    bio: [is.max(105)]
  })
  return { errors, isValid: _.values(errors).every(_.isEmpty) }
}
