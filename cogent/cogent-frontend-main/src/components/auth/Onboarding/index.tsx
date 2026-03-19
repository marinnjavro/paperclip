import React from 'react'
import _ from 'lodash'
import { useRouter } from 'next/router'
import ButtonPrimary from '@/components/shared/ButtonPrimary'
import AuthHeader from '@/components/auth/AuthHeader'
import ThemeToggle from '@/components/auth/Onboarding/ThemeToggle'
import ProfilePhotoInput from '@/components/auth/Onboarding/ProfilePhotoInput'

export default function Onboarding() {
  const router = useRouter()

  function handleFiles(files: FileList) {
    alert('Number of files: ' + files.length)
  }

  const onContinue = async () => {
    router.push('/')
  }

  return (
    <>
      <div className="sign-in mx-auto flex h-full w-full flex-col">
        <AuthHeader
          title="Welcome to Cogent"
          text={<span>You can set up your profile now or later</span>}
        />
        <div className="mt-10 flex-1  pb-20">
          {/* <ThemeToggle /> */}

          <div>
            <form
              className="space-y-6"
              autoComplete="off"
              action="#"
              method="POST"
            >
              <div className="flex w-full justify-center pt-10">
                <ProfilePhotoInput handleFiles={handleFiles} />
              </div>

              <div className="flex w-full flex-col items-center pt-5">
                <ButtonPrimary
                  label="Continue"
                  classNames="w-[40%] 2xl:w-1/3"
                  onClick={(e) => {
                    e.preventDefault()
                    onContinue()
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
