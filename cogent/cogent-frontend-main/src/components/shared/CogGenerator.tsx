import { Fragment, useEffect, useRef, useState } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import _ from 'lodash'
import { gql, useMutation } from '@apollo/client'
import {
  LlmGenerateCogMutation,
  LlmGenerateCogMutationVariables
} from 'src/__generated__/graphql'
import { SEARCH_COGS } from '@/components/library/store/CogsSearchContext'
import router from 'next/router'
import { getErrors, is } from '@/utils/validation'
import { useToast } from '@/components/shared/Toast'

import Icon from '@/components/shared/Icon'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import TextArea from '@/components/shared/TextArea'
import SelectInput from '@/components/shared/SelectInput'
import Tag from '@/components/shared/Tag'
import TextInput from '@/components/shared/TextInput'

const BLOCKS_OPTIONS = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' }
]
const CARDS_OPTIONS = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' }
]

const textOptions = [{ value: 'Chat GPT 3.5', label: 'Chat GPT 3.5' }]

const imageOptions = [
  { value: 'dalle2', label: 'DALL·E 2' },
  { value: 'dalle3', label: 'DALL·E 3' }
]

const GENERATE_COG = gql(`
  mutation llmGenerateCog($inputCog: LlmGenerateCogInput!) {
    llmGenerateCog(input: $inputCog) {
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

type GeneratorMode = 'topic' | 'url'
type DialPosition = 'high' | 'normal' | 'low'

interface MixerSettings {
  length: DialPosition
  style: DialPosition
  teach: DialPosition
  depth: DialPosition
}

const DIAL_CONFIG = [
  {
    key: 'length' as keyof MixerSettings,
    label: 'Length',
    high: 'Extensive',
    normal: 'Normal',
    low: 'Concise'
  },
  {
    key: 'style' as keyof MixerSettings,
    label: 'Style',
    high: 'Formal',
    normal: 'Normal',
    low: 'Informal'
  },
  {
    key: 'teach' as keyof MixerSettings,
    label: 'Teach',
    high: 'Teacher',
    normal: 'Normal',
    low: 'Expert'
  },
  {
    key: 'depth' as keyof MixerSettings,
    label: 'Depth',
    high: 'Deep',
    normal: 'Normal',
    low: 'Brief'
  }
]

interface CogGeneratorProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export interface CogData {
  query: string
  numberOfBlocks: number
  numberOfCards: number
}

const isValidUrl = (str: string) => {
  try {
    const url = new URL(str)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

const CogGenerator: React.FC<CogGeneratorProps> = ({ isOpen, setIsOpen }) => {
  const closeButtonRef: any = useRef()
  const toast = useToast()

  const [mode, setMode] = useState<GeneratorMode>('topic')
  const [urlValue, setUrlValue] = useState('')
  const [urlError, setUrlError] = useState('')
  const [guidanceValue, setGuidanceValue] = useState('')
  const [mixer, setMixer] = useState<MixerSettings>({
    length: 'normal',
    style: 'normal',
    teach: 'normal',
    depth: 'normal'
  })

  const [cogData, setCogData] = useState<CogData>({
    query: '',
    numberOfBlocks: 3,
    numberOfCards: 4
  })
  const [errors, setErrors] = useState({ query: '' })

  useEffect(() => {
    clearErrors()
    setUrlError('')
  }, [isOpen])

  const [generateCogMutation, { loading }] = useMutation<
    LlmGenerateCogMutation,
    LlmGenerateCogMutationVariables
  >(GENERATE_COG, {
    onError: (err) => {
      const message =
        err.graphQLErrors?.[0]?.message ||
        'An error occurred while trying to create a new Cog. Please try again.'
      toast.open('error', message)
    },
    onCompleted: (data) =>
      router.push(`/cogs/${data?.llmGenerateCog?.cog?.id}/edit`),
    refetchQueries: [
      {
        query: SEARCH_COGS,
        variables: {
          page: 1,
          order: `cogs.created_at desc`,
          filters: {
            query: '',
            user: 'ME'
          }
        }
      }
    ]
  })

  const generateCog = async (cogData: CogData) => {
    if (mode === 'url') {
      // URL mode validation
      if (!urlValue.trim()) {
        setUrlError('Please enter a URL')
        return
      }
      if (!isValidUrl(urlValue.trim())) {
        setUrlError('Please enter a valid URL (e.g. https://example.com)')
        return
      }
      await generateCogMutation({
        variables: {
          inputCog: {
            attributes: {
              url: urlValue.trim(),
              ...(guidanceValue.trim() && { guidance: guidanceValue.trim() }),
              lengthSetting: mixer.length,
              styleSetting: mixer.style,
              teachSetting: mixer.teach,
              depthSetting: mixer.depth
            }
          }
        }
      })
    } else {
      // Topic mode validation (existing behavior)
      const { errors: cogErrors, isValid } = validateCogData(cogData)
      if (!isValid) {
        setErrors(cogErrors)
        return
      }
      await generateCogMutation({
        variables: {
          inputCog: {
            attributes: {
              query: cogData!.query,
              numberOfBlocks: cogData?.numberOfBlocks,
              numberOfCards: cogData?.numberOfCards
            }
          }
        }
      })
    }
  }

  const validateCogData = (values: CogData) => {
    const errors: any = getErrors(values, {
      query: [is.required('This field is required')]
    })
    return { errors, isValid: _.values(errors).every(_.isEmpty) }
  }

  const handleBlocksChange = (value: number) => {
    setCogData((prevState) => ({
      ...prevState,
      numberOfBlocks: value
    }))
  }

  const handleCardsChange = (value: number) => {
    setCogData((prevState) => ({
      ...prevState,
      numberOfCards: value
    }))
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCogData((prevState) => ({
      ...prevState,
      query: event.target.value
    }))
    setErrors({ ...errors, query: '' })
  }

  const clearErrors = () => {
    setErrors(_.mapValues(errors, () => ''))
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        initialFocus={closeButtonRef}
        className="relative z-50"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed opacity-100 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />
        </Transition.Child>
        <div className="fixed inset-x-3 bottom-3 flex items-center justify-center sm:bottom-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="text:night-base-01 relative w-full rounded-3xl border border-solid border-opacity-silver border-opacity-20 bg-day-base-02 p-4 dark:border-night-base-05 dark:bg-night-base-02 dark:text-white sm:w-[816px]">
              <Dialog.Title className="mr-14 mb-4 flex justify-between text-xl font-bold">
                Generate
                <div className="mt-1.5">
                  <Tag name={'Al beta'} />
                </div>
              </Dialog.Title>

              <div
                className="absolute right-3.5 top-3.5 h-10 w-10 cursor-pointer rounded-full bg-white text-day-text-label-primary dark:bg-night-base-04 dark:text-white"
                ref={closeButtonRef}
                onMouseDown={() => setIsOpen(false)}
              >
                <div className="flex h-full w-full items-center justify-center">
                  <Icon type="remove" width={24} height={24} />
                </div>
              </div>

              {/* Mode toggle */}
              <div className="mb-4 flex gap-2">
                <button
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                    mode === 'topic'
                      ? 'bg-day-base-primary text-white'
                      : 'border border-white/10 bg-night-base-04 text-white/60 hover:text-white'
                  }`}
                  onClick={() => {
                    setMode('topic')
                    setUrlError('')
                  }}
                >
                  From Topic
                </button>
                <button
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                    mode === 'url'
                      ? 'bg-day-base-primary text-white'
                      : 'border border-white/10 bg-night-base-04 text-white/60 hover:text-white'
                  }`}
                  onClick={() => {
                    setMode('url')
                    setErrors({ query: '' })
                  }}
                >
                  From URL
                </button>
              </div>

              {/* Options row — only show for topic mode */}
              {mode === 'topic' && (
                <div className="flex flex-wrap gap-2 py-4 text-sm text-[#aaabb3] sm:flex-nowrap">
                  <div className="w-full sm:w-1/2 lg:w-1/4">
                    <h1>Blocks</h1>
                    <div className="mt-2">
                      <SelectInput
                        options={BLOCKS_OPTIONS}
                        value={cogData.numberOfBlocks}
                        handleChange={handleBlocksChange}
                        name={'number-of-blocks'}
                        position={'up'}
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 lg:w-1/4">
                    <h1>Cards in blocks</h1>
                    <div className="mt-2">
                      <SelectInput
                        options={CARDS_OPTIONS}
                        value={cogData.numberOfCards}
                        handleChange={handleCardsChange}
                        name={'number-of-cards'}
                        position={'up'}
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 lg:w-1/4">
                    <h1>Text Source</h1>
                    <div className="mt-2">
                      <SelectInput
                        options={textOptions}
                        value={'Chat GPT 3.5'}
                        handleChange={() => {}}
                        name={'text-options'}
                        position={'up'}
                        isDisabled={true}
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2 lg:w-1/4">
                    <h1>Image Source</h1>
                    <div className="mt-2">
                      <SelectInput
                        options={imageOptions}
                        value={'dalle3'}
                        handleChange={() => {}}
                        name={'image-options'}
                        position={'up'}
                        isDisabled={true}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Input area */}
              <div className="border-t border-solid border-night-text border-opacity-20 py-4">
                {mode === 'topic' ? (
                  <TextArea
                    placeholder="What should be your cog about?"
                    name="generate-cog"
                    value={cogData!.query}
                    handleChange={handleChange}
                    error={errors?.query}
                  />
                ) : (
                  <div>
                    <p className="mb-3 text-sm text-white/50">
                      Paste a URL and Cogent will read the page and generate a
                      learning Cog from its content — including quiz questions.
                    </p>
                    <TextInput
                      label="Page URL"
                      name="generate-cog-url"
                      value={urlValue}
                      handleChange={(e) => {
                        setUrlValue(e.target.value)
                        setUrlError('')
                      }}
                      error={urlError}
                    />
                    <div className="mt-3">
                      <TextArea
                        placeholder="Optional: tell us what to focus on or how to structure the Cog..."
                        name="generate-cog-guidance"
                        value={guidanceValue}
                        handleChange={(e) => setGuidanceValue(e.target.value)}
                        rows={2}
                      />
                    </div>

                    {/* Mixer dials */}
                    <div className="mt-4 grid grid-cols-4 gap-3">
                      {DIAL_CONFIG.map((dial) => {
                        const value = mixer[dial.key]
                        return (
                          <div key={dial.key} className="flex flex-col items-center">
                            <div className="flex w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-night-base-04">
                              {(['high', 'normal', 'low'] as DialPosition[]).map((pos) => {
                                const isActive = value === pos
                                const posLabel = pos === 'high' ? dial.high : pos === 'low' ? dial.low : dial.normal
                                return (
                                  <button
                                    key={pos}
                                    type="button"
                                    onClick={() => setMixer((prev) => ({ ...prev, [dial.key]: pos }))}
                                    className={`px-2 py-2 text-xs font-medium transition-all ${
                                      isActive
                                        ? 'bg-day-base-primary text-white shadow-inner'
                                        : 'text-white/40 hover:bg-white/5 hover:text-white/70'
                                    }`}
                                  >
                                    {posLabel}
                                  </button>
                                )
                              })}
                            </div>
                            <span className="mt-1.5 text-[11px] font-medium tracking-wide text-white/50">
                              {dial.label}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
              <ButtonPrimary
                label={
                  loading
                    ? mode === 'url'
                      ? 'Reading page & generating...'
                      : 'Generating...'
                    : mode === 'url'
                      ? 'Generate from URL'
                      : 'Generate'
                }
                classNames="w-full rounded-[20px]"
                onClick={() => generateCog(cogData)}
                isLoading={loading}
                disabled={loading}
              />
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CogGenerator
