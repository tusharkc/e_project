import { DoctAutoComplete, DoctCheckbox } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import React, { useEffect, useState } from 'react';
import qs from 'qs';
import useQueryHooks from '../../../../../hooks/useQueryHooks';

const ManageMembershipDropdown = ({
  dropDownOptions,
  control,
  error,
  defaultValues,
  watch,
  filterObj,
  setFilterObj,
  defaultValue,
}) => {
  const [memberships, setMemberships] = useState([]);
  const [membershipNames, setMembershipNames] = useState([]);
  const [userSearchedMembership, setUserSearchedMembership] = useState();

  const watchSearchMembershipOptions = watch('searchMembershipOptions');

  const searchOptions = [];
  dropDownOptions?.map((option) => {
    searchOptions.push({ label: option.value });
  });

  useEffect(() => {
    if (watchSearchMembershipOptions) {
      const membershipSearchedByUser = dropDownOptions?.find((memberships) => {
        return watchSearchMembershipOptions.label == memberships.value;
      });
      setUserSearchedMembership(membershipSearchedByUser);
    }
  }, [watchSearchMembershipOptions]);

  return (
    <div>
      <DoctTypography variant="subtitle2" className="mt-4 form-heading-mb">
        Memberships
      </DoctTypography>

      {dropDownOptions?.length > 5 && (
        <DoctAutoComplete
          name={'searchMembershipOptions'}
          label={'Search'}
          id={'search'}
          control={control}
          isErrors={error}
          className={'filter_search_input'}
          options={searchOptions}
          onEndScroll={() => null}
          onClearInput={() => {
            setUserSearchedMembership();
          }}
        />
      )}

      {userSearchedMembership ? (
        <>
          <DoctCheckbox
            onChange={(e) => {
              let obj = { ...filterObj };
              if (e.target.checked) {
                obj.memberships = [...obj.memberships, e.target.id];
                // obj.membershipNames = [...obj.membershipNames, e.target.value];
                setMembershipNames((prevState) => [...prevState, userSearchedMembership.value]);
                setMemberships((prevState) => [...prevState, userSearchedMembership.id]);
              } else {
                obj.memberships = obj.memberships.filter((id) => {
                  return id != e.target.id;
                });

                obj.membershipNames = obj.membershipNames.filter((value) => {
                  return value != e.target.value;
                });

                setMembershipNames(
                  membershipNames.filter((item) => item != userSearchedMembership.value),
                );
                setMemberships(membershipNames.filter((item) => item != userSearchedMembership.id));
              }
              setFilterObj(obj);
            }}
            dataValue={userSearchedMembership}
            name={`${userSearchedMembership.value}`}
            label={`${userSearchedMembership.value}`}
            id={`${userSearchedMembership.value}`}
            checkboxProps={{ value: userSearchedMembership.value, id: userSearchedMembership.id }}
            control={control}
            isErrors={error}
            validationRules={{}}
            className="d-block"
            isChecked={defaultValue?.['memberships']?.find((val) => {
              return val == userSearchedMembership.id;
            })}
          />
        </>
      ) : (
        dropDownOptions?.map((membershipsFromApi, index) => (
          <>
            <DoctCheckbox
              onChange={(e) => {
                let obj = { ...filterObj };
                if (e.target.checked) {
                  obj.memberships = [...obj.memberships, e.target.id];
                  // obj.membershipNames = [...obj.membershipNames, e.target.value];
                  setMemberships((prevState) => [...prevState, membershipsFromApi.id]);
                  setMembershipNames((prevState) => [...prevState, membershipsFromApi.value]);
                } else {
                  obj.memberships = obj.memberships.filter((id) => {
                    return id != e.target.id;
                  });

                  obj.membershipNames = obj.membershipNames.filter((value) => {
                    return value != e.target.value;
                  });

                  setMemberships(memberships.filter((item) => item != membershipsFromApi.id));
                  setMembershipNames(
                    membershipNames.filter((item) => item != membershipsFromApi.value),
                  );
                }
                setFilterObj(obj);
              }}
              key={index}
              dataValue={membershipsFromApi}
              name={`${membershipsFromApi.value}`}
              label={`${membershipsFromApi.value}`}
              id={`${membershipsFromApi.value}`}
              checkboxProps={{ value: membershipsFromApi.value, id: membershipsFromApi.id }}
              control={control}
              isErrors={error}
              validationRules={{}}
              className="d-block"
              isChecked={defaultValue?.['memberships']?.find((val) => {
                return val == membershipsFromApi.id;
              })}
            />
          </>
        ))
      )}
    </div>
  );
};

export default ManageMembershipDropdown;
