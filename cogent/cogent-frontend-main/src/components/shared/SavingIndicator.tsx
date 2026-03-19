import Icon from '@/components/shared/Icon'

const SavingIndicator = ({ isSaving = false }: { isSaving?: boolean }) =>
  isSaving ? (
    <svg
      className="h-5 w-5 animate-spin text-day-text-label-primary dark:text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-40 dark:opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-60 dark:opacity-40"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  ) : (
    <Icon
      width={14}
      height={14}
      type="checkMark"
      classNames="mx-1 fill-day-text-label-primary dark:fill-white opacity-90"
    />
  )

export default SavingIndicator
