import React, { useEffect } from 'react';
import { DoctTabWrapper, DoctTabContent } from '@doct-react/app';
import { useState } from 'react';
import usePrepareManageMembersTabList from './hooks/usePrepareTabs';
import './allMemberships.scss';
import MembershipCard from './component/MembershipCard';
import { DoctCol, DoctRow } from '@doct-react/core';
import { useMembershipsQuery } from './services/memberships.services';
import DefaultMemberShipPage from './component/DefaultMemberShipPage';

const AllMemberships = () => {
  const { data } = useMembershipsQuery();
  const [membershipData, setMembershipData] = useState([]);
  const [value, setValue] = useState(0);
  const tabOptionsArray = usePrepareManageMembersTabList();
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (data) {
      setMembershipData(data);
    }
  }, [data]);

  return (
    <div>
      <DoctTabWrapper
        value={value}
        handleChange={handleChange}
        tabOptions={tabOptionsArray}
        indicatorColor="primary"
      />
      <DoctTabContent value={value} index={0}>
        <div className="w-75 mx-auto membership_section_container">
          <DoctRow>
            {membershipData?.length == 0 ? (
              <DefaultMemberShipPage />
            ) : (
              membershipData.map((item, index) => {
                return (
                  <DoctCol key={index} sm={6}>
                    <MembershipCard
                      membershipName={item.membershipTitle}
                      membershipTitle={item.membershipTitle}
                      currency={item.currency}
                      price={item.fees}
                      membershipStatus={item.membershipStatus}
                      renewalPaymentTerms={item.renewalPaymentTerms}
                      renewalsPending={item.renewalPendingCount}
                      newRequests={item.newRequests}
                      totalMembers={item.membersCount}
                      membershipId={item.id}
                      criterias={item.criterias}
                      benifits={item.benefits}
                    />
                  </DoctCol>
                );
              })
            )}
          </DoctRow>
        </div>
      </DoctTabContent>
    </div>
  );
};

export default AllMemberships;
