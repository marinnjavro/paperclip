import Icon from '@/components/shared/Icon'
import Tag from '@/components/shared/Tag'
import { useRouter } from 'next/router'

interface AllTagsMenuProps {
  tags: any | undefined | null
  onEdit?: () => void
  closeMenu: () => void
}

const AllTagsMenu: React.FC<AllTagsMenuProps> = ({
  tags,
  onEdit,
  closeMenu
}) => {
  const router = useRouter()

  const handleTagClick = (name: string) => {
    const currentQuery = { ...router.query }
    currentQuery.query = name
    router.push({
      pathname: router.pathname,
      query: currentQuery
    })
  }

  return (
    <>
      <div
        className="fixed inset-0"
        onClick={(e) => {
          e.nativeEvent.preventDefault()
          e.stopPropagation()
          closeMenu()
        }}
      ></div>
      <div className="z-10  w-full rounded-2xl border border-solid border-white border-opacity-10 bg-white text-sm drop-shadow-md dark:bg-night-base-04">
        <div className="flex justify-between border-b border-solid border-night-base-02 border-opacity-10 px-3 py-2.5 font-bold text-night-base-02 dark:border-white dark:border-opacity-10 dark:text-white">
          <span>All tags</span>
          <div className="group cursor-pointer" onClick={(e) => closeMenu()}>
            <div
              className="absolute right-0 top-0 cursor-pointer rounded-full p-2.5 text-white dark:bg-night-base-04"
              onClick={(e) => closeMenu()}
            >
              <Icon
                type="remove"
                width={20}
                height={20}
                className=" rounded-[100%] border border-night-base-02 p-1 text-night-base-02 dark:border-white dark:text-white"
              />
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className=" min-h-[30px] w-full pb-2">
            <div className="flex w-full flex-wrap gap-2 text-center">
              {!!tags &&
                tags.map((tag: string, index: number) => (
                  <div key={`cog-${tags.id}-tag-${index}`}>
                    <Tag
                      key={`tag-${index}`}
                      name={tag}
                      onClick={() => handleTagClick(tag)}
                    />
                  </div>
                ))}
            </div>
          </div>
          {!!onEdit && (
            <div>
              <div
                className="flex cursor-pointer items-center gap-2 rounded-lg pt-2 text-day-text-label-secondary-inverse dark:text-white"
                onClick={() => {
                  closeMenu()
                  onEdit()
                }}
              >
                <Icon width={18} height={18} type="editWrite" />
                <span className="text-day-text-label-secondary-inverse dark:text-white">
                  Edit
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default AllTagsMenu
