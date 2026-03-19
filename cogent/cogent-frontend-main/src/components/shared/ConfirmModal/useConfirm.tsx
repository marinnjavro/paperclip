import React, { useCallback, useRef, useState } from 'react'
import ConfirmModal from '@/components/shared/ConfirmModal/ConfirmModal'

const useConfirm = (message: string, showInfo: boolean) => {
  const [isOpen, setIsOpen] = useState(false)
  const resolveReject = useRef()

  const requestConfirm = useCallback(() => {
    setIsOpen(true)
    return new Promise((resolve, reject) => {
      resolveReject.current = [resolve, reject]
    })
  }, [])

  const handleResponse = useCallback(
    (value) => {
      if (resolveReject.current.length > 0) {
        const [resolve] = resolveReject.current
        resolve(value)
      }
      setIsOpen(false)
    },
    [resolveReject]
  )

  return {
    requestConfirm,
    RenderConfirmModal: (
      <ConfirmModal
        isOpen={isOpen}
        message={message}
        onConfirm={() => handleResponse(true)}
        onCancel={() => handleResponse(false)}
        setIsOpen={setIsOpen}
        showInfo={showInfo}
      />
    ),
    handleResponse
  }
}

export default useConfirm
