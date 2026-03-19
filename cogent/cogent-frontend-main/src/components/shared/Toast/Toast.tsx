import React from 'react'
import { useTimeout } from '@/components/utils/hooks/useTimeout'

interface ToastProps {
  type: string
  children: string
  close: () => void
}

export const Toast = ({ type, children, close }: ToastProps) => {
  useTimeout(close, 5000)

  const ErrorToast = () => (
    <div className="relative w-full rounded-xl bg-support-red-402 p-4 text-white xs:w-[24rem]">
      <div className="flex items-center gap-2">
        <ErrorIcon />
        <ToastBody heading="Error" />
      </div>
      <CloseButton />
    </div>
  )

  const SuccessToast = () => (
    <div className="relative w-full rounded-xl bg-green-500 p-4 text-white xs:w-[24rem]">
      <div className="flex items-center gap-2">
        <SuccessIcon />
        <ToastBody heading="Success" />
      </div>
      <CloseButton />
    </div>
  )

  const WaitingToast = () => (
    <div className="relative w-full rounded-xl bg-yellow-400 p-4 text-white xs:w-[24rem]">
      <div className="flex items-center gap-2">
        <SuccessIcon />
        <ToastBody heading="Waiting" />
      </div>
      <CloseButton />
    </div>
  )

  const ToastBody = ({ heading }: { heading: string }) => (
    <div>
      <h3 className="text-base font-semibold">{heading}</h3>
      <div className="mr-0 text-sm sm:mr-3">{children}</div>
    </div>
  )

  const ErrorIcon = () => (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-exclamation-circle h-8 w-8"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
        <path d="M12 9v4"></path>
        <path d="M12 16v.01"></path>
      </svg>
    </div>
  )

  const SuccessIcon = () => (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-circle-check h-8 w-8"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
        <path d="M9 12l2 2l4 -4"></path>
      </svg>
    </div>
  )

  const CloseButton = () => (
    <button onClick={close} className="absolute top-2 right-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-x h-5 w-5"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M18 6l-12 12"></path>
        <path d="M6 6l12 12"></path>
      </svg>
    </button>
  )

  // prettier-ignore
  const renderToast: { [key: string]: JSX.Element } = {
    'error': <ErrorToast />,
    'success': <SuccessToast />,
    'waiting': <WaitingToast />
  }

  return renderToast[type]
}
