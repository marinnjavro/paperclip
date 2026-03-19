import React from 'react'

const PageHeader = ({
  title,
  subtitle
}: {
  title: string
  subtitle: string
}) => {
  return (
    <div className="w-full py-8 text-center">
      <h1 className="pb-4 text-5xl font-bold text-day-text-label-primary dark:text-white">
        {title}
      </h1>
      <p className="text-base text-day-text-label-secondary-inverse dark:text-night-text-label-secondary-02">
        {subtitle}
      </p>
    </div>
  )
}

export default PageHeader
