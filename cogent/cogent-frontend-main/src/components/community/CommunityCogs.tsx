import { useContext } from 'react'
import { Cog } from 'src/__generated__/graphql'
import CommunitySearchContext from '@/components/community/store/CommunitySearchContext'
import Link from 'next/link'

import Spinner from '@/components/shared/Spinner'
import Pagination from '@/components/shared/Pagination'
import { default as CommunityCog } from '@/components/shared/Cog/index'
import CogAuthor from '@/components/shared/Cog/CogAuthor'
import Tags from '@/components/shared/Tags'
import Stats from '@/components/shared/Stats'
import SavePlay from '@/components/shared/savePlay'

interface CommunityCogsProps {
  saveCog: (id: string) => void
}

const CommunityCogs: React.FC<CommunityCogsProps> = ({ saveCog }) => {
  const { cogs, paginationMetadata, limit, onLimitChange, onPageChange } =
    useContext(CommunitySearchContext)

  const save = (cogId: string) => {
    saveCog(cogId)
  }

  return (
    <div className="h-full w-full">
      {!!cogs ? (
        cogs.length ? (
          <>
            <div className="grid grid-cols-1 gap-x-5 gap-y-6 pb-10 sm:gap-y-7 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {cogs?.map((cog: Cog) => (
                <CommunityCog
                  cog={cog}
                  topLeft={<Tags tags={cog?.tags} />}
                  topRight={<Stats />}
                  bottomLeft={
                    <CogAuthor
                      photoUrl={cog?.user?.photoUrl}
                      user={cog?.user}
                      iconPosition="left"
                    />
                  }
                  bottomRight={
                    <Link
                      href={`/cogs/${cog.id}`}
                      passHref
                      legacyBehavior
                      key={`cog-${cog.id}`}
                    >
                      <a
                        className="no-border-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SavePlay save={() => save(cog.id)} cog={cog} />
                      </a>
                    </Link>
                  }
                />
              ))}
            </div>

            <div className="flex w-full">
              <Pagination
                siblingCount={1}
                currentPage={paginationMetadata?.currentPage}
                totalPages={paginationMetadata?.totalPages}
                totalCount={paginationMetadata?.totalCount}
                pageSize={paginationMetadata?.limitValue}
                limit={limit}
                onLimitChange={(limit: number) => onLimitChange(limit)}
                onPageChange={(page: number) => onPageChange(page)}
              />
            </div>
          </>
        ) : (
          <div className="h-full w-full py-20 text-center text-sm italic opacity-50">
            No cogs found.
          </div>
        )
      ) : (
        <div className="flex h-[40vh] w-full items-center justify-center">
          <Spinner />
        </div>
      )}

      <div className="flex w-full justify-center"></div>
    </div>
  )
}

export default CommunityCogs
