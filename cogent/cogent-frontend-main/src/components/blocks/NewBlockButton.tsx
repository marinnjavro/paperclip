import { KeyboardEvent, MouseEvent, useState } from 'react'

import Icon from '@/components/shared/Icon'
import ActionButton from '@/components/shared/ActionButton'

interface NewCardButtonProps {
  createNewBlock: (name?: string) => void
}

const NewCardButton: React.FC<NewCardButtonProps> = ({ createNewBlock }) => {
  const [isEditingName, setIsEditingName] = useState<boolean>(false)
  const [name, setName] = useState<string>('Block name')

  const handleEditOnClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setIsEditingName(true)
  }

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  // TODO fix type
  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      saveNameChanges(e)
    }
  }

  const saveNameChanges = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    if (!name) return
    setIsEditingName(false)
  }

  return (
    <>
      <div className="flex w-full items-center gap-1 px-1 pt-5 pb-3.5">
        {isEditingName ? (
          <>
            <div className="w-full border-b border-dashed border-opacity-silver border-opacity-70 dark:border-white dark:border-opacity-10">
              <input
                className="w-full border-none bg-transparent px-0 pb-1 text-lg font-bold text-night-base-01 placeholder:font-normal placeholder:italic focus:outline-none focus:outline-none focus:ring-0 dark:text-white"
                style={{ background: 'transparent' }}
                type="text"
                placeholder="Enter a new name"
                aria-label="Block Name"
                value={name}
                onChange={onNameChange}
                onClick={(e) => e.stopPropagation()}
                onKeyPress={(e) => handleKeyPress(e)}
              />
            </div>
            <div
              className="text-support-gray-02 mx-1 mt-2 pl-2 hover:text-day-base-primary dark:hover:text-night-base-secondary"
              onClick={(e) => saveNameChanges(e)}
            >
              <Icon height={14} width={14} type="checkMark" />
            </div>
          </>
        ) : (
          <>
            <span className="text-lg font-bold text-night-base-01 dark:text-white">
              {name}
            </span>
            <div
              className="text-support-gray-02 p-2 hover:text-day-base-primary dark:hover:text-night-base-secondary"
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                handleEditOnClick(e)
              }
            >
              <Icon height={15} width={15} type="edit" />
            </div>
          </>
        )}
      </div>
      <div className="flex h-full w-full items-start  xs:m-0">
        <div className="h-80 w-full cursor-pointer xs:w-[14rem]">
          <ActionButton
            icon="add"
            label="New Block"
            alignContent="vertical"
            handleOnClick={() => createNewBlock(name)}
          />
        </div>
      </div>
    </>
  )
}
export default NewCardButton
