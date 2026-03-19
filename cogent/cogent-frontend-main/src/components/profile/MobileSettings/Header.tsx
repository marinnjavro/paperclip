import Icon from '@/components/shared/Icon'
import Link from 'next/link'

interface HeaderProps {}

const Header = () => {
  return (
    <div className="flex justify-between p-4">
      <h1 className="text-xl font-bold text-white">Profile</h1>
      <div className="text-day-text-label-primarytext-day-base-primary cursor-pointer cursor-pointer dark:text-night-base-secondary">
        <Icon type="settings" width={24} height={24} />
      </div>
    </div>
  )
}

export default Header
