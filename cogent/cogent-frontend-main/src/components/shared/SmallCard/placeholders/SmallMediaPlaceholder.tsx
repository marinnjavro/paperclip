const SmallMediaPlaceholder = ({
  label,
  size = 'small'
}: {
  label: string
  size?: 'small'
}) => (
  <div className="flex h-[136.5px] w-full cursor-pointer flex-col rounded-3xl">
    <div className="flex h-full w-full items-center justify-center">
      <div
        className={`${
          size == 'small' ? '' : ' gap-4'
        } flex flex-col items-center justify-center`}
      >
        <div
          className={`${
            size == 'small' ? 'p-5' : 'p-7'
          } rounded-3xl border border-solid border-opacity-silver border-opacity-20 dark:border-white dark:border-opacity-10`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${
              size == 'small' ? 'h-6 w-6' : 'h-7 w-7'
            } icon-tabler-upload text-day-text-label-primary dark:text-white`}
            viewBox="0 0 24 24"
            strokeWidth="1.7"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
            <path d="M7 9l5 -5l5 5"></path>
            <path d="M12 4l0 12"></path>
          </svg>
        </div>
        <p
          className={`${
            size == 'small' ? ' text-xs' : ''
          } pt-2 text-center font-semibold text-day-text-label-primary dark:text-white`}
        >
          {label}
        </p>
      </div>
    </div>
  </div>
)

export default SmallMediaPlaceholder
