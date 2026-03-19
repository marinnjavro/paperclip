import React, { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Transition } from '@headlessui/react'
import { ToastContext } from './ToastContext'
import { Toast } from './Toast'

interface ToastProviderProps {
  children: JSX.Element
}

interface Toast {
  id: string
  type: string
  content: string
}

// Generate a random ID
function generateUEID() {
  let first: string | number = (Math.random() * 46656) | 0
  let second: string | number = (Math.random() * 46656) | 0
  first = ('000' + first.toString(36)).slice(-3)
  second = ('000' + second.toString(36)).slice(-3)

  return first + second
}

export const ToastProvider = (props: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [show, setShow] = useState(false)

  const open = (type: string, content: string) => {
    setToasts((currentToasts) => [
      ...currentToasts,
      { id: generateUEID(), content, type }
    ])
    setShow(true)
  }

  const close = (id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    )
  }

  const contextValue = useMemo(() => ({ open }), [])

  return (
    <ToastContext.Provider value={contextValue}>
      {props.children}

      {createPortal(
        <div className="fixed bottom-0 left-0 right-0 z-50 m-5 flex h-min flex-col gap-y-5 xs:left-auto xs:top-0 xs:w-auto">
          {toasts.map((toast) => (
            <Transition appear={true} show={show} key={toast.id}>
              <Transition.Child
                className="duration-00 ease-in-out"
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Toast close={() => close(toast.id)} type={toast.type}>
                  {toast.content}
                </Toast>
              </Transition.Child>
            </Transition>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}
