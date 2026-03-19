import Link from 'next/link'
import Icon from '@/components/shared/Icon'
import Logo from '@/components/shared/Logo'

const MenuHeader = () => (
  <div className="mb-8 flex min-h-[4rem] items-center border-b border-solid border-day-base-06 px-3 dark:border-white dark:border-opacity-10">
    <div className="cursor-pointer rounded-xl bg-white p-3 text-night-base-04 dark:bg-night-base-04 dark:text-white">
      <Icon type="burgerMenu" width={25} height={25} />
    </div>
    <div className="mt-1 ml-2 h-[40px] w-[80px] sm:h-[32px] sm:w-[130px]">
      <Logo />
    </div>
  </div>
)

export default MenuHeader
