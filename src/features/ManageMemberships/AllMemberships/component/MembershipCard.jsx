import { DoctActionMenu } from '@doct-react/app';
import { DoctTypography, DoctButton, DoctIcon } from '@doct-react/core';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGenerateRandomColor from '../hooks/useRandomColor';
import {
  changeMembershipStatus,
  deleteMembership,
  useGetMembershipsDataQuery,
} from '../services/memberships.services.js';
import MembershipDetailModal from './MembershipDetailModal';
import qs from 'qs';

import * as ROUTE from '../../../../routes/constant';
import DeleteMembershipModal from './DeleteMembershipModal';

const option1 = [
  {
    title: 'Edit Membership',
  },
  {
    title: 'Members Directory',
  },
  {
    title: 'Inactive Membership',
  },
];

const option2 = [
  {
    title: 'Edit Membership',
  },
  {
    title: 'Members Directory',
  },
  {
    title: 'Active Membership',
  },
  {
    title: 'Delete Membership',
    className: 'text-danger',
  },
];

const MembershipCard = ({
  membershipTitle,
  currency = 'INR',
  price,
  membershipStatus,
  renewalPaymentTerms,
  renewalsPending,
  newRequests,
  totalMembers,
  membershipId,
  criterias,
  benifits,
  membershipName,
}) => {
  const { color } = useGenerateRandomColor();
  const [showModal, setShowModal] = useState();
  const { data } = useGetMembershipsDataQuery({ id: membershipId });
  const [isErrorInDeleting, setIsErrorInDeleting] = useState(false);

  const navigate = useNavigate();

  const postValues = {
    currency: currency,
    fees: price,
    membershipTitle: membershipTitle,
    renewalPaymentTerms: renewalPaymentTerms,
  };
  return (
    <>
      <MembershipDetailModal
        membershipName={membershipName}
        criteria={criterias}
        benifits={benifits}
        fees={price}
        renewalPaymentTerms={renewalPaymentTerms}
        totalMembers={totalMembers}
        openModal={showModal}
        handleCloseBtn={() => {
          setShowModal(false);
        }}
      />

      <div className="membership_card mt-3">
        <div className="px-3">
          <div className="d-flex align-items-center justify-content-between">
            <DoctTypography variant="body1" className="text-grey-800 font-weight-bold">
              {membershipTitle}
            </DoctTypography>
            <DoctTypography variant="subtitle2">
              {currency} {price}
            </DoctTypography>
          </div>
          <DoctTypography
            variant="textLabel2"
            className={`text-white ${
              `${membershipStatus.toUpperCase()}` == 'INACTIVE' ? 'bg-grey-600' : 'bg-active-green'
            }  w-25 text-center p-1`}
          >
            {membershipStatus.toUpperCase()}
          </DoctTypography>
          <div style={{ backgroundColor: `#${color}` }} className="membership_card_line w-100" />
          <div className="d-flex" style={{ borderBottom: '1px solid #E3E3E399' }}>
            <DoctTypography variant="body3" className="text-grey-600">
              Renewal Payment Terms:
            </DoctTypography>

            <DoctTypography variant="subtitle2" className="px-2">
              {renewalPaymentTerms}
            </DoctTypography>
          </div>

          <div className="d-flex" style={{ borderBottom: '1px solid #E3E3E399' }}>
            <DoctTypography variant="body3" className="text-grey-600">
              Renewal Pending:
            </DoctTypography>

            <DoctTypography variant="subtitle2" className="px-2">
              {renewalsPending}
            </DoctTypography>
          </div>

          {/* <div className="d-flex">
            <DoctTypography variant="body3" className="text-grey-600">
              New Requests:
            </DoctTypography>

            <DoctTypography variant="subtitle2" className="px-2">
              {newRequests}
            </DoctTypography>
          </div> */}

          <div className="d-flex pt-4">
            <DoctTypography variant="body3" className="text-grey-600">
              Total Members:
            </DoctTypography>

            <DoctTypography variant="body3" className="px-2 text-grey-600">
              {totalMembers}
            </DoctTypography>
          </div>

          <div className="button_container d-flex align-items-center justify-content-center position-relative">
            <DoctButton
              variant="text"
              text="View"
              onButtonClickHandler={() => {
                setShowModal(true);
              }}
            />

            <div className="position-absolute right-0">
              <DoctActionMenu
                className="membership_card_options"
                btnType="inverse"
                onClick={(item) => {
                  if (item.title == 'Delete Membership') {
                    if (totalMembers > 0) {
                      setIsErrorInDeleting(true);
                    } else {
                      deleteMembership(membershipId);
                    }
                  }

                  if (item.title == 'Inactive Membership') {
                    item.title = 'Inactive';
                    changeMembershipStatus(membershipId, item.title);
                  }

                  if (item.title == 'Active Membership') {
                    changeMembershipStatus(membershipId, item.title);
                  }

                  if (item.title == 'Edit Membership') {
                    navigate(
                      `/${ROUTE.DASHBOARD}/${ROUTE.EDIT_MEMBERSHIP}?${qs.stringify({
                        id: membershipId,
                      })}`,
                    );
                  }

                  if (item.title == 'Members Directory') {
                    navigate(
                      `/${ROUTE.DASHBOARD}/${ROUTE.MANAGE_MEMBERSHIPS}/${
                        ROUTE.MANAGE_DIRECTORY
                      }?${qs.stringify({
                        memberships: membershipId,
                      })}`,
                    );
                  }
                }}
                options={membershipStatus == 'Inactive' ? option2 : option1}
              />
            </div>
          </div>
        </div>
      </div>
      <DeleteMembershipModal
        isErrorInDeleting={isErrorInDeleting}
        handlePrimaryButtonClick={() => {
          setIsErrorInDeleting(false);
        }}
      />
    </>
  );
};

export default MembershipCard;
