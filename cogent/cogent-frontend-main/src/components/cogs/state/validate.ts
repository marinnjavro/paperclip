import _ from 'lodash'
import { is, getErrors } from '@/utils/validation'
import { CogData } from '@/components/shared/CogEditor'

export const validateCogData = (values: CogData) => {
  const errors: any = getErrors(values, {
    name: [is.required(), is.max(30)],
    description: [is.required(), is.max(180)],
    tags: [is.max(8, 'You can add a maximum of 8 tags')]
  })
  return { errors, isValid: _.values(errors).every(_.isEmpty) }
}
