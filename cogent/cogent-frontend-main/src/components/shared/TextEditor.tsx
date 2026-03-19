import React, { useState, useRef, useMemo, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { isUrlValid } from '@/utils/functions'
import 'react-quill/dist/quill.bubble.css'
import 'react-quill/dist/quill.snow.css'
import { createPortal } from 'react-dom'
import { useCardContext } from '../block/state/CardContext'
import katex from 'katex'
import 'katex/dist/katex.min.css'

if (typeof window !== 'undefined') {
  window.katex = katex
}

const Prompt = dynamic(() => import('@/components/shared/Prompt'))

const CardLinksModal = dynamic(
  () => import('@/components/block/CardLinksModal')
)

// const DuplicateVerticalCardModal = dynamic(
//   () => import('@/components/block/DuplicateVerticalCardModal')
// )

const DuplicateModal = dynamic(
  () => import('@/components/block/Card/CardEditor/AddLinkModal/DuplicateModal')
)

const NewVerticalCardModal = dynamic(
  () => import('@/components/block/NewVerticalCardModal')
)

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')

    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />
  },
  {
    ssr: false
  }
)

const Quill =
  typeof window === 'object' ? require('react-quill').Quill : () => false

interface TextEditorProps {
  isHorizontal?: boolean
  value: string
  setValue: (value: string) => void
  placeholder: string
}

const TextEditor: React.FC<TextEditorProps> = ({
  isHorizontal = true,
  value,
  setValue,
  placeholder
}) => {
  const quillRef = useRef(false)

  const { saveToHistory } = useCardContext()

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [isDuplicateModalVisible, setIsDuplicateModalVisible] =
    useState<boolean>(false)
  const [isAddLinkModalVisible, setIsAddLinkModalVisible] =
    useState<boolean>(false)
  const [isNewModalVisible, setIsNewModalVisible] = useState<boolean>(false)

  const [isVerticalPromptVisible, setIsVerticalPromptVisible] =
    useState<boolean>(false)

  const handleVerticalPromptChange = () => {
    if (isVerticalPromptVisible) {
      toggleDuplicateModal()
    }
  }

  useEffect(() => {
    handleVerticalPromptChange()
  }, [isVerticalPromptVisible])

  Quill.debug('error')

  /* custom toolbar icons */
  var icons = Quill.import('ui/icons')

  icons['formula'] =
    '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-math-function" width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 19a2 2 0 0 0 2 2c2 0 2 -4 3 -9s1 -9 3 -9a2 2 0 0 1 2 2" /><path d="M5 12h6" /><path d="M15 12l6 6" /><path d="M15 18l6 -6" /></svg>'

  icons[
    'cardLink'
  ] = `<svg viewBox="0 0 24 24" fill="none" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_118_1657)">
    <path d="M8.89795 11.7209C7.93586 10.7588 6.42 10.6311 5.31058 11.4189L4.82834 11.7613C3.79476 12.4952 2.88927 13.3945 2.14832 14.423C1.1569 15.7992 1.30965 17.6914 2.50901 18.8907L5.10927 21.4909C6.30864 22.6902 8.20073 22.843 9.57696 21.8516C10.6055 21.1107 11.5048 20.2052 12.2386 19.1716L12.6148 18.6419" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2.14832 14.423C1.1569 15.7992 1.30965 17.6914 2.50901 18.8907L5.10927 21.4909C6.30864 22.6902 8.20073 22.843 9.57696 21.8516C10.6055 21.1107 11.5048 20.2052 12.2386 19.1716L12.6148 18.6419C13.383 17.5599 13.2586 16.0815 12.3202 15.1431L8.89795 11.7209C7.93586 10.7588 6.42 10.6311 5.31058 11.4189L4.82834 11.7613C3.79476 12.4952 2.88927 13.3945 2.14832 14.423Z" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M21.491 5.10951L18.8907 2.50924C17.6914 1.30988 15.7993 1.15713 14.423 2.14856C13.3945 2.88951 12.4952 3.79499 11.7614 4.82857L11.4189 5.31081C10.6312 6.42023 10.7588 7.93609 11.7209 8.89818L15.1432 12.3205C16.0815 13.2588 17.5599 13.3832 18.642 12.615L19.1717 12.2389C20.2053 11.505 21.1107 10.6057 21.8517 9.57719C22.843 8.20096 22.6903 6.30887 21.491 5.10951Z" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.1917 8.80859L8.82391 15.1764" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
    <clipPath id="clip0_118_1657">
    <rect width="24" height="24" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    `
  icons[
    'verticalLink'
  ] = `<svg viewBox="0 0 24 24" fill="none" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_118_1657)">
    <path d="M8.89795 11.7209C7.93586 10.7588 6.42 10.6311 5.31058 11.4189L4.82834 11.7613C3.79476 12.4952 2.88927 13.3945 2.14832 14.423C1.1569 15.7992 1.30965 17.6914 2.50901 18.8907L5.10927 21.4909C6.30864 22.6902 8.20073 22.843 9.57696 21.8516C10.6055 21.1107 11.5048 20.2052 12.2386 19.1716L12.6148 18.6419" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2.14832 14.423C1.1569 15.7992 1.30965 17.6914 2.50901 18.8907L5.10927 21.4909C6.30864 22.6902 8.20073 22.843 9.57696 21.8516C10.6055 21.1107 11.5048 20.2052 12.2386 19.1716L12.6148 18.6419C13.383 17.5599 13.2586 16.0815 12.3202 15.1431L8.89795 11.7209C7.93586 10.7588 6.42 10.6311 5.31058 11.4189L4.82834 11.7613C3.79476 12.4952 2.88927 13.3945 2.14832 14.423Z" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M21.491 5.10951L18.8907 2.50924C17.6914 1.30988 15.7993 1.15713 14.423 2.14856C13.3945 2.88951 12.4952 3.79499 11.7614 4.82857L11.4189 5.31081C10.6312 6.42023 10.7588 7.93609 11.7209 8.89818L15.1432 12.3205C16.0815 13.2588 17.5599 13.3832 18.642 12.615L19.1717 12.2389C20.2053 11.505 21.1107 10.6057 21.8517 9.57719C22.843 8.20096 22.6903 6.30887 21.491 5.10951Z" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.1917 8.80859L8.82391 15.1764" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
    <clipPath id="clip0_118_1657">
    <rect width="24" height="24" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    `

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  const toggleVerticalLinkPrompt = () => {
    setIsVerticalPromptVisible(!isVerticalPromptVisible)
  }

  // const toggleDuplicateModal = () => {
  //   setIsDuplicateModalVisible(!isDuplicateModalVisible)
  // }

  const toggleDuplicateModal = () => {
    setIsDuplicateModalVisible(!isDuplicateModalVisible)
  }

  const toggleNewModal = () => {
    setIsNewModalVisible(!isNewModalVisible)
  }

  /*
   * Custom link blot
   */
  let Inline = Quill.import('blots/inline')

  class LinkBlot extends Inline {
    static create(value: string) {
      let node = super.create()
      // Sanitize url value if desired

      if (!value.startsWith('https://') && !value.startsWith('http://')) {
        value = `https://${value}`
      }

      if (isUrlValid(value)) {
        const url = new URL(value.replace(/([^:]\/)\/+/g, '$1'))
        /* detect if it's a cogent link  */
        if (url.origin === process.env.NEXT_PUBLIC_BASE_URL) {
          node.removeAttribute('target')
          node.setAttribute('class', 'cogent-link')

          /* detect if it'a a cogs link */
          const pathArray = url.pathname.split('/')
          if (pathArray[1] !== 'cogs') return

          /* save cog id to data attribute */
          node.setAttribute('data-cogId', `${pathArray[2]}`)

          const urlParams = new URLSearchParams(url.search)
          /* save block id to data attribute */
          if (url.searchParams.has('blockId')) {
            node.setAttribute('data-blockId', `${urlParams.get('blockId')}`)
          }
          /* save card id to data attribute */
          if (url.searchParams.has('focusedCardId')) {
            node.setAttribute(
              'data-cardId',
              `${urlParams.get('focusedCardId')}`
            )
          }

          console.log(url)

          /* save isVerticalCog to data attribute */
          if (url.searchParams.has('verticalCogId')) {
            node.setAttribute(
              'data-verticalCogId',
              `${urlParams.get('verticalCogId')}`
            )
          }
          if (url.searchParams.has('isVerticalCog')) {
            node.setAttribute(
              'data-isVerticalCog',
              `${urlParams.get('isVerticalCog')}`
            )
          }
          /* save vertical card id to data attribute */
          if (url.searchParams.has('verticalCardId')) {
            node.setAttribute(
              'data-verticalCardId',
              `${urlParams.get('verticalCardId')}`
            )
            node.setAttribute('class', 'cogent-link vertical-link')
          }
        }
      }

      node.setAttribute('href', value)

      return node
    }

    static formats(node: HTMLElement) {
      return node.getAttribute('href')
    }
  }
  LinkBlot.blotName = 'link'
  LinkBlot.tagName = 'a'

  Quill.register(LinkBlot)

  const formatLink = (cogId: string, cardId: string, blockId: string) => {
    const editor = quillRef?.current?.getEditor()

    editor.format(
      'link',
      `${process.env.NEXT_PUBLIC_BASE_URL}/cogs/${cogId}/?blockId=${blockId}&focusedCardId=${cardId}`
    )
  }

  const formatVerticalLink = (
    cogId: string,
    cardId: string,
    blockId: string,
    isVerticalCog: boolean,
    verticalCogId: string
  ) => {
    const editor = quillRef?.current?.getEditor()
    console.log(isVerticalCog)
    isVerticalCog ? (
      editor.format(
        'link',
        `${process.env.NEXT_PUBLIC_BASE_URL}/cogs/${cogId}/?blockId=${blockId}&verticalCardId=${cardId}&isVerticalCog=${isVerticalCog}&verticalCogId=${verticalCogId}`
      )
    ) : (
      editor.format(
        'link',
        `${process.env.NEXT_PUBLIC_BASE_URL}/cogs/${cogId}/?blockId=${blockId}&verticalCardId=${cardId}`
      )
    )

  }

  /* modules for horizontal timeline cards */
  const horizontalModules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'formula'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          // [{ verticalLink: 'Vertical Link' }, { cardLink: 'Card Link' }],
          [{ verticalLink: 'Vertical Link' }],
          ['clean']
        ],
        handlers: {
          // cardLink: toggleModal,
          verticalLink: toggleDuplicateModal
        },
        history: {
          delay: 500,
          maxStack: 100,
          userOnly: true
        }
      }
    }),
    []
  )

  /* modules for vertical card stack, horizontal links are disabled */
  const verticalModules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ verticalLink: 'Vertical Link' }],
          ['formula'],
          ['clean']
        ],
        handlers: {
          // cardLink: toggleModal,
          verticalLink: toggleDuplicateModal
        },
        history: {
          delay: 500,
          maxStack: 100,
          userOnly: true
        }
      }
    }),
    []
  )

  const modules = isHorizontal ? horizontalModules : verticalModules

  const formats = useMemo(
    () => ['bold', 'italic', 'underline', 'list', 'bullet', 'link', 'formula'],
    []
  )

  const interceptClick = (e: React.MouseEvent<HTMLDivElement>) => {
    let target = e.target

    while (target instanceof Element) {
      if (target.tagName === 'A') {
        e.preventDefault()
        const verticalCardId = target.getAttribute('data-verticalcardid')
        if (!verticalCardId) return

        saveToHistory(verticalCardId)
        break
      }

      target = target.parentElement
    }
  }

  return (
    <>
      {createPortal(
        <CardLinksModal
          isVisible={isModalVisible}
          toggleModal={toggleModal}
          formatLink={formatLink}
        />,
        document.body
      )}

      {/* {createPortal(
        <DuplicateVerticalCardModal
          isVisible={isDuplicateModalVisible}
          toggleModal={toggleDuplicateModal}
          formatLink={formatVerticalLink}
        />,
        document.body
      )} */}

      {createPortal(
        <DuplicateModal
          isVisible={isDuplicateModalVisible}
          toggleModal={toggleDuplicateModal}
          formatLink={formatVerticalLink}
        />,
        document.body
      )}

      {createPortal(
        <NewVerticalCardModal
          isVisible={isNewModalVisible}
          toggleModal={toggleNewModal}
          formatLink={formatVerticalLink}
        />,
        document.body
      )}

      {/* <Prompt
        isOpen={isVerticalPromptVisible}
        setIsOpen={setIsVerticalPromptVisible}
        text="Add card link"
        actions={[
          {
            text: 'Choose from your library',
            icon: 'add',
            function: toggleDuplicateModal
          },
          {
            text: 'Create new',
            icon: 'add',
            function: toggleNewModal
          }
        ]}
      /> */}

      <div className="text-editor h-full" onClick={(e) => interceptClick(e)}>
        <ReactQuill
          forwardedRef={quillRef}
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          className="h-[90%]"
          placeholder={placeholder}
        />
      </div>
    </>
  )
}

export default TextEditor
