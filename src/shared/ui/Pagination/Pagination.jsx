import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import qs from 'qs';
import { forwardRef } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { PER_PAGE_TABLE } from '../../../constants/constants';
import useQueryHooks from '../../../hooks/useQueryHooks';
import './Pagination.scss';

export const PaginationComponent = ({ totalRecords = 100 }) => {
  const totalPages = Math.ceil(+totalRecords / PER_PAGE_TABLE);

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const pageNumber = searchParams.get('pageNumber');

  const query = useQueryHooks();

  return (
    <div className={'pagination-wrapper'}>
      <Pagination
        page={Number(pageNumber || 1)}
        count={totalPages}
        hidePrevButton={true}
        hideNextButton={true}
        renderItem={(item) => (
          <PaginationItem
            component={MaterialUiLink}
            pathname={location.pathname}
            query={query || {}}
            item={item}
            {...item}
          />
        )}
      />
    </div>
  );
};

const MaterialUiLink = forwardRef(({ item, pathname, query, ...props }, ref) => {
  const queryWithUpdatedPageNumber = { ...query, pageNumber: item.page };
  return (
    <Link to={`${pathname}?${qs.stringify(queryWithUpdatedPageNumber, { indices: false })}`}>
      <a {...props} ref={ref}></a>
    </Link>
  );
});

MaterialUiLink.displayName = 'MaterialUiLink';
