import Icon from '@/components/shared/Icon'

const ActionOptionPlaceholder = () => (
  <div className="flex items-center">
    <label>
      <Icon height={40} width={40} type="actionCheckMark" />
      <input type="checkbox" className="hidden" />
    </label>
    <div className="ml-4 w-full">
      <textarea
        rows={1}
        className="scrollbar--hidden m-0	w-full resize-none resize-none overflow-y-hidden border-none bg-transparent p-0 text-sm leading-relaxed placeholder:italic placeholder:text-support-gray-002 placeholder:opacity-50 focus:outline-none focus:ring-0"
        placeholder="Enter answer ..."
        aria-label="Action Card Answer Input"
      />
    </div>
  </div>
)

export default ActionOptionPlaceholder
