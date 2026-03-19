import Logo from '@/components/shared/Logo'

export const ThumbnailPlaceholder = () => (
  <div className="flex h-full items-center justify-center bg-white dark:bg-[#2f3048]">
    <div className="w-[60%] dark:opacity-30">
      <Logo color="dark:text-night-text text-day-base-05" />
    </div>
  </div>
)
