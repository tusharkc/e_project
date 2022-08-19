import { DoctTextField } from '@doct-react/app';
import { DoctTypography, DoctRow, DoctCol } from '@doct-react/core';
import React from 'react';
import '../../Registration/RegistrationStyle.scss';

import OrganizerTeam from './OrganizerTeam';
import SupportedBy from './SupportedBy';
import UserLocation from '../../../../../../../shared/ui/UserLocation';

const OrganiserSection = ({
  userMember,
  setMembers,
  members,
  supporters,
  setSupporters,
  control,
  errors,
  touched,
  watch,
  setValue,
  defaultCountryValue,
  defaultStateValue,
  setCountryCode,
}) => {
  return (
    <>
      <DoctRow>
        <DoctCol sm={10}>
          <DoctTypography variant="h6" className="text-grey-800">
            Organizer
          </DoctTypography>
          <DoctTextField
            className="mt-2 mb-2"
            name="Name"
            label="Organizer Name"
            id="Name"
            control={control}
            isErrors={errors}
            defaultValue=""
            validationRules={{
              required: "It's Required Field",
            }}
            touched={touched}
            showStar={false}
          />
          <UserLocation
            control={control}
            errors={errors}
            watch={watch}
            setValue={setValue}
            touched={touched}
            countryName="OrganizerCountry"
            stateName="OrganizerState"
            cityName="OrganizerCity"
            defaultCountryVal={defaultCountryValue}
            defaultStateVal={defaultStateValue}
            setCountryCode={setCountryCode}
          />
          <DoctTextField
            className="mt-2 mb-2"
            name="OrganizerPinCode"
            label="Pin Code"
            id="OrganizerPinCode"
            control={control}
            isErrors={errors}
            defaultValue=""
            validationRules={{
              required: "It's Required Field",
              maxLength: {
                value: 6,
                message: 'Max 6 Characters',
              },
              pattern: {
                value: /^(\+\d{0,9}[- ]?)?\d{6}$/,
                message: 'Invalid Characters',
              },
            }}
            touched={touched}
            showStar={false}
          />
          <OrganizerTeam userMember={userMember} setMembers={setMembers} members={members} />
          <SupportedBy setSupporters={setSupporters} supporters={supporters} />
        </DoctCol>
      </DoctRow>
    </>
  );
};

export default OrganiserSection;
