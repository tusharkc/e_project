import { useEffect, useState } from 'react';
import PropyTypes from 'prop-types';

import { DoctActionMenu } from '@doct-react/app';
import { DoctButton, DoctTypography } from '@doct-react/core';

import CustomTable from '../../../shared/ui/CustomTable/CustomTable';
import { useGetAllEventsQuery } from '../ManageEvents/services/events.services';
import { useGetAttendeesQuery } from './services/manageAttendess.services';

import { manageAttendeesTableColumn } from './tableColumn.manageAttendees';

import { useManageAttendeeForm } from './Form/useManageAttendeeForm';
import FormManageAttendees from './Form/Form.ManageAttendee';
import { filedManageAttendee } from './Form/field.ManageAttendee';

import ModalManageAttendees from './ModalManageAttendees';
import TostManageAttendee from './Tost.ManageAttendee';

import { transformMenuItems } from '../../../helper/helperFunction';
import useQueryHooks from '../../../hooks/useQueryHooks';

const options = [
  {
    title: 'View More Info',
  },
  {
    title: 'Edit Details',
  },
];

function prepareFormValue(values = {}) {
  return {
    ...values,
    mobileCountryCode: {
      label: '+91',
    },
    whatsappCountryCode: {
      label: '+91',
    },
    [filedManageAttendee.country.name]: {
      label: values.country,
      value: values.country,
    },
    [filedManageAttendee.state.name]: {
      label: values.state,
      value: values.state,
    },
    [filedManageAttendee.city.name]: {
      label: values.city,
      value: values.city,
    },
    mobileNumber: values.phoneNo?.split(' ')[1],
    whatsAppNumber: values.whatsAppNumber?.split(' ')[1],
    mobileNumberAsWhatsApp:
      values.phoneNo?.split('+')[1].replace(' ', '') ==
      values.whatsAppNumber?.split('+')[1].replace(' ', ''),
  };
}

const ManageAttendessCollapsible = ({ column }) => {
  const {
    name,
    gender,
    city,
    state,
    country,
    orderNumber,
    currency,
    payment,
    phoneNo,
    whatsAppNumber,
    email,
  } = column;

  return (
    <>
      <div className="d-flex">
        <p className="my-0 container-3xx">
          <DoctTypography variant="subtitle2" className="text-grey-800 mt-0 mb-2">
            Attendee Info
          </DoctTypography>
          <DoctTypography variant="textLabel2" className="text-grey-800 my-1">
            Full name: {name}
          </DoctTypography>
          <DoctTypography variant="textLabel2" className="text-grey-800 my-1">
            Gender: {gender}
          </DoctTypography>
          <DoctTypography variant="textLabel2" className="text-grey-800 my-1">
            Location: {city} {state && `, ${state}`} {country && `, ${country}`}.
          </DoctTypography>
        </p>
        <p className="my-0 ml-auto container-3xx">
          <DoctTypography variant="subtitle2" className="text-grey-800 mt-0 mb-2">
            Order Info
          </DoctTypography>
          <DoctTypography
            variant="textLabel2"
            className="text-grey-600 my-2 d-flex justify-content-between"
          >
            ORDER ID <span>{orderNumber}</span>
          </DoctTypography>
          <DoctTypography
            variant="textLabel2"
            className="text-grey-600 my-2 d-flex justify-content-between"
          >
            PAYMENT
            <span>
              {currency} {payment}
            </span>
          </DoctTypography>
        </p>
      </div>
      <div className="d-flex mt-4">
        <p className="my-0 container-3xx">
          <DoctTypography variant="subtitle2" className="text-grey-800 mt-0 mb-2">
            Contact Info
          </DoctTypography>
          <DoctTypography variant="textLabel2" className="text-grey-800 my-1">
            {phoneNo && `Mobile: ${phoneNo}`}
          </DoctTypography>
          <DoctTypography variant="textLabel2" className="text-grey-800 my-1">
            {whatsAppNumber && `Whatsapp: ${whatsAppNumber}`}
          </DoctTypography>
          <DoctTypography variant="textLabel2" className="text-grey-800 my-1">
            {email && `Email: ${email}`}
          </DoctTypography>
        </p>
      </div>
    </>
  );
};

export default function ManageAttendees() {
  const { id, ...query } = useQueryHooks(); // reading code from query
  const [initiallySelectedEvents, setInitiallySelectedEvents] = useState([]);

  const { data: allEventsData, isLoading: isAllEventsDataLoading } = useGetAllEventsQuery();
  const { events = [] } = allEventsData || {};

  const dropdownMenuItemsArray = transformMenuItems(events, 'code', 'name', 'id') || [];

  useEffect(() => {
    setInitiallySelectedEvents(dropdownMenuItemsArray[0]);
  }, [events?.length]);

  const { data: attendessData, isLoading: isRegistrationDataLoading } = useGetAttendeesQuery(
    { id: id || initiallySelectedEvents?.id, query },
    { skip: !initiallySelectedEvents?.id },
  );
  const { eventAttendees, totalRecords, editAttendeeAllowedType } = attendessData || {};

  const dropdownMenuDefaultSelected =
    dropdownMenuItemsArray.find((el) => el.value == id) || initiallySelectedEvents;

  const ActionMenu = ({ column, setTargetedRowIndex, index }) => {
    return (
      <DoctActionMenu
        btnType="inverse"
        options={options}
        onClick={(item) => {
          if (item.title == 'View More Info') {
            setTargetedRowIndex(index);
          } else if (item.title == 'Edit Details') {
            setAttendeeObj(prepareFormValue(column));
            reset(prepareFormValue(column));
          }
        }}
        className="custom-tabel-row-action-menu"
      />
    );
  };

  const [attendeeObj, setAttendeeObj] = useState(null);

  const {
    control,
    errors,
    touched,
    setValue,
    watch,
    reset,
    clearErrors,
    handleFormSubmit,
    isUpdating,
    isError,
    isSuccess,
  } = useManageAttendeeForm(attendeeObj, setAttendeeObj);

  const ActionButton = ({ column }) => {
    if (!editAttendeeAllowedType) return;
    return (
      <div className="position-absolute custom-tabel-collapse-btn-action-one">
        <DoctButton
          variant="outline"
          size="medium"
          type="semantic-info"
          text="Edit Details"
          onButtonClickHandler={(e) => {
            e.stopPropagation();
            setAttendeeObj(prepareFormValue(column));
            reset(prepareFormValue(column));
          }}
          className={'mr-2'}
        />
      </div>
    );
  };

  const attendeeUpdateHandler = (isSaved) => {
    if (isSaved) handleFormSubmit({ ...attendeeObj, eventId: id || initiallySelectedEvents?.id });
    else {
      setAttendeeObj(null);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setAttendeeObj(null);
    }
  }, [isSuccess]);

  return (
    <div className="manage-attendees">
      <CustomTable
        column={manageAttendeesTableColumn}
        tableRowData={eventAttendees}
        tableCollapsible={ManageAttendessCollapsible}
        dropdownMenuItems={dropdownMenuItemsArray}
        dropdownMenuDefaultSelected={dropdownMenuDefaultSelected?.value}
        searchPlaceholder={'Attendee name, mobile, email'}
        resultCount={totalRecords}
        actionMenu={ActionMenu}
        actionButton={ActionButton}
        contentLoading={isRegistrationDataLoading || isAllEventsDataLoading || isUpdating}
        searchOptions={[]}
        onSearchChangeHandler={() => {}}
        onSearchInputChangeHandler={() => {}}
        additionalElement={
          <ModalManageAttendees
            isOpen={!!attendeeObj}
            setIsOpen={attendeeUpdateHandler}
            isLoading={isUpdating}
          >
            <FormManageAttendees
              control={control}
              errors={errors}
              touched={touched}
              setValue={setValue}
              watch={watch}
              clearErrors={clearErrors}
              defaultValue={attendeeObj}
            />
          </ModalManageAttendees>
        }
      />
      <TostManageAttendee isError={isError} isSuccess={isSuccess} />
    </div>
  );
}

ManageAttendessCollapsible.propTypes = {
  column: PropyTypes.object,
};
