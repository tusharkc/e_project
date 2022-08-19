import { DoctActionMenu } from '@doct-react/app';
import { DoctIconButton, DoctTypography, DoctButton } from '@doct-react/core';
import dayjs from 'dayjs';
import PropyTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import useQueryHooks from '../../../../hooks/useQueryHooks';
import qs from 'qs';

function manageColumnData(el, column) {
  if (el.isDate && column[el.key] != null) {
    return dayjs(column[el.key]).format('DD MMM YYYY');
  }
  if (el.key == 'status') {
    if (column[el.key] == 'Created') {
      return 'Pending';
    } else {
      return column[el.key];
    }
  } else if (el.key == 'memberStatus') {
    if (column[el.key] == 'RenewalPending') {
      return 'Renewal Pending';
    }
  }
  return column[el.key];
}

function TableRow({
  column,
  tableColumn,
  collapsibleItem: CollapsibleItem,
  tableCollapsibleData,
  actionMenu: ActionMenu,
  actionButton: ActionButton,
  index,
  tagetedRowIndex,
  setTargetedRowIndex,
  setSelectedItemId = () => {},
  setTriggredDownload,
}) {
  const [refCollepsibleEl, setRefCollepsibleEl] = useState(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const elBoundingClientReact = refCollepsibleEl?.getBoundingClientRect();
    setTimeout(() => {
      setHeight(elBoundingClientReact?.height || 0);
    });
  }, [refCollepsibleEl, refCollepsibleEl?.current]);

  const toggleCollepsible = (index) => {
    if (index) {
      if (tagetedRowIndex == index) {
        setHeight(0);
        setTimeout(() => {
          setTargetedRowIndex(null);
        }, 300);
      }
      setTargetedRowIndex(index);
    } else {
      setHeight(0);
      setTimeout(() => {
        setTargetedRowIndex(null);
      }, 300);
    }
    return;
  };

  return (
    <div
      className={`text-grey-100 px-3 bg-white custom-tabel-row-wrapper cursor-pointer ${
        height ? 'pb-2' : ''
      }`}
      onClick={() => {
        toggleCollepsible(index);
        setSelectedItemId(column?.orderId ? column?.orderId : column?.id ? column?.id : null);
      }}
    >
      <div className="d-flex custom-tabel-row align-items-center">
        {tableColumn?.map((el) => {
          if (el.key == 'action' && tagetedRowIndex != index) {
            return (
              <span
                onClick={(e) => e.stopPropagation()}
                className="custom-tabel-row-action-menu-column d-inline-flex justify-content-end"
              >
                {ActionMenu && (
                  <ActionMenu
                    column={column}
                    index={index}
                    setTargetedRowIndex={setTargetedRowIndex}
                  />
                )}
              </span>
            );
          }
          return (
            <DoctTypography
              key={el.title}
              variant="textLabel2"
              className={`text-grey-800 custom-tabel-row-el px-2 my-0 ${
                el.key?.toLowerCase() || ''
              } ${
                el.key == 'status'
                  ? column[el.key] == 'Created'
                    ? 'pending font-weight-medium'
                    : column[el.key]?.toLowerCase()
                  : ''
              } ${
                el.key == 'memberStatus'
                  ? column[el.key] == 'Active'
                    ? 'active font-weight-bold'
                    : column[el.key]?.toLowerCase()
                  : ''
              } ${
                el.key == 'memberStatus'
                  ? column[el.key] == 'Draft'
                    ? 'draft font-weight-bold'
                    : column[el.key]?.toLowerCase()
                  : ''
              } ${
                el.key == 'memberStatus'
                  ? column[el.key] == 'Inactive'
                    ? 'inactive'
                    : column[el.key]?.toLowerCase()
                  : ''
              } ${
                el.key == 'memberStatus'
                  ? column[el.key] == 'Renewal Pending'
                    ? 'renewalpending'
                    : column[el.key]?.toLowerCase()
                  : ''
              }`}
            >
              {el.currency && `${column['currency'] || ''} `}
              {el.keySelector && el.keySelector(column)}
              {manageColumnData(el, column)}
            </DoctTypography>
          );
        })}
      </div>
      <div
        style={{ height: `${height}px`, transition: 'all 300ms ease', overflow: 'hidden' }}
        className="mx-n2"
      >
        {tagetedRowIndex == index && (
          <div
            ref={(el) => setRefCollepsibleEl(el)}
            className={`${
              tagetedRowIndex == index ? 'pt-4' : 'pt-0'
            } px-4 border-radius custom-table-collapsible-bg custom-table-with-action-footer
            position-relative`}
          >
            {CollapsibleItem && (
              <CollapsibleItem column={column} tableCollapsibleData={tableCollapsibleData} />
            )}
            {ActionButton && <ActionButton column={column} />}
            <span
              className="custom-tabel-collapse-btn position-absolute d-inline-flex"
              onClick={(e) => {
                e.stopPropagation();
                toggleCollepsible();
              }}
            >
              <DoctIconButton variant="outline" type="secondary" icon="up" size="medium" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TableRows({
  tableRowData,
  collapsibleItem,
  column,
  setSelectedItemId,
  actionMenu,
  actionButton,
  tableCollapsibleData,
  setTriggredDownload,
  additionalHandleOnClick,
}) {
  const query = useQueryHooks();

  const [tagetedRowIndex, setTargetedRowIndex] = useState(null);

  useEffect(() => {
    setTargetedRowIndex(null);
  }, [qs.stringify(query)]);

  return tableRowData.map((el, index) => {
    return (
      <TableRow
        tableColumn={column}
        column={el}
        key={index}
        index={index + 1}
        collapsibleItem={collapsibleItem}
        tableCollapsibleData={tableCollapsibleData}
        actionMenu={actionMenu}
        actionButton={actionButton}
        setSelectedItemId={setSelectedItemId}
        tagetedRowIndex={tagetedRowIndex}
        setTargetedRowIndex={setTargetedRowIndex}
        setTriggredDownload={setTriggredDownload}
      />
    );
  });
}

TableRows.propTypes = {
  column: PropyTypes.array,
  collapsibleItem: PropyTypes.any,
  tableCollapsibleData: PropyTypes.any,
  index: PropyTypes.any,
  setTargetedRowIndex: PropyTypes.any,
  tableColumn: PropyTypes.any,
  setSelectedItemId: PropyTypes.any,
};
