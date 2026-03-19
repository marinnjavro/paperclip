import Like from '@/assets/static/images/badges/like.svg'
import Question from '@/assets/static/images/badges/question.svg'
import Time from '@/assets/static/images/badges/time.svg'
import Cog from '@/assets/static/images/badges/cog.svg'
import Cards from '@/assets/static/images/badges/cards.svg'
import Years from '@/assets/static/images/badges/years.svg'

interface ProfileBadgeProps {
  type: string
  value: string
  text: string
}

const ProfileBadge: React.FC<ProfileBadgeProps> = ({ type, value, text }) => {
  const iconTypes: { [type: string]: React.FC } = {
    like: Like,
    question: Question,
    time: Time,
    cog: Cog,
    cards: Cards,
    years: Years
  }
  let Icon = iconTypes[type]

  return (
    <div className="flex items-center gap-2">
      <div className="h-12 w-12 text-white dark:text-[#353648]">
        <Icon />
      </div>
      <div>
        <div className="ml-2 text-lg font-bold text-night-text-label-primary dark:text-white">
          {value}
        </div>
        <div className="ml-2 text-xs text-night-text-label-secondary dark:text-night-text">
          {text}
        </div>
      </div>
    </div>
  )
}

export default ProfileBadge
