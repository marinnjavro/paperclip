import React, { useState } from 'react'
import FileUpload from '@/components/shared/FileUpload'
import Icon from '@/components/shared/Icon'

interface ProfilePhotoInputProps {
  handleFiles: (files: FileList) => void
}

const ProfilePhotoInput: React.FC<ProfilePhotoInputProps> = ({
  handleFiles
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false)

  return (
    <FileUpload
      accepts={['image']}
      dragActive={dragActive}
      setDrag={setDragActive}
      handleFiles={handleFiles}
    >
      <div
        className={`${
          dragActive
            ? 'text-support-gray-006 dark:text-white'
            : 'text-support-gray-003'
        } flex h-full w-full items-center justify-center text-center text-sm`}
      >
        <div className="relative">
          <div className="group flex h-52 w-52 cursor-pointer flex-col items-center justify-center rounded-full hover:text-support-gray-006 dark:hover:text-white">
            <div className="mb-3 flex justify-center">
              <svg
                className={`${
                  dragActive
                    ? 'stroke-day-base-primary dark:stroke-night-base-secondary'
                    : 'stroke-day-base-06 group-hover:stroke-day-base-primary dark:stroke-night-base-06  dark:group-hover:stroke-night-base-secondary'
                } absolute inset-0`}
                viewBox="-3 -3 106 106"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="50"
                  strokeDasharray="4, 4"
                  fill="transparent"
                  strokeWidth="0.7"
                />
              </svg>
              <div
                className={`${
                  dragActive
                    ? 'text-day-base-primary dark:text-support-turquoise-201'
                    : ''
                } group-hover:text-day-base-primary dark:group-hover:text-support-turquoise-201`}
              >
                <Icon type="profileUpload" width={35} height={35} />
              </div>
            </div>
            <button className="upload-button">Upload photos</button>
            <p>or drag them here</p>
          </div>
        </div>
      </div>
    </FileUpload>
  )
}
export default ProfilePhotoInput
