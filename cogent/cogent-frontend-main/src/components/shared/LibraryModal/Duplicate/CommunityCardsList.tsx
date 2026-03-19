import React, { useContext } from 'react';
import CommunitySearchContext from './CommunitySearchContext';
import SmallCard from '@/components/shared/SmallCard';
import Spinner from '@/components/shared/Spinner';

const CommunityCardsList = () => {
  const {
    communityCards,
    paginationMetadata,
    onPageChange,
    orderBy,
    onOrderChange,
    limit,
    onLimitChange,
    query,
    onQueryChange
  } = useContext(CommunitySearchContext);

  if (!communityCards) return <p>No cards found.</p>;

  return (
    <div>
      {/* Render pagination controls here, using onPageChange and paginationMetadata */}
      <div className="grid grid-cols-2 gap-4 xs:grid-cols-3 sm:flex sm:flex-wrap sm:gap-6">
        {communityCards.map((card) => (
          <div key={card.id} className="cursor-pointer">
            <SmallCard card={card} hoverable={false} />
          </div>
        ))}
      </div>
      {/* Render pagination controls here */}
    </div>
  );
};

export default CommunityCardsList;
