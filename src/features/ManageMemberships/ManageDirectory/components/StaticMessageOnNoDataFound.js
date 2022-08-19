import React from 'react';
import NoDataFound from '../../../../shared/ui/NoDataFound';

export const StaticMessageOnNoDataFound = ({ membershipsExists }) => {
  return (
    <div>
      {membershipsExists ? (
        <NoDataFound />
      ) : (
        <p className="text-center my-3">
          You need to create a membership type first, after that you’ll be able to add new members
          and upload your existing database to our portal.
        </p>
      )}
    </div>
  );
};
