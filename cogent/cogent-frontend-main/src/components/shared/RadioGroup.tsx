import { useState } from 'react'
import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react'

function RadioGroup() {
  let [plan, setPlan] = useState('startup')

  return (
    <HeadlessRadioGroup value={plan} onChange={setPlan}>
      <HeadlessRadioGroup.Label className="text-base font-semibold text-black"></HeadlessRadioGroup.Label>
      <HeadlessRadioGroup.Option value="startup">
        {({ checked }) => (
          <div className="flex flex-row items-center">
            <input
              id="email"
              name="notification-method"
              type="radio"
              checked={checked}
              className="h-4 w-4 bg-night-base-04 hover:checked:bg-day-base-primary-hover focus:ring-0 focus:ring-offset-0 group-hover:bg-day-base-primary-hover"
            />
            <label
              htmlFor="email"
              className="ml-3 block text-sm font-medium leading-6 text-support-gray-001"
            >
              Variant 1
            </label>
          </div>
        )}
      </HeadlessRadioGroup.Option>
      <HeadlessRadioGroup.Option value="startup">
        {({ checked }) => (
          <div className="flex flex-row items-center">
            <input
              id="email"
              name="notification-method"
              type="radio"
              checked={checked}
              className="h-4 w-4 bg-night-base-04 hover:checked:bg-day-base-primary-hover focus:ring-0 focus:ring-offset-0 group-hover:bg-day-base-primary-hover"
            />
            <label
              htmlFor="email"
              className="ml-3 block text-sm font-medium leading-6 text-support-gray-001"
            >
              Variant 2
            </label>
          </div>
        )}
      </HeadlessRadioGroup.Option>
    </HeadlessRadioGroup>
  )
}

export default RadioGroup
