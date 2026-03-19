import { Switch } from '@headlessui/react'

interface ToggleProps {
  enabled: boolean
  toggle: () => void
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Toggle: React.FC<ToggleProps> = ({ enabled, toggle }) => {
  return (
    <Switch
      autoFocus={false}
      checked={enabled}
      onChange={toggle}
      className={classNames(
        enabled ? 'bg-day-base-primary' : 'bg-day-base-06',
        'relative inline-flex h-4 w-7 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-1'
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={classNames(
          enabled ? 'translate-x-3' : 'translate-x-0',
          'pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
        )}
      />
    </Switch>
  )
}

export default Toggle
