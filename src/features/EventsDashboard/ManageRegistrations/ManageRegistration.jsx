import { DoctActionMenu } from '@doct-react/app';
import { DoctButton } from '@doct-react/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { transformMenuItems } from '../../../helper/helperFunction';
import useQueryHooks from '../../../hooks/useQueryHooks';
import CustomTable from '../../../shared/ui/CustomTable/CustomTable';
import { useGetAllEventsQuery } from '../ManageEvents/services/events.services';
import RegistrationCollapsible from './components/RegistrationCollapsible';

import {
  fetchDownloadUrl,
  resetNotifyUserWithToaster,
  selectDownloadInvoiceLoading,
  selectDownloadUrl,
  selectIsLoadingSendConfirmationEmail,
  selectNotifyUserWithToaster,
  setSelectedEventsIdCode,
} from './manageRegistration.slice';

import {
  postSendConfirmationEmail,
  useGetRegistrationsOrderDetailsQuery,
  useGetRegistrationsQuery,
} from './manageRegistration.services';

import { registrationTableColumn } from './tableColumn.manageRegistrations';
import { eventOrderType } from '../../../helper/enums/eventEnums';
import { Tost } from '../../../shared';
import { ModalManageBillingDetails } from './ManageBillingDetails';
import { FormEditBillingDetails, useManageBillingDetails } from './ManageBillingDetails/Form';
import {
  canAcessEditBillingDetails,
  transformManageBillingInfoToFromValue,
} from './helperFunction.ManageRegistration';
import { useHookEventStatus, useTosterEffect } from './useHookManageRegistration';

const options = [
  {
    title: 'View Order',
  },
  {
    title: 'Download Invoice',
  },
];

export default function Registration() {
  const dispatch = useDispatch();

  const { id, code, ...query } = useQueryHooks(); // reading code from query
  const [initiallySelectedEvents, setInitiallySelectedEvents] = useState([]);

  const { data: allEventsData, isLoading: isAllEventsDataLoading } = useGetAllEventsQuery();
  const { events = [] } = allEventsData || {};

  const dropdownMenuItemsArray = transformMenuItems(events, 'code', 'name', 'id') || [];

  useEffect(() => {
    setInitiallySelectedEvents(dropdownMenuItemsArray[0]);
  }, [events?.length]);

  const [isPartneredEvent, setIsPartneredEvent] = useState(false);

  useEffect(() => {
    dispatch(
      setSelectedEventsIdCode({
        id: id || dropdownMenuItemsArray[0]?.id,
        code: code || dropdownMenuItemsArray[0]?.code,
      }),
    );

    if (events?.length && (id || dropdownMenuItemsArray[0]?.id)) {
      const findEventById = events.find(
        ({ id: eventId }) => eventId == (id || dropdownMenuItemsArray[0]?.id),
      );

      const { isPartneredEvent: isPartneredEventResponse } = findEventById || {};
      setIsPartneredEvent(isPartneredEventResponse);
    }
  }, [id, dropdownMenuItemsArray[0]?.id]);

  const { data: registrationData, isLoading: isRegistrationDataLoading } = useGetRegistrationsQuery(
    { id: id || initiallySelectedEvents?.id, query },
    { skip: !initiallySelectedEvents?.id },
  );
  const { eventRegistrations, totalRecords, editBillingAllowedType } = registrationData || {};

  const dropdownMenuDefaultSelected =
    dropdownMenuItemsArray.find((el) => el.value == id) || initiallySelectedEvents;

  const [selectedItemId, setSelectedItemId] = useState(''); // selected orderId of table row

  const { data: orderDetailsData } = useGetRegistrationsOrderDetailsQuery(
    { id: id || initiallySelectedEvents?.id, orderId: selectedItemId },
    {
      skip: !selectedItemId,
    },
  );

  const [triggredDownload, setTriggredDownload] = useState(null);

  const downloadInvoiceLoading = useSelector(selectDownloadInvoiceLoading);
  const downloadurl = useSelector(selectDownloadUrl);
  const notifyUserWithToaster = useSelector(selectNotifyUserWithToaster);
  const isLoadingSendConfirmationEmail = useSelector(selectIsLoadingSendConfirmationEmail);

  useEffect(() => {
    if (notifyUserWithToaster) {
      setTimeout(() => {
        dispatch(resetNotifyUserWithToaster());
      }, 3000);
    }
  }, [notifyUserWithToaster]);

  useEffect(() => {
    if (downloadInvoiceLoading) return;
    if (!downloadurl) return;
    if (!triggredDownload) return;
    window.open(downloadurl);
    setTriggredDownload(null);
  }, [downloadInvoiceLoading]);

  useEffect(() => {
    if (!triggredDownload) return;
    dispatch(
      fetchDownloadUrl({ id: id || initiallySelectedEvents?.id, orderNumber: triggredDownload }),
    );
  }, [triggredDownload]);

  const { status: eventStatus } = useHookEventStatus({
    id: id || dropdownMenuItemsArray[0]?.id,
  });

  const ActionMenu = ({ column, setTargetedRowIndex, index }) => {
    const { status, registrationType, billingInformation } = column || {};
    const { registrationType: userRegistrationType } = orderDetailsData || {};

    const [menuOptions, setMenuOptions] = useState(options);

    useEffect(() => {
      let newMenuOption = [...menuOptions];
      if (status == 'Confirmed' && isPartneredEvent && registrationType != 'Complementary') {
        newMenuOption.push({
          title: 'Send Confirmation Email',
          className: isLoadingSendConfirmationEmail ? 'disable-with-low-opacity' : '',
        });
      }
      if (
        status != 'Confirmed' ||
        registrationType == 'Complementary' ||
        userRegistrationType == 'Free'
      ) {
        newMenuOption = newMenuOption.filter((el) => {
          return el.title != 'Download Invoice';
        });
      }

      if (
        canAcessEditBillingDetails({
          editBillingAllowedType,
          eventStatus,
          userRegistrationType,
          status,
          registrationType,
        })
      ) {
        newMenuOption.push({
          title: 'Edit Billing details',
          className: isLoadingSendConfirmationEmail ? 'disable-with-low-opacity' : '',
        });
      }

      setMenuOptions(newMenuOption);
    }, [status, userRegistrationType, registrationType]);

    return (
      <DoctActionMenu
        btnType="inverse"
        options={menuOptions}
        onClick={(item) => {
          if (item.title == 'View Order') {
            setSelectedItemId(column?.orderId);
            setTargetedRowIndex(index);
          }
          if (item.title == 'Download Invoice') {
            setSelectedItemId(column?.orderId);
            setTriggredDownload(column?.orderId);
          }
          if (item.title == 'Send Confirmation Email') {
            dispatch(
              postSendConfirmationEmail({
                id: id || dropdownMenuItemsArray[0]?.id,
                body: [column?.orderId],
              }),
            );
          }
          if (item.title == 'Edit Billing details') {
            handleOpenEditBillingDetails(billingInformation);
          }
        }}
        className="custom-tabel-row-action-menu"
        paperProps={{
          style: {
            width: '200px',
          },
        }}
      />
    );
  };

  const [editBillingDetailObj, setEditBillingDetailObj] = useState(null);

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
  } = useManageBillingDetails(editBillingDetailObj, setEditBillingDetailObj);

  useTosterEffect({
    isError,
    isSuccess,
    isUpdating,
    onSucess: () => setEditBillingDetailObj(false),
  });

  const handleOpenEditBillingDetails = (data) => {
    reset({});
    setEditBillingDetailObj(data);
    setTimeout(() => reset(transformManageBillingInfoToFromValue(data)), 300);
  };

  const editBillingDetailsFormSubmit = (isSaved) => {
    if (isSaved)
      handleFormSubmit({ ...editBillingDetailObj, eventId: id || initiallySelectedEvents?.id });
    else {
      setEditBillingDetailObj(null);
    }
  };

  const ActionButton = ({ column }) => {
    const { status, registrationType, billingInformation } = column || {};
    const { registrationType: userRegistrationType } = orderDetailsData || {};

    const manageButton = {
      showDownloadInvoice:
        status == 'Confirmed' &&
        !!(
          registrationType == eventOrderType['online'].value ||
          registrationType == eventOrderType['offline'].value
        ) &&
        userRegistrationType != 'Free',
      showSendConfirmationEmail:
        isPartneredEvent &&
        status == 'Confirmed' &&
        !!(
          registrationType == eventOrderType['online'].value ||
          registrationType == eventOrderType['offline'].value
        ),
      showEditBillingDetails: canAcessEditBillingDetails({
        editBillingAllowedType,
        eventStatus,
        userRegistrationType,
        status,
        registrationType,
      }),
    };

    return (
      <div className="position-absolute custom-tabel-collapse-btn-action-one d-flex">
        {manageButton.showDownloadInvoice && (
          <DoctButton
            variant="outline"
            size="medium"
            type="secondary"
            text="Invoice"
            icon="downloadOne"
            onButtonClickHandler={(e) => {
              e.stopPropagation();
              setTriggredDownload(column?.orderId);
            }}
          />
        )}
        {manageButton.showSendConfirmationEmail && (
          <DoctButton
            className={manageButton.showDownloadInvoice ? 'ml-2' : ''}
            variant="outline"
            size="medium"
            type="secondary"
            text="Send Confirmation Email"
            icon="emailOutline"
            disabled={isLoadingSendConfirmationEmail || isRegistrationDataLoading}
            onButtonClickHandler={(e) => {
              e.stopPropagation();
              dispatch(
                postSendConfirmationEmail({
                  id: id || dropdownMenuItemsArray[0]?.id,
                  body: [column?.orderId],
                }),
              );
            }}
          />
        )}

        {manageButton.showEditBillingDetails && (
          <DoctButton
            className={manageButton.showDownloadInvoice ? 'ml-2' : ''}
            variant="outline"
            size="medium"
            type="secondary"
            text="Edit Billing details"
            disabled={isRegistrationDataLoading}
            onButtonClickHandler={(e) => {
              e.stopPropagation();
              handleOpenEditBillingDetails(billingInformation);
            }}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <CustomTable
        column={registrationTableColumn}
        tableRowData={eventRegistrations}
        tableCollapsible={RegistrationCollapsible}
        tableCollapsibleData={orderDetailsData || {}}
        dropdownMenuItems={dropdownMenuItemsArray}
        dropdownMenuDefaultSelected={dropdownMenuDefaultSelected?.value}
        actionMenu={ActionMenu}
        actionButton={ActionButton}
        contentLoading={isRegistrationDataLoading || isAllEventsDataLoading}
        searchPlaceholder={'Billing Name, Order ID'}
        resultCount={totalRecords}
        setSelectedItemId={setSelectedItemId}
        setTriggredDownload={setTriggredDownload}
        additionalElement={
          <ModalManageBillingDetails
            isOpen={editBillingDetailObj}
            setIsOpen={editBillingDetailsFormSubmit}
            isLoading={isUpdating}
          >
            <FormEditBillingDetails
              control={control}
              errors={errors}
              touched={touched}
              setValue={setValue}
              watch={watch}
              clearErrors={clearErrors}
              defaultValue={editBillingDetailObj}
            />
          </ModalManageBillingDetails>
        }
      />
      {notifyUserWithToaster && (
        <div className="position-fixed tost-container">
          <Tost
            variant={notifyUserWithToaster.variant}
            text={notifyUserWithToaster.message}
            onPressedClose={() => dispatch(resetNotifyUserWithToaster())}
          />
        </div>
      )}
    </>
  );
}
