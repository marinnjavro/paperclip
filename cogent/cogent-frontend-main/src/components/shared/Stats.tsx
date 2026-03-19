import Icon from '@/components/shared/Icon'

interface StatsProps {}
const Stats: React.FC<StatsProps> = ({}) => {
  return (
    <div
      className="flex-0"
      onClick={(e) => {
        e.stopPropagation()
        e.nativeEvent.preventDefault()
      }}
    >
      <div className="flex justify-between text-sm text-night-text-label-secondary dark:text-night-text">
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <Icon type="heart" width={16} height={16} />
            <span className="text-xs">0</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon type="squareLink" width={16} height={16} />
            <span className="text-xs">0</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats
