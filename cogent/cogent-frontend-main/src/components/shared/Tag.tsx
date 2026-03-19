import Icon from '@/components/shared/Icon'
import { useRouter } from 'next/router'

type TagProps = {
  name: string
  remove?: boolean
  onClick?: () => void
}

const Tag = ({ name, remove = false, onClick }: TagProps): JSX.Element => {
  return (
    <div
      {...(!!onClick && {
        onClick: (e) => {
          e.stopPropagation()
          e.nativeEvent.preventDefault()
          onClick()
        }
      })}
      className={`${
        remove
          ? 'hover:border-support-red-401 hover:text-support-red-402'
          : 'hover:bg-day-base-04 dark:hover:bg-night-base-02'
      } group flex h-min shrink-0 cursor-pointer items-center gap-1 rounded-xl border border-solid border-day-text-label-secondary-inverse px-2.5 py-1.5 text-xs text-day-text-label-secondary-inverse dark:border-white dark:border-opacity-10 dark:text-white `}
    >
      <span className="text-left">{name}</span>
      {remove && (
        <div className="mt-[2px]">
          <Icon type="remove" width={16} height={16} />
        </div>
      )}
    </div>
  )
}

export default Tag
