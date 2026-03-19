import { StaticImageData } from 'next/image'
import Opening from '@/assets/static/cardTemplates/opening-card-template.png'
import MediaText from '@/assets/static/cardTemplates/photo-text-card-template.png'
import PhotoText from '@/assets/static/cardTemplates/photo-text-card-template.png'
import VideoText from '@/assets/static/cardTemplates/video-text-card-template.png'
import Text from '@/assets/static/cardTemplates/text-card-template.png'
import Audio from '@/assets/static/cardTemplates/audio-card-template.png'
import Media from '@/assets/static/cardTemplates/multimedia-card-template.png'
import Action from '@/assets/static/cardTemplates/action-card-template.png'

import OpeningLight from '@/assets/static/cardTemplates/opening-card-template.png'
import MediaTextLight from '@/assets/static/cardTemplates/photo-text-card-template-light.png'
import PhotoTextLight from '@/assets/static/cardTemplates/photo-text-card-template-light.png'
import VideoTextLight from '@/assets/static/cardTemplates/video-text-card-template-light.png'
import TextLight from '@/assets/static/cardTemplates/text-card-template-light.png'
import AudioLight from '@/assets/static/cardTemplates/audio-card-template-light.png'
import MediaLight from '@/assets/static/cardTemplates/multimedia-card-template-light.png'
import ActionLight from '@/assets/static/cardTemplates/action-card-template-light.png'

// prettier-ignore
const cardTemplateTypes: { [type: string]: StaticImageData } = {
  'opening': Opening,
  'audio': Audio,
  'multimedia': Media,
  'action': Action,
  'media and text': MediaText,
  'text': Text,
  'photo and text': PhotoText,
  'video and text': VideoText
}

// prettier-ignore
const cardTemplateTypesLight: { [type: string]: StaticImageData } = {
  'opening': OpeningLight,
  'audio': AudioLight,
  'multimedia': MediaLight,
  'action': ActionLight,
  'media and text': MediaText,
  'text': TextLight,
  'photo and text': PhotoTextLight,
  'video and text': VideoTextLight
}

type CardTemplateProps = {
  type: string
  label: string
}

const CardTemplate = ({ type, label }: CardTemplateProps): JSX.Element => {
  return (
    <div className="flex justify-center">
      <div className="flex w-full shrink-0  cursor-pointer flex-col items-center justify-between rounded-3xl border border-solid border-opacity-silver border-opacity-20 bg-day-base-03 hover:bg-day-static-background dark:border-white dark:border-opacity-20 dark:bg-transparent dark:hover:bg-night-base-03 xs:w-[184px] sm:h-[350px]">
        <div className="flex h-full  flex-1 flex-col justify-between px-5 pt-[49px] text-center font-semibold text-day-text-label-primary dark:text-white">
          <div className="mb-11 text-xxs xs:text-base">{label}</div>
          <div className="hidden h-[160px] overflow-hidden dark:block xs:h-[250px]">
            <img
              src={cardTemplateTypes[type].src}
              alt={`Card Template: ${label}`}
            />
          </div>
          <div className="h-[232px] overflow-hidden rounded-t-[16px] dark:hidden">
            <img
              src={cardTemplateTypesLight[type].src}
              alt={`Card Template: ${label}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardTemplate
