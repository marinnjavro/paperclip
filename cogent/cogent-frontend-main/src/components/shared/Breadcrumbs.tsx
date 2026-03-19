import React from 'react'

type BreadcrumbType = { label: string; path?: string }

interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbType[]
}

const Breadcrumb = ({ label, path }: BreadcrumbType) => {
  return (
    <div className="inline text-base">
      <span
        className={`${
          !!path
            ? 'cursor-pointer text-day-text-label-secondary-inverse dark:text-white dark:opacity-60'
            : 'text-black underline dark:text-white'
        } pr-2`}
      >
        {label}
      </span>
      {!!path && <span className="pr-2">/</span>}
    </div>
  )
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <div className="flex items-center">
      {breadcrumbs.map((breadcrumb: BreadcrumbType) => (
        <div key={`breadcrumb-${breadcrumb.path}`}>
          {!!breadcrumb.path ? (
            <a href={breadcrumb.path} style={{ all: 'unset' }}>
              <Breadcrumb label={breadcrumb.label} path={breadcrumb.path} />
            </a>
          ) : (
            <Breadcrumb label={breadcrumb.label} path={breadcrumb.path} />
          )}
        </div>
      ))}
    </div>
  )
}

export default Breadcrumbs
