import Link from 'next/link'
import ChevronLeft from '@/assets/icons/chevron-left.svg'

interface HeaderProps {
  title: string
  text?: JSX.Element
  backTo?: string
}

const AuthHeader = ({ title, text, backTo }: HeaderProps) => (
  <div className="flex flex-col text-center">
    <div className="">
      {!!backTo && (
        <Link href={`/${backTo}`} legacyBehavior>
          <div className="float-left flex mt-3 mr-3 cursor-pointer">
            <ChevronLeft width={20} height={20} />
          </div>
        </Link>
      )}
      <h2 className="text-3xl font-bold leading-10 tracking-tight text-day-text-label-primary dark:text-white">
        {title}
      </h2>
    </div>
    {!!text && (
      <div className="mt-2 text-base font-normal text-support-gray-007">
        {text}
      </div>
    )}
  </div>
)

export default AuthHeader
