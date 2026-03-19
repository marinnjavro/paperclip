// In your main component or page
import React from 'react';
import { CommunitySearchContextProvider } from './CommunitySearchContext';
import CommunityCardsList from './CommunityCardsList';

const CommunityPage = () => {
  return (
    <CommunitySearchContextProvider>
      <CommunityCardsList />
      {/* Other components that need access to the context */}
    </CommunitySearchContextProvider>
  );
};

export default CommunityPage;
