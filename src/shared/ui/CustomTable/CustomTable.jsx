import { DoctChip, DoctLoading, DoctModal } from '@doct-react/app';
import { DoctButton, DoctIcon, DoctIconButton, DoctTypography } from '@doct-react/core';
import dayjs from 'dayjs';
import PropyTypes from 'prop-types';
import qs from 'qs';
import React, { memo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useQueryHooks from '../../../hooks/useQueryHooks';
import NoDataFound from '../NoDataFound';
import { PaginationComponent } from '../Pagination/Pagination';
import { CommonFilterEl, FilterDropdown, Search, TableHead, TableRows } from './components';
import { transformStatus } from './constants.customTable';
import './CustomTable.scss';

const getChipsTitle = (title) => {
  if (transformStatus[title]) {
    return transformStatus[title];
  }
  return title;
};

function Chips({ handleChipsRemove, title, keyName, removableIdTitle, showCloseIcon = true }) {
  return (
    <span className="mr-2 my-1">
      <DoctChip
        title={getChipsTitle(title)}
        onCloseHandler={() => {
          handleChipsRemove(removableIdTitle, keyName);
        }}
        showCloseIcon={showCloseIcon}
      />
    </span>
  );
}

function ChipsListComponent({ filterChipsObj, handleChipsRemove, transformDisplayChips }) {
  function findTitle(id, key) {
    return transformDisplayChips?.[key]?.find((el) => {
      return el.id == id;
    })?.[transformDisplayChips['valueAccessBy']];
  }

  return Object.keys(filterChipsObj).map((key) => {
    const changeDisplayName = transformDisplayChips?.[key];

    if (Array.isArray(filterChipsObj[key])) {
      return filterChipsObj[key].map((nestedItem) => {
        return (
          <Chips
            handleChipsRemove={handleChipsRemove}
            title={changeDisplayName ? findTitle(nestedItem, key) : nestedItem}
            keyName={key}
            key={nestedItem}
            removableIdTitle={nestedItem}
          />
        );
      });
    }

    return (
      <Chips
        handleChipsRemove={handleChipsRemove}
        title={changeDisplayName ? findTitle(filterChipsObj[key], key) : filterChipsObj[key]}
        // title={filterChipsObj[key]}
        keyName={key}
        key={filterChipsObj[key]}
        removableIdTitle={filterChipsObj[key]}
      />
    );
  });
}

const ChipsListing = React.memo(ChipsListComponent);

function CustomTable({
  column,
  tableRowData,
  tableCollapsible,
  tableCollapsibleData,
  contentLoading,
  searchPlaceholder = 'search',
  resultCount = 0,
  searchOptions = [],
  dropdownMenuItems = [],
  dropdownMenuDefaultSelected,
  actionMenu,
  actionButton,
  onSearchChangeHandler = () => {},
  onSearchInputChangeHandler = () => {},
  setSelectedItemId,
  setTriggredDownload,
  countHeading = 'RESULTS',
  filterData,
  onNoDataFound = <NoDataFound />,
  transformDisplayChips,
  downloadDetailComponent,
  additionalElement,
  showFilterIcon = true,
}) {
  let navigate = useNavigate();
  const query = useQueryHooks();

  const location = useLocation();
  const { pathname } = location;

  const [showFilter, setShowFilter] = useState(false);
  const [filterChipsObj, setFilterChipsObj] = useState({});

  const [filterCount, setFilterCount] = useState(0);
  useEffect(() => {
    let chipsQuery = { ...query };

    if (query.fromDate && query.toDate) {
      chipsQuery['dateRange'] = `${dayjs(query.fromDate).format('D MMMM YYYY')} to ${dayjs(
        query.toDate,
      ).format('D MMMM YYYY')}`;
    }

    delete chipsQuery.pageNumber;
    delete chipsQuery.fromDate;
    delete chipsQuery.toDate;
    delete chipsQuery.id;
    delete chipsQuery.searchText;
    delete chipsQuery.code;
    // delete chipsQuery.memberships;
    delete chipsQuery.memberId;

    setFilterChipsObj(chipsQuery);

    let number = 0;

    Object.keys(chipsQuery).forEach((el) => {
      if (el == 'searchText') return;
      if (Array.isArray(chipsQuery[el])) {
        number += chipsQuery[el].length;
      } else {
        number += 1;
      }
    });
    setFilterCount(number);
  }, [qs.stringify(query)]);

  const handleChipsRemove = (nestedItem, key) => {
    let queryForHandleChange = { ...query };

    if (Array.isArray(query[key])) {
      queryForHandleChange = {
        ...queryForHandleChange,
        // [key]: query[key].filter((el) => el != nestedItem.toLowerCase()),
        [key]: query[key].filter((el) => el != nestedItem),
      };

      navigate(`?${qs.stringify(queryForHandleChange, { indices: false })}`);
      return;
    }

    if (key == 'dateRange') {
      delete queryForHandleChange['fromDate'];
      delete queryForHandleChange['toDate'];
      navigate(`?${qs.stringify(queryForHandleChange, { indices: false })}`);
      return;
    }
    delete queryForHandleChange[key];

    navigate(`?${qs.stringify(queryForHandleChange, { indices: false })}`);
  };

  return (
    <>
      <div className="d-flex align-items-center">
        {downloadDetailComponent && downloadDetailComponent}
        <FilterDropdown
          dropdownMenuItems={dropdownMenuItems}
          dropdownMenuDefaultSelected={dropdownMenuDefaultSelected}
        />
        <span className="d-sm-none ml-auto">
          <DoctIcon width="20" height="20" name="search" className="text-grey-500" />
        </span>
        <Search searchPlaceholder={searchPlaceholder} searchOptions={searchOptions} />
        <span className="ml-3 position-relative" onClick={() => setShowFilter(true)}>
          {filterCount > 0 && (
            <span className="custom-table-result-filter-counter position-absolute d-flex align-items-center justify-content-center">
              {filterCount}
            </span>
          )}

          {showFilterIcon && (
            <DoctIconButton variant="text" type="secondary" icon="filter" size="medium" />
          )}
        </span>
      </div>
      <div className="d-flex align-items-center custom-table-result-filter-container flex-wrap mt-2 mb-2">
        <DoctTypography variant="result-counter" className="text-grey-600  d-flex-center-y mr-3">
          {resultCount} {countHeading}
        </DoctTypography>

        <ChipsListing
          filterChipsObj={filterChipsObj}
          handleChipsRemove={handleChipsRemove}
          transformDisplayChips={transformDisplayChips}
        />

        {filterCount > 1 && (
          <span
            className="cursor-pointer"
            onClick={() => {
              const cloneQuery = { ...query, pageNumber: 1 };
              Object.keys(filterChipsObj).forEach((key) => {
                delete cloneQuery[key];
              });
              delete cloneQuery.fromDate;
              delete cloneQuery.toDate;
              navigate(`${pathname}?${qs.stringify(cloneQuery)}`);
            }}
          >
            <Chips
              title={'Clear All'}
              showCloseIcon={false}
              // title={filterChipsObj[key]}
            />
          </span>
        )}
        {/* {Object.keys(filterChipsObj).map((key) => {
          if (Array.isArray(filterChipsObj[key])) {
            return filterChipsObj[key].map((nestedItem) => {
              return (
                <span className="mr-2 my-1" key={nestedItem}>
                  <DoctChip
                    title={getChipsTitle(nestedItem)}
                    onCloseHandler={() => {
                      handleChipsRemove(nestedItem, key);
                    }}
                  />
                </span>
              );
            });
          }
          return (
            <span className="mr-2 my-1" key={filterChipsObj[key]}>
              <DoctChip
                title={getChipsTitle(filterChipsObj[key])}
                onCloseHandler={() => {
                  handleChipsRemove(filterChipsObj[key], key);
                }}
              />
            </span>
          );
        })} */}
      </div>

      <TableHead column={column} />

      <div className="position-relative loader-min-height">
        {contentLoading && (
          <div className="position-absolute absolute-center">
            <DoctLoading />
          </div>
        )}

        {tableRowData && tableRowData?.length == 0 && !contentLoading && onNoDataFound}

        {tableRowData && tableRowData?.length > 0 && (
          <TableRows
            tableRowData={tableRowData}
            column={column}
            collapsibleItem={tableCollapsible}
            tableCollapsibleData={tableCollapsibleData}
            setSelectedItemId={setSelectedItemId}
            actionMenu={actionMenu}
            actionButton={actionButton}
            setTriggredDownload={setTriggredDownload}
          />
        )}
      </div>

      <PaginationComponent totalRecords={resultCount} />

      <DoctModal
        iconName={''}
        primaryBtnText="Show Results"
        open={showFilter}
        handlePrimaryButtonClick={() => {
          setShowFilter(false);
        }}
        handleClose={() => setShowFilter(false)}
        title={'Filter'}
        handleIconButtonClick={() => {}}
        width={360}
        className="disabled_modal_outside_click modal_hide_secondary_button"
      >
        {filterData ? filterData : <CommonFilterEl defaultValue={query} />}
      </DoctModal>
      {additionalElement}
    </>
  );
}

CustomTable.propTypes = {
  column: PropyTypes.object,
  tableRowData: PropyTypes.object,
  tableCollapsible: PropyTypes.any,
  searchPlaceholder: PropyTypes.any,
  resultCount: PropyTypes.any,
  searchOptions: PropyTypes.any,
  onSearchChangeHandler: PropyTypes.any,
  onSearchInputChangeHandler: PropyTypes.any,
  setSelectedItemId: PropyTypes.any,
};

TableHead.propTypes = {
  column: PropyTypes.object,
};

export default memo(CustomTable);
