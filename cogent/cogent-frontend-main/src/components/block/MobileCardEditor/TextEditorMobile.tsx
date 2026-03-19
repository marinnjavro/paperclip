import TextEditor from '@/components/shared/TextEditor'
import Error from '@/public/assets/icons/error.svg'

interface TextEditorMobileProps {
  value: string
  setValue: (value: string) => void
  placeholder: string
  error: string
}

const TextEditorMobile: React.FC<TextEditorMobileProps> = ({
  value,
  setValue,
  placeholder,
  error
}) => {
  return (
    <>
      <div
        className={`${
          !!error
            ? 'border-support-red-402'
            : 'border-day-base-06 focus:border-day-base-primary focus:ring-1 focus:ring-inset focus:ring-day-base-primary dark:border-white dark:border-opacity-10'
        } scrollbar--hidden mobile-text-editor peer relative h-full w-full rounded-[14px] border  border-solid bg-white pt-2 text-sm text-support-gray-006  outline-none placeholder:text-support-gray-001 dark:bg-night-base-04 dark:text-white`}
      >
        <TextEditor
          value={value}
          setValue={setValue}
          placeholder={placeholder}
        />
      </div>
      {!!error && (
        <div className="ml-0.5 mt-1 flex gap-x-1 text-xs text-support-red-402">
          <div className="pt-[1px]">
            <Error width={16} height={16} className="stroke-support-red-402" />
          </div>
          {error}
        </div>
      )}
    </>
  )
}

export default TextEditorMobile
