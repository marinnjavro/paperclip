import UserIconPlaceholder from '@/components/shared/UserIconPlaceholder'

interface OpeningCardProps {
  blockName?: string
  photoUrl?: string
  author: string | undefined | null
  organization?: string
  small?: boolean
}

const OpeningCard: React.FC<OpeningCardProps> = ({
  blockName = '',
  author = '',
  photoUrl = '',
  organization = '',
  small = false
}) => (
  <div
    className={`${
      small ? 'overflow-y-hidden' : 'overflow-hidden overflow-y-auto'
    } scrollbar--sm flex h-full w-full bg-[url('/assets/static/elements/gradient-background-light.png')] bg-cover bg-center bg-no-repeat pt-[10%] dark:bg-[url('/assets/static/elements/gradient-background.png')]`}
  >
    <div className="flex max-h-[80vh] w-full flex-col items-center justify-center justify-between gap-[10%] overflow-hidden px-4 text-day-text-label-primary dark:text-white">
      <div
        className={`${
          small ? 'mb-[10%]' : 'mb-10'
        } flex h-full w-full items-end break-words text-center`}
      >
        <h2
          className={`${
            small ? 'text-lg line-clamp-4' : 'text-3xl'
          } leading-2 w-full font-bold`}
        >
          {blockName}
        </h2>
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <div
          className={`${
            small ? 'h-12 w-12 sm:h-16 sm:w-16' : 'h-24 w-24 '
          } shrink-0 overflow-hidden rounded-full border border-solid border-white border-opacity-10 bg-day-base-05 dark:bg-day-text-label-tertirary-inverse`}
        >
          {!!photoUrl ? (
            <img
              src={photoUrl}
              alt="User Image"
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              className="h-full h-full object-cover"
              src="/assets/static/images/avatar-placeholder.png"
              alt=""
            />
          )}
        </div>
        <div
          className={`${
            small ? 'px-2' : 'px-5 '
          } mt-[5%] flex w-full flex-col text-center`}
        >
          <span
            className={`${
              small ? 'w-full text-sm line-clamp-2 sm:text-base' : 'text-lg'
            } font-bold`}
          >
            {!!author ? author : '-'}
          </span>
          <span
            className={`${
              small ? 'truncate text-xs' : 'text-base'
            } mt-[2%] font-light dark:text-white`}
          >
            {organization}
          </span>
        </div>
      </div>
    </div>
  </div>
)

export default OpeningCard
