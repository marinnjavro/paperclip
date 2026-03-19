import Icon from '@/components/shared/Icon'

interface NewCardButtonProps {
  label: string
  openModal: () => void
}
const NewCardButton: React.FC<NewCardButtonProps> = ({ label, openModal }) => {
  return (
    <>
      <div className="flex w-full justify-center xs:m-0 xs:w-[20rem]">
        <div
          className="mb-14 w-[90%] cursor-pointer xs:w-[20rem]"
          onClick={() => openModal()}
        >
          <div className="aspect-ratio--wrapper--9-16">
            <div className="aspect-ratio--content h-full rounded-3xl border border-solid border-white border-opacity-10 p-4 transition-all duration-200 hover:bg-night-base-02">
              <div className="flex h-full flex-col items-center justify-center">
                <div className="rounded-2xl border border-solid border-white border-opacity-10 p-5 text-white">
                  <Icon type="add" />
                </div>
                <span className="mt-4 font-bold text-white">{label}</span>
              </div>
            </div>
            <div className="absolute -mt-[1px] flex w-full"></div>
          </div>
        </div>
      </div>
    </>
  )
}
export default NewCardButton
