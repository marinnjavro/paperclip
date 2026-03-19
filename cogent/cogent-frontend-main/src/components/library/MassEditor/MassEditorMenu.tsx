import { Block, Card } from 'src/__generated__/graphql'

import Icon from '@/components/shared/Icon'

const MassEditorMenu = ({
  type,
  selected,
  batchAddToCog,
  deselect,
  closeMenu
}: {
  type: string
  selected: Block[] | Card[]
  batchAddToCog: () => void
  deselect: () => void
  closeMenu: () => void
}) => {
  return (
    <div className="flex justify-center">
      <div className="rounded-2xl border border-solid border-white border-opacity-10 bg-night-base-02 sm:bg-night-base-04 sm:py-1 sm:px-4">
        <div className="flex w-full justify-between border-b border-solid border-white border-opacity-10 p-3 sm:hidden">
          <div className="flex items-center gap-2.5 pr-10 text-xs font-bold text-white">
            <div className="h-6 w-6 rounded-full bg-opacity-violet p-1 text-center">
              {selected.length}
            </div>
            {type === 'block' && (
              <span>{selected.length > 1 ? 'Blocks' : 'Block'} selected</span>
            )}
            {type === 'card' && (
              <span>{selected.length > 1 ? 'Cards' : 'Card'} selected</span>
            )}
          </div>
          <div
            className="cursor-pointer rounded-full bg-white p-1 text-day-text-label-primary dark:bg-night-base-04 dark:text-white"
            onClick={() => closeMenu()}
          >
            <Icon type="remove" width={24} height={24} />
          </div>
        </div>

        <div className="flex">
          <div className="hidden items-center gap-2.5 border-r border-solid border-white border-opacity-10 pr-10 text-xs font-bold  text-white sm:flex">
            <div className="h-6 w-6 rounded-full bg-opacity-violet p-1 text-center">
              {selected.length}
            </div>
            {type === 'block' && (
              <span>{selected.length > 1 ? 'Blocks' : 'Block'} selected</span>
            )}
            {type === 'card' && (
              <span>{selected.length > 1 ? 'Cards' : 'Card'} selected</span>
            )}
          </div>

          <div className="border-r border-solid border-white border-opacity-10">
            <Button
              icon="arrowsMoveRight"
              label="Add to cog"
              handleOnClick={() => batchAddToCog()}
            />
          </div>

          <div>
            <Button icon="choose" label="Deselect" handleOnClick={deselect} />
          </div>

          {/* <Button icon="choose" label="Delete" /> */}
        </div>
      </div>
    </div>
  )
}

const Button = ({
  icon,
  label,
  handleOnClick
}: {
  icon: string
  label: string
  handleOnClick: () => void
}) => (
  <div
    className="flex cursor-pointer items-center gap-2 py-4 px-4 text-xxs text-night-text-label-secondary-02 sm:py-4 sm:px-[26px] sm:text-sm"
    onClick={() => handleOnClick()}
  >
    <Icon type={icon} classNames="shrink-0" />
    {label}
  </div>
)

export default MassEditorMenu
