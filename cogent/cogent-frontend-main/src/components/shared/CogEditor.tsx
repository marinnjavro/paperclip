import { useState, useEffect, Fragment } from 'react'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/client'
import { gql } from 'src/__generated__/gql'
import {
  CreateCogMutation,
  CreateCogMutationVariables,
  UpdateCogMutation,
  UpdateCogMutationVariables,
  Cog
} from 'src/__generated__/graphql'
import { addToArray, removeFromArray } from '@/utils/functions'
import {
  initialCogData,
  initialCogErrors
} from '@/components/cogs/state/initialState'
import { validateCogData } from '@/components/cogs/state/validate'
import { useToast } from '@/components/shared/Toast'

import { Dialog, Transition } from '@headlessui/react'
import Icon from '@/components/shared/Icon'
import TagInput from '@/components/shared/TagInput'
import TextInput from '@/components/shared/TextInput'
import TextArea from '@/components/shared/TextArea'
import Toggle from '@/components/shared/Toggle'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import FileUpload from '@/components/shared/FileUpload'

const MAX_TAGS = 8

interface CogEditorProps {
  cog?: Cog
  open: boolean
  toggleModal: () => void
}

interface Tag {
  name: string
}

export interface CogData {
  tags: string[]
  name: string
  description: string
  isPublic: boolean
  photo: string | File | null
}

const CogEditor: React.FC<CogEditorProps> = ({
  cog = {},
  open,
  toggleModal
}) => {
  const router = useRouter()
  const toast = useToast()

  const isEditing = !_.isEmpty(cog)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [cogData, setCogData] = useState<CogData>({
    ...initialCogData
  })
  const [newTag, setNewTag] = useState<string>('')
  const [errors, setErrors] = useState({
    ...initialCogErrors
  })
  const [dragActive, setDragActive] = useState<boolean>(false)

  useEffect(() => {
    resetFields()
    clearErrors()
    setIsLoading(false)
  }, [open])

  const FETCH_COGS = gql(`
  query fetchCogsEditor {
    me {
      cogs {
        id
        name
        description
        tags
        isPinned
        isPublic
        createdAt
        photoUrl(width: 1000, height: 1000)
      } 
    }
  }
`)

  /* create a new cog */
  const CREATE_COG = gql(`
    mutation createCog($inputCog: CreateCogInput!) {
      createCog(input: $inputCog) {
        cog {
          id
          name
          description
          tags
          isPinned
          isPublic
          createdAt
        }
      }
    }
  `)

  const [createCogMutation] = useMutation<
    CreateCogMutation,
    CreateCogMutationVariables
  >(CREATE_COG, {
    onError: (err) => {
      toast.open(
        'error',
        'An error occurred while trying to create a new Cog. Please try again.'
      )
    },
    onCompleted: (data) => router.push(`/cogs/${data?.createCog?.cog?.id}/edit`)
  })

  const createCog = async (cogData?: CogData) => {
    await createCogMutation({
      variables: {
        inputCog: {
          attributes: {
            name: cogData?.name,
            description: cogData?.description,
            tags: cogData?.tags,
            isPublic: cogData?.isPublic,
            photo: cogData?.photo
          }
        }
      }
    })
  }

  const UPDATE_COG = gql(`
    mutation updateCog($updateCog: UpdateCogInput!) {
      updateCog(input: $updateCog) {
        cog {
          id
          name
          description
          tags
          isPinned
          isPublic
          createdAt
        }
      }
    }
  `)

  // TODO update cache
  const [updateExistingCog] = useMutation<
    UpdateCogMutation,
    UpdateCogMutationVariables
  >(UPDATE_COG, {
    onError: (err) =>
      toast.open(
        'error',
        'An error occurred while trying to update the cog. Please try again.'
      ),
    onCompleted: (data) =>
      toast.open('success', 'The cog was updated successfully'),
    refetchQueries: [
      {
        query: FETCH_COGS
      }
    ]
  })

  const updateCog = async (cogData: CogData, id?: string) => {
    if (!id) return toast.open('error', 'An error occurred. Please try again.')
    if (typeof cogData.photo === 'string') {
      await updateExistingCog({
        variables: {
          updateCog: {
            id: id,
            attributes: {
              name: cogData.name,
              description: cogData?.description,
              tags: cogData?.tags,
              isPublic: cogData?.isPublic
            }
          }
        }
      })
    } else {
      await updateExistingCog({
        variables: {
          updateCog: {
            id: id,
            attributes: {
              name: cogData.name,
              description: cogData?.description,
              tags: cogData?.tags,
              isPublic: cogData?.isPublic,
              photo: cogData?.photo
            }
          }
        }
      })
    }
  }

  const resetFields = () => {
    setNewTag('')
    setCogData({
      tags: cog?.tags || [],
      name: cog?.name || '',
      description: cog?.description || '',
      isPublic: !!cog?.isPublic,
      photo: cog?.photoUrl || null
    })
  }

  const clearErrors = () => {
    setErrors(_.mapValues(errors, () => ''))
  }

  const toggleIsPublic = () => {
    setCogData({ ...cogData, isPublic: !cogData.isPublic })
  }

  const addTag = (tag: string) => {
    const tagsArray = [...cogData.tags]
    const updatedTags = addToArray(tagsArray, tag)
    setCogData({ ...cogData, tags: updatedTags })
  }

  const removeTag = (tag: string) => {
    const tagsArray = [...cogData.tags]
    const updatedTags = removeFromArray(tagsArray, tag)
    setCogData({ ...cogData, tags: updatedTags })
  }

  const setTagErrors = (message: string) => {
    setErrors({ ...errors, tags: message })
  }

  const handleCreateCog = () => {
    setIsLoading(true)

    const { errors: cogErrors, isValid } = validateCogData(cogData)
    if (!isValid) {
      setIsLoading(false)
      setErrors(cogErrors)
      return
    }

    createCog(cogData)
    toggleModal()
  }

  const handleEditCog = () => {
    if (!cog) return
    setIsLoading(true)

    const { errors: cogErrors, isValid } = validateCogData(cogData)
    if (!isValid) {
      setIsLoading(false)
      setErrors(cogErrors)
      return
    }

    updateCog(cogData, cog.id)
    toggleModal()
  }

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setCogData((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
    setErrors({ ...errors, [name]: '' })
  }

  const handleMediaChange = (files: FileList) => {
    if (!files) return
    setCogData({ ...cogData, photo: files[0] })
  }

  const deleteMedia = () => {
    setCogData({ ...cogData, photo: null })
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={toggleModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-full transform overflow-hidden rounded-4xl border border-solid border-white border-opacity-10 bg-day-base-02 p-4 text-left shadow-xl transition-all dark:bg-night-base-02 sm:max-w-2xl sm:border-none sm:p-8">
                <div className="flex justify-between">
                  <div className="text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-bold leading-6 text-day-text-label-primary dark:text-white sm:text-xl"
                    >
                      {isEditing ? 'Edit' : 'Creating a new cog'}
                    </Dialog.Title>
                  </div>
                  <div
                    className="absolute top-4 right-4 cursor-pointer rounded-full bg-white p-2 text-day-text-label-primary dark:bg-night-base-04 dark:text-white sm:right-7 sm:top-7 sm:p-3"
                    onClick={() => toggleModal()}
                  >
                    <Icon type="remove" width={24} height={24} />
                  </div>
                </div>
                <div className="mt-4 sm:mt-2">
                  <div className="flex flex-col gap-x-6 pt-4 sm:flex-row sm:pt-8">
                    {/*  mobile photo input */}
                    <div className="block sm:hidden">
                      <FileUpload
                        accepts={['image']}
                        handleFiles={handleMediaChange}
                        dragActive={dragActive}
                        setDrag={setDragActive}
                      >
                        <div className="flex h-72 w-full items-center justify-center overflow-hidden rounded-3xl border border-solid border-opacity-silver border-opacity-20 bg-white dark:border-white dark:border-opacity-10 dark:bg-night-base-04 sm:rounded-4xl">
                          {!!cogData?.photo ? (
                            typeof cogData?.photo === 'string' ? (
                              <img
                                src={cogData?.photo}
                                alt="Cog Image"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <img
                                src={URL.createObjectURL(cogData?.photo)}
                                alt="Cog Image"
                                className="h-full w-full object-cover"
                              />
                            )
                          ) : (
                            <div className="flex items-center gap-2">
                              <div className="text-opacity-silver">
                                <Icon type="addCircle" width={36} height={36} />
                              </div>
                              <div className="text-xs dark:text-white">
                                Add picture
                              </div>
                            </div>
                          )}
                        </div>
                      </FileUpload>
                    </div>

                    {/* desktop photo input */}
                    <div className="hidden flex-col items-center sm:flex">
                      <div className="w-full pb-2.5 text-left">
                        <h2 className="text-base font-bold text-day-text-label-primary dark:text-white">
                          Thumbnail preview
                        </h2>
                      </div>
                      <div className="h-[170px] w-[170px] shrink-0 overflow-hidden rounded-[32px] border border-solid border-white border-opacity-10">
                        {!!cogData?.photo ? (
                          typeof cogData?.photo === 'string' ? (
                            <img
                              src={cogData?.photo}
                              alt="Cog Image"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <img
                              src={URL.createObjectURL(cogData?.photo)}
                              alt="Cog Image"
                              className="h-full w-full object-cover"
                            />
                          )
                        ) : (
                          <img
                            className="h-full h-full object-cover brightness-75 invert saturate-0 dark:brightness-100 dark:invert-0 dark:saturate-100"
                            src="assets/static/images/cog-thumbnail-placeholder.png"
                            alt=""
                          />
                        )}
                      </div>

                      <div className="flex flex-col items-center justify-center gap-2 pt-4 text-sm font-bold">
                        <FileUpload
                          accepts={['image']}
                          handleFiles={handleMediaChange}
                          dragActive={dragActive}
                          setDrag={setDragActive}
                        >
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="flex cursor-pointer items-center gap-x-1.5 text-day-text-label-primary hover:brightness-125 dark:text-white"
                          >
                            <Icon
                              width={15}
                              height={15}
                              type="profile"
                              classNames="opacity-70 dark:opacity-100"
                            />
                            Change photo
                          </div>
                        </FileUpload>
                        <div
                          onClick={() => deleteMedia()}
                          className="flex cursor-pointer items-center gap-x-1.5 text-support-gray-002 hover:brightness-125"
                        >
                          <Icon width={15} height={15} type="delete" />
                          Delete photo
                        </div>
                      </div>
                    </div>

                    <div className="w-full">
                      <div className="my-4 border-b border-solid border-opacity-silver border-opacity-20 pb-4 dark:border-white dark:border-opacity-10 sm:my-6 sm:pb-6">
                        <div>
                          <TextInput
                            label="Enter the cog title"
                            name="name"
                            value={cogData.name}
                            handleChange={handleChange}
                            error={errors.name}
                          />
                        </div>
                        <div className="mt-4 sm:mt-6">
                          <TextArea
                            placeholder="Briefly describe the essence of the cog"
                            name="description"
                            value={cogData.description}
                            handleChange={handleChange}
                            error={errors.description}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 sm:gap-6">
                        <div>
                          <div className="">
                            <TagInput
                              label="Enter tag name"
                              title="Tags"
                              name="newTag"
                              max={MAX_TAGS}
                              value={newTag}
                              tags={cogData?.tags}
                              addTag={addTag}
                              removeTag={removeTag}
                              setTagErrors={setTagErrors}
                              error={errors.tags}
                            />
                          </div>
                        </div>

                        <div className="mb-4 flex w-full items-center justify-between gap-2.5 border-b border-solid border-opacity-silver border-opacity-20 pb-4 text-sm text-day-text-label-primary dark:border-white dark:border-opacity-10 dark:text-white sm:mb-6 sm:justify-start sm:pb-6">
                          <div>
                            <Toggle
                              enabled={cogData.isPublic}
                              toggle={toggleIsPublic}
                            />
                            <span className="ml-2.5 font-bold">
                              Post my cog to the community
                            </span>
                          </div>
                          <span className="cursor-pointer opacity-50 hover:opacity-100 sm:opacity-40">
                            <Icon type="helpCircle" width={20} height={20} />
                          </span>
                        </div>
                      </div>

                      <div className="flex w-full justify-end">
                        {isEditing ? (
                          <ButtonPrimary
                            label="Publish"
                            onClick={handleEditCog}
                            isLoading={isLoading}
                            classNames="max-w-[85px] h-[44px] w-full sm:w-auto"
                          />
                        ) : (
                          <ButtonPrimary
                            label="Create"
                            onClick={handleCreateCog}
                            isLoading={isLoading}
                            classNames="max-w-[85px] h-[44px] w-full sm:w-auto"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default CogEditor
