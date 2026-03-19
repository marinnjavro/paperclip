import { Card } from 'src/__generated__/graphql'
import ActionOptionsGroup from '@/components/block/Card/CardEditor/ActionCardInputs/ActionOptionsGroup'
import ActionQuestionInput from '@/components/block/Card/CardEditor/ActionCardInputs/ActionQuestionInput'
import MediaInput from '@/components/block/Card/CardEditor/elements/MediaInput'
import ActionLinks from '@/components/block/Card/CardEditor/ActionCardInputs/ActionLinks'

interface ActionInputsProps {
  isHorizontal: boolean
  card: Card
  setIsSaving: (value: boolean) => void
  updateCardName: (name: string) => void
  updateCardActions: (actions: string) => void
  updateCardPhoto: (url: FileList) => void
  updateCardVideo: (url: FileList) => void
  updateCardText: (text: string) => void
}

const ActionCardInputs: React.FC<ActionInputsProps> = (props) => {
  return (
    <div className="scrollbar--sm h-full overflow-y-auto text-sm">
      <div
        className={`${
          !!props.card.videoUrl || !!props.card.photoUrl
            ? ''
            : 'mb-4 border-b border-solid border-opacity-silver border-opacity-20 dark:border-white dark:border-opacity-10'
        }`}
      >
        <MediaInput
          label="Upload photo or video"
          types={['image', 'video']}
          {...props}
        />
      </div>
      <ActionQuestionInput {...props} />
      <ActionOptionsGroup {...props} />
      <ActionLinks {...props} />
    </div>
  )
}

export default ActionCardInputs
