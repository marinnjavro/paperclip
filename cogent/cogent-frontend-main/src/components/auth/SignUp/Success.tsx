interface SuccessProps {
  email: string
  resendConfirmation: (email: string) => void
}

const Success = ({ email, resendConfirmation }: SuccessProps) => (
  <div>
    <div className="mt-8 flex items-center">
      <h2 className="text-4xl font-bold leading-10 tracking-tight text-white">
        Almost there!
      </h2>
    </div>
    <div className="leading-2 mt-2 flex flex-col gap-8 pt-10 text-base text-base font-normal text-support-gray-003">
      <p className="flex flex-col gap-2">
        <span>Thanks for signing up. </span>
        <span>
          Please verify your email address by clicking the link in the email we
          sent to:
        </span>
      </p>
      <p className="text-xl font-bold text-white opacity-90">
        {!!email ? email : '-'}
      </p>
      <p className="pt-[5%] text-sm italic">
        Didn&apos;t get the confirmation link?
        <a
          className="ml-1 cursor-pointer"
          onClick={(e) => {
            e.preventDefault()
            resendConfirmation(email)
          }}
        >
          Click here to resend the email.
        </a>
      </p>
    </div>
  </div>
)

export default Success
