import { forwardRef, LegacyRef } from 'react'
import Link from 'next/link'

interface CustomLinkProps {
  href: string
  children: JSX.Element
}

const CustomLink = (
  props: CustomLinkProps,
  ref: LegacyRef<HTMLAnchorElement> | undefined
) => {
  let { href, children, ...rest } = props
  return (
    <Link href={href} ref={ref}>
      {children}
    </Link>
  );
}

export const MenuLink = forwardRef(CustomLink)
