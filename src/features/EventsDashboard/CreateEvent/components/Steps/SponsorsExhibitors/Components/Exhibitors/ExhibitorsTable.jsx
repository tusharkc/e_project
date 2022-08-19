import { DoctActionMenu } from '@doct-react/app';
import { DoctIcon, DoctTypography } from '@doct-react/core';
import React from 'react';

const options = [
  {
    title: 'Edit',
  },
  {
    title: 'Delete',
  },
];

function ExhibitorsTable({
  companyName,
  city,
  boothNumber,
  setIsModalOpen,
  additionalFun,
  deleteRecordHandler,
  index,
}) {
  return (
    <>
      <table className="d-none d-sm-block">
        <tbody>
          <tr className="border-radius bg-white my-1">
            <td>
              <DoctTypography variant="textLabel1" className="px-2 my-1 text-grey-800">
                {companyName}
              </DoctTypography>
            </td>
            <td>
              <DoctTypography variant="textLabel2" className="mx-4 my-1 text-grey-600">
                {city}
              </DoctTypography>
            </td>
            <td>
              <DoctTypography variant="textLabel2" className="mx-4 my-1 text-grey-600">
                {boothNumber}
              </DoctTypography>
            </td>
            <td className="table_width">
              <DoctActionMenu
                btnType="inverse"
                className="exhibitors_menu_more_icon mr-1 mt-sm-0"
                options={options}
                onClick={(item) => {
                  if (item.title == 'Edit') {
                    setIsModalOpen(true);
                    additionalFun();
                  }
                  if (item.title == 'Delete') {
                    deleteRecordHandler(index);
                  }
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ExhibitorsTable;
