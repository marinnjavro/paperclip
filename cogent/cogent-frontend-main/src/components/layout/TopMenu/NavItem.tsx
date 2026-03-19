import { forwardRef, LegacyRef } from 'react'
import { useRouter } from 'next/router'
import Icon from '@/components/shared/Icon'
import { MenuLink } from '@/components/layout/TopMenu/MenuLink'

interface NavItemProps {
  label: string
  icon: string
  href: string
}

const Item = (
  props: NavItemProps,
  ref: LegacyRef<HTMLAnchorElement> | undefined
) => {
  const router = useRouter()
  const { asPath } = router
  const active = asPath === props.href

  return (
    <MenuLink href={props.href}>
      <div
        className={`${
          active
            ? 'text-black dark:text-white'
            : 'text-night-text hover:text-day-text-label-primary dark:text-night-text-label-secondary dark:hover:text-white'
        } group mx-3 flex cursor-pointer items-center gap-4 rounded-2xl px-3 py-3 text-lg hover:bg-day-base-04 dark:hover:bg-night-base-04`}
      >
        <Icon
          type={props.icon}
          className={`${
            active
              ? 'text-night-base-primary dark:text-night-base-secondary'
              : 'text-night-text group-hover:text-day-text-label-primary dark:text-day-base-05 dark:group-hover:text-white'
          }`}
        />
        {props.label}
      </div>
    </MenuLink>
  )
}

export const NavItem = forwardRef(Item)
