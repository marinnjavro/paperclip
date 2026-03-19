import React, { useContext } from 'react';
import LibraryModalCards from '@/components/shared/LibraryModal/LibraryModalCards';
import LibraryModalCardsSearchContext from '@/components/shared/LibraryModal/state/LibraryModalCardsSearchContext';

const CardsTab = () => {
  const { cards } = useContext(LibraryModalCardsSearchContext);

  return (
    <div>
      <LibraryModalCards
        title="Your Cards"
        toggleModal={() => {}}
        onSelect={(card) => {
          // Handle card selection
        }}
      />
    </div>
  );
};

export default CardsTab;
