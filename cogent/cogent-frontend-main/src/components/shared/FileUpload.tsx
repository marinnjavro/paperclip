import React, { useRef } from 'react'

export type FileType = 'image' | 'video' | 'audio'

export const fileTypes: { [key: string]: string[] } = {
  image: ['image/png,image/gif,image/jpeg'],
  video: ['video/mp4,video/x-m4v,video/*'],
  audio: ['audio/mp3']
}

interface FileInputProps {
  accepts: FileType[]
  multiple?: boolean
  dragActive: boolean
  setDrag: (value: boolean) => void
  handleFiles: (files: FileList) => void
  children: JSX.Element
}

const FileUpload: React.FC<FileInputProps> = ({
  accepts,
  multiple = false,
  dragActive,
  handleFiles,
  setDrag,
  children
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const getFileTypes = () => {
    let acceptedTypes: string[] = []
    accepts.forEach(
      (type) => (acceptedTypes = [...acceptedTypes, ...fileTypes[type]])
    )
    return acceptedTypes.join(',')
  }

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDrag(true)
    } else if (e.type === 'dragleave') {
      setDrag(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDrag(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  // triggers the input when the button is clicked
  // const onButtonClick = () => {
  //   if (!inputRef?.current) return
  //   inputRef.current.click()
  // }

  return (
    <div className="h-full w-full" onDragEnter={handleDrag}>
      <input
        ref={inputRef}
        type="file"
        id="input-file-upload"
        className="hidden"
        accept={getFileTypes()}
        multiple={multiple}
        onChange={handleChange}
      />
      <label htmlFor="input-file-upload">{children}</label>
      {dragActive && (
        <div
          className="absolute inset-0 h-full w-full"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </div>
  )
}

export default FileUpload
