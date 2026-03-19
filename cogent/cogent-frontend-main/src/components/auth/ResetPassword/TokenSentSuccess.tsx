import Link from 'next/link'

interface SuccessProps {
  email: string
  requestResetToken: (email: string) => void
}

const Success = ({ email, requestResetToken }: SuccessProps) => (
  <div>
    <div className="mt-8 flex items-center">
      <h2 className="text-4xl font-bold leading-10 tracking-tight text-day-text-label-primary dark:text-white">
        A password reset link has been sent to your email
      </h2>
    </div>
    <div className="leading-2 flex flex-col gap-8 text-base text-base font-normal text-support-gray-003">
      <p className="pt-[5%] text-sm">
        {`If you didn't receive an email, click on`}
        <a
          className="ml-1 cursor-pointer not-italic"
          onClick={(e) => {
            e.preventDefault()
            requestResetToken(email)
          }}
        >
          Request email again.
        </a>
      </p>
    </div>
  </div>
)

export default Success
