import BottomButton from './BottomButton'

interface BottomMenuProps {
  buttons: any[]
}

const BottomMenu: React.FC<BottomMenuProps> = ({ buttons }) => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-10 block flex w-full items-center justify-between border-t border-solid border-opacity-silver border-opacity-10 bg-white px-5 py-3.5 dark:bg-night-base-01 sm:hidden">
      {buttons.map((button, i) => (
        <BottomButton
          key={`bottom-button-${i}`}
          label={button.label}
          icon={button.icon}
          action={button.action}
        />
      ))}
    </div>
  )
}

export default BottomMenu
