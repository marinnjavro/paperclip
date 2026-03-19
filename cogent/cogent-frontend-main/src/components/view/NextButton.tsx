import Icon from '@/components/shared/Icon'

const NextButton = ({ handleOnClick }: { handleOnClick: () => void }) => (
  <button className="absolute right-5 top-8 z-50" onClick={handleOnClick}>
    <div className="flex items-center justify-center rounded-lg bg-support-gray-002 bg-opacity-40 py-1.5 pl-1 pr-2 shadow shadow-support-gray-006">
      <Icon className="h-6 w-6 text-white" type="chevronRight" />
    </div>
  </button>
)

export default NextButton
