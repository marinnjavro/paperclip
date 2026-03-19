import React from 'react'
import { Cog as CogType } from 'src/__generated__/graphql'
import { ThumbnailPlaceholder } from '@/components/shared/placeholders/ThumbnailPlaceholder'
import router from 'next/router'

interface CogProps {
  cog: CogType
  topLeft?: React.ReactElement
  topRight?: React.ReactElement
  bottomLeft?: React.ReactElement
  bottomRight?: React.ReactElement
}

const Cog: React.FC<CogProps> = ({
  cog,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight
}) => {
  return (
    <div className="relative w-full cursor-pointer">
      <div className="flex w-full flex-col rounded-[32px] border border-solid border-opacity-silver border-opacity-20 bg-day-base-02 p-6 dark:border-white dark:border-opacity-10 dark:bg-night-base-03">
        <div>
          {topLeft || topRight ? (
            <div
              className="flex w-full justify-between pb-6"
              onClick={(e) => {
                e.stopPropagation()
                e.nativeEvent.preventDefault()
              }}
            >
              <div className={topRight ? 'w-[85%]' : 'w-full'}>{topLeft}</div>
              <div className="relative mt-2 flex w-1/2 justify-end">
                {topRight}
              </div>
            </div>
          ) : null}

          <div className="flex w-full justify-between overflow-hidden">
            <div className="mr-4 h-[68px] w-[68px] shrink-0 overflow-hidden rounded-3xl border border-solid border-opacity-silver border-opacity-20 dark:border-white dark:border-opacity-10 sm:h-[92px] sm:w-[92px]">
              {!!cog?.photoUrl ? (
                typeof cog?.photoUrl === 'string' ? (
                  <img
                    src={cog?.photoUrl}
                    alt="Cog Image"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(cog?.photoUrl)}
                    alt="Cog Image"
                    className="h-full w-full object-cover"
                  />
                )
              ) : (
                <ThumbnailPlaceholder />
              )}
            </div>
            <div className="flex w-full flex-col ">
              <h3 className="py-0.5 text-sm font-bold leading-5 text-day-text-label-primary line-clamp-1 dark:text-white sm:text-base">
                {cog.name}
              </h3>
              <p className="w-full max-w-[274px] overflow-hidden text-xs leading-4 text-night-text-label-secondary line-clamp-3 dark:text-night-text md:line-clamp-4">
                {cog.description}
              </p>
            </div>
          </div>

          <div className={`flex-0 ${!topLeft || !topRight ? 'pt-6' : 'pt-12'}`}>
            <div className=" flex items-center justify-between">
              <div className="flex-0">
                <div className=" flex justify-between text-xs text-night-text-label-secondary dark:text-night-text sm:text-sm">
                  <div>{bottomLeft}</div>
                </div>
              </div>
              <div className=" flex items-center justify-between">
                <div className="group">{bottomRight}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cog
