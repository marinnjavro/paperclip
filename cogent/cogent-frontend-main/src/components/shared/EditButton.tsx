import Icon from '@/components/shared/Icon'

const EditButton = () => (
  <div className="justify-center text-white">
    <div className="flex cursor-pointer items-center rounded-[12px] bg-day-base-primary py-1.5 px-3 text-white shadow-sm hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:brightness-90">
      <span className="mr-2 text-sm font-semibold text-white">Edit</span>
      <Icon height={14} width={14} type="edit" />
    </div>
  </div>
)

export default EditButton
