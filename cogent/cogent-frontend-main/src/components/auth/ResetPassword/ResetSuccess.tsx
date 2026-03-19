import Link from 'next/link'

const Success = () => (
  <div>
    <div className="mt-8 flex items-center">
      <h2 className="text-4xl font-bold leading-10 tracking-tight text-day-text-label-primary dark:text-white">
        Success!
      </h2>
    </div>
    <div className="leading-2 mt-2 flex flex-col gap-8 pt-10 text-base text-base font-normal text-support-gray-003">
      <p className="flex flex-col gap-2">
        Your password has been updated!
        <span>
          You can now
          <Link href="/signin" className="ml-1 text-base">
            sign in with your new password.
          </Link>
        </span>
      </p>
    </div>
  </div>
)

export default Success
