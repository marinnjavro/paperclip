import React from 'react'
import _ from 'lodash'
import Link from 'next/link'
import Facebook from '@/assets/icons/facebook.svg'
import Google from '@/assets/icons/google.svg'
import LinkedIn from '@/assets/icons/linkedin.svg'

const socialLinks: { [key: string]: JSX.Element } = {
  facebook: <Facebook width={18} height={18} />,
  google: <Google width={18} height={18} />,
  linkedin: <LinkedIn width={18} height={18} />
}

const SocialLogin = ({ children }: { children: JSX.Element }) => (
  <Link href="#" legacyBehavior>
    <div className="flex w-min cursor-pointer items-center justify-center rounded-xl border border-solid border-day-base-secondary border-opacity-20 px-[22px] py-3 text-night-text-label-primary hover:border-opacity-100 dark:text-white">
      {children}
    </div>
  </Link>
)

const AuthFooter = () => (
  <div className="w-full">
    <div className="flex items-center justify-center pb-8">
      <div className="h-[1px] w-full flex-1 bg-white opacity-20"></div>
      <h3 className="flex-2 px-2 text-center text-base text-night-text-label-primary dark:text-white">
        Authorization through social networks
      </h3>
      <div className="h-[1px] w-full flex-1 bg-white opacity-20"></div>
    </div>
    <div className="flex items-center justify-center  gap-x-3.5">
      {Object.keys(socialLinks).map((link, index) => (
        <SocialLogin key={`social-login-${index}`}>
          {socialLinks[link]}
        </SocialLogin>
      ))}
    </div>
  </div>
)

export default AuthFooter
