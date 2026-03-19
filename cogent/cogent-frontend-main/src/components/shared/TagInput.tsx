import React, {
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  useState
} from 'react'
import { capitalizeFirstLetter } from '@/utils/functions'
import Icon from '@/components/shared/Icon'
import Tag from '@/components/shared/Tag'
import _ from 'lodash'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  title?: string
  label: string
  value: string
  max?: number
  tags: string[]
  addTag: (value: string) => void
  removeTag: (value: string) => void
  setTagErrors: (message: string) => void
  error?: string
  ref: string
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    name,
    title = '',
    label,
    value,
    max,
    tags,
    addTag,
    removeTag,
    setTagErrors,
    error = '',
    ...props
  },
  ref
) => {
  const [tag, setTag] = useState<string>('')

  const clearInput = () => {
    setTag('')
  }

  const clearErrors = () => {
    setTagErrors('')
  }

  const handleDelete = (value: string) => {
    removeTag(value)
  }

  const handleClearInput = () => {
    clearInput()
    clearErrors()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setTag(value)
    clearErrors()
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!tag) return
    const newTag = capitalizeFirstLetter(tag).trim()

    if (e.key === 'Enter') {
      if (!!max && tags.length >= max) {
        return setTagErrors(`You can add a maximum of ${max} tags`)
      }
      if (tags.includes(newTag)) {
        return setTagErrors(`Tag '${newTag}' was already added`)
      }

      addTag(newTag)
      clearInput()
    }
  }

  return (
    <div>
      <div className="flex w-full items-center justify-between pb-2 text-left">
        <h2 className="text-base font-bold text-day-text-label-primary dark:text-white">
          {title}
        </h2>
        {!!max && (
          <span className="pt-1 text-xs text-day-text-label-secondary-inverse dark:text-night-text-label-secondary-02">
            Up to {max} tags
          </span>
        )}
      </div>
      <div className="text-input group relative w-full">
        <input
          name={name}
          type="text"
          value={tag}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleEnter(e)}
          {...props}
          id={name}
          ref={ref}
          required
          autoComplete="do-not-autofill"
          className={`${
            !!error
              ? 'border-support-red-402'
              : 'border-opacity-silver border-opacity-20 dark:border-white dark:border-opacity-10'
          } peer relative w-full rounded-[14px] border bg-white px-3 pt-6 pb-2 pr-9 text-sm text-support-gray-006 outline-none focus:ring-1 focus:ring-inset focus:ring-day-base-primary dark:bg-night-base-04 dark:text-white `}
        />
        <label
          htmlFor={name}
          className="absolute top-0 left-0 mx-3 flex h-full transform items-center text-sm text-day-text-label-secondary-inverse transition-all group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-xs peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-xs dark:text-support-gray-006 dark:text-support-gray-001"
        >
          {label}
        </label>
        {!!tag && (
          <div
            className="absolute inset-y-0 right-0 flex cursor-pointer items-center justify-center py-5 px-3 text-white opacity-60 hover:text-support-red-402"
            onClick={() => handleClearInput()}
          >
            <Icon type="remove" width={18} height={18} />
          </div>
        )}
      </div>
      {!!error && (
        <div className="ml-0.5 mt-1 flex gap-x-1 text-xs text-support-red-402">
          <div className="pt-[1px]">
            <Icon type="error" width={16} height={16} />
          </div>
          {error}
        </div>
      )}
      <div className="flex flex-wrap gap-x-2">
        {!!tags &&
          tags?.map((tag, i) => (
            <div
              key={`cog-tag-${i}`}
              className="mt-2 cursor-pointer"
              onClick={() => handleDelete(tag)}
            >
              <Tag name={tag} remove />
            </div>
          ))}
      </div>
    </div>
  )
}

const TagInput = React.forwardRef(Input)

export default TagInput
