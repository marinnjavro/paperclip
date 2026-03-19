import Link from 'next/link'
import CogentLogo from '@/assets/cogent-logo.svg'

type LogoProps = {
  width?: number | string
  height?: number | string
  color?: string
}

const Logo = ({
  width = '100%',
  height = '100%',
  color
}: LogoProps): JSX.Element => {
  return (
    <CogentLogo
      className={`${
        !!color ? color : 'text-day-base-primary dark:text-white'
      } cursor-pointer `}
      width={width}
      height={height}
    />
  )
}

export default Logo
