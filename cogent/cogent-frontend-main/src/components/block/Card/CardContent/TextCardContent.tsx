import React from 'react'
import { Card } from 'src/__generated__/graphql'
import CardName from '@/components/block/Card/CardContent/elements/CardName'
import CardText from '@/components/block/Card/CardContent/elements/CardText'
import CardNamePlaceholder from './placeholders/CardNamePlaceholder'
import QuillToolbarPlaceholder from './placeholders/QuillToolbarPlaceholder'
import { stripHTML } from '@/utils/textUtils'

interface TextCardContentProps {
  card: Card
}

const TextCardContent: React.FC<TextCardContentProps> = ({ card }) => {
  return (
    <>
      <div className="my-5 ">
        {!!card.name ? (
          <div className="mx-3.5 mb-3">
            <CardName name={card.name || ''} />
          </div>
        ) : (
          <div className="relative flex flex-col">
            <div className="">
              <CardNamePlaceholder />
            </div>
          </div>
        )}

        <div className="text-sm leading-relaxed">
          {!!card.text && !!stripHTML(card?.text) ? (
            <CardText text={card.text} />
          ) : (
            <div className="flex ">
              <div className="flex w-full cursor-pointer flex-col">
                <QuillToolbarPlaceholder />
                <p className="ml-[15px] mt-[3px] text-[14px] italic text-[#606174]">
                  Enter Card Text...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default TextCardContent
