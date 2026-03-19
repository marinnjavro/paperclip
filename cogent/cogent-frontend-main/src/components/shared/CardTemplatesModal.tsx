import { Fragment } from 'react'

import { Transition, Dialog } from '@headlessui/react'
import Icon from '@/components/shared/Icon'
import CardTemplate from '@/components/shared/CardTemplate'

const cardTemplatesByCategory = [
  {
    categoryLabel: 'Teaching',
    templates: [
      { label: 'Opening card', type: 'opening' },
      // { label: 'Audio', type: 'audio' },
      { label: 'Video / Photo', type: 'multimedia' },
      // { label: 'Text', type: 'text' },
      // { label: 'Photo and text', type: 'photo and text' },
      // { label: 'Video and text', type: 'video and text' },
      { label: 'Media and text', type: 'media and text' }
    ]
  },
  {
    categoryLabel: 'Testing',
    templates: [{ label: 'Quiz', type: 'action' }]
  }
]

interface CardTemplatesModalProps {
  isOpen: boolean
  toggleModal: () => void
  showOpeningCard: boolean
  handleTemplateOnClick: (type: string) => void
}

const CardTemplatesModal: React.FC<CardTemplatesModalProps> = ({
  isOpen,
  toggleModal,
  showOpeningCard,
  handleTemplateOnClick
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
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

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-[900px] transform overflow-hidden rounded-3xl border border-solid border-opacity-silver border-opacity-20 bg-day-base-02 p-6 text-left shadow-xl transition-all dark:border-night-base-05 dark:bg-night-base-02 sm:p-10">
                <Dialog.Title
                  as="h3"
                  className="mb-8 text-lg font-bold leading-6 text-day-text-label-primary dark:text-white sm:mb-10 sm:text-xl"
                >
                  Choose a card template
                </Dialog.Title>
                <div
                  className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-day-base-03 text-day-text-label-primary hover:bg-day-base-04 dark:bg-night-base-04 dark:text-white dark:hover:bg-night-base-03 sm:right-8 sm:top-8"
                  onClick={() => toggleModal()}
                >
                  <Icon type="remove" width={20} height={20} />
                </div>
                <div className="scrollbar-md--purple max-h-[60vh] overflow-y-auto">
                  {cardTemplatesByCategory.map((category, index) => (
                    <div
                      key={category.categoryLabel}
                      className={
                        index < cardTemplatesByCategory.length - 1
                          ? 'mb-10'
                          : ''
                      }
                    >
                      <h4 className="mb-5 text-sm font-semibold text-day-text-label-secondary-inverse dark:text-support-gray-001">
                        {category.categoryLabel}
                      </h4>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
                        {category.templates.map((template) =>
                          template.type === 'opening' ? (
                            showOpeningCard && (
                              <div
                                key={template.type}
                                onClick={() =>
                                  handleTemplateOnClick(template.type)
                                }
                              >
                                <CardTemplate
                                  label={template.label}
                                  type={template.type}
                                />
                              </div>
                            )
                          ) : (
                            <div
                              key={template.type}
                              onClick={() =>
                                handleTemplateOnClick(template.type)
                              }
                            >
                              <CardTemplate
                                label={template.label}
                                type={template.type}
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CardTemplatesModal
