import LibraryModalCogs from '@/components/shared/LibraryModal/LibraryModalCogs'
import LibraryModalCommunityCogs from '@/components/shared/LibraryModal/LibraryModalCommunityCogs'
import LibraryModalBlocks from '@/components/shared/LibraryModal/LibraryModalBlocks'
import LibraryModalCards from '@/components/shared/LibraryModal/LibraryModalCards'
import CommunityCogs from "@/components/community/CommunityCogs";
import React from "react";

interface LibrarySelectModuleProps {
  target: 'cog' | 'block' | 'card' | 'communityCog'
  onSelect: (item: any) => void
  toggleModal: () => void
}

const LibrarySelectModule: React.FC<LibrarySelectModuleProps> = ({
  target,
  onSelect,
  toggleModal
}) => {
  return (
    <div className="h-full w-full">
      {target === "cog" && (
        <LibraryModalCogs
          title="Choose cog from library"
          toggleModal={toggleModal}
          onSelect={onSelect}
        />
      )}
      {target === "communityCog" && (
        // <CommunityCogs
        //   title="Choose cog from library"
        //   toggleModal={toggleModal}
        //   onSelect={onSelect}
        // />
        <LibraryModalCommunityCogs
          title="Choose cog from library"
          toggleModal={toggleModal}
           onSelect={onSelect}
        />
  )
}
{/* {target === 'block' && (
        <LibraryModalBlocks
          title="Choose card from library"
          toggleModal={toggleModal}
          onSelect={onSelect}
        />
      )} */}
      {target === 'card' && (
        <LibraryModalCards
          title="Choose card from library"
          toggleModal={toggleModal}
          onSelect={onSelect}
        />
      )}
    </div>
  )
}

export default LibrarySelectModule
