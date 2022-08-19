import { BUSINESS_BILLING_FORM } from './OfflineRegistration/Steps/BillingDetails/constants.billingDetails';
import { FORM_NAME_CONTACT_INFO } from '../../../shared/ui/MobileWhatsAppForm/MobileWhatsAppForm';
import { FORM_EL_COUNTRY_CODE } from '../../../shared/ui/LocationField';
import { EventStatus } from '../../../helper/enums/eventStatus';
import { eventOrderStatus, eventOrderType } from '../../../helper/enums/eventEnums';

const CAN_EDIT_BILLING_DETAIL_MIN_VALUE = 4;

const transformManageBillingInfoToFromValue = (obj = {}) => {
  if (!obj) return {};
  return {
    ...obj,
    type: obj?.billingType,
    [BUSINESS_BILLING_FORM['Email Address'].name]: obj?.email,
    [FORM_EL_COUNTRY_CODE.Country.name]: { label: obj?.country, value: obj?.country },
    [FORM_EL_COUNTRY_CODE['State / Province'].name]: { label: obj?.state, value: obj?.state },
    [FORM_EL_COUNTRY_CODE.City.name]: { label: obj?.city, value: obj?.city },
    [FORM_NAME_CONTACT_INFO.mobileCountryCode]: { label: '+91' },
    [FORM_NAME_CONTACT_INFO.whatsappCountryCode]: { label: '+91' },
    [FORM_NAME_CONTACT_INFO.mobileNumber]: obj.contactNumber?.split(' ')[1],
    [FORM_NAME_CONTACT_INFO.whatsAppNumber]: obj.whatsAppNumber?.split(' ')[1],
    [FORM_NAME_CONTACT_INFO.mobileNumberAsWhatsApp]:
      obj.contactNumber?.split(' ')[1] == obj.whatsAppNumber?.split(' ')[1],
  };
};

const transformManageBillingInfoFormValueToApiDataBody = (obj) => {
  if (!obj) return {};
  return {
    ...obj,
    city: obj[FORM_EL_COUNTRY_CODE.City.name]?.value,
    state: obj[FORM_EL_COUNTRY_CODE['State / Province'].name]?.value,
    country: obj[FORM_EL_COUNTRY_CODE.Country.name]?.value,
    contactNo: {
      countryCode: obj[FORM_NAME_CONTACT_INFO.mobileCountryCode]?.label,
      number: obj[FORM_NAME_CONTACT_INFO.mobileNumber],
    },
    whatsAppNumber: {
      countryCode: obj[FORM_NAME_CONTACT_INFO.whatsappCountryCode]?.label,
      number: obj[FORM_NAME_CONTACT_INFO.whatsAppNumber],
    },
  };
};

function canAcessEditBillingDetails({
  editBillingAllowedType,
  eventStatus,
  status,
  registrationType,
}) {
  let indexOfPaasedValue = 0;

  if (editBillingAllowedType) {
    indexOfPaasedValue = indexOfPaasedValue + 1;
  }
  if (
    eventStatus == EventStatus.ACTIVE ||
    eventStatus == EventStatus.COMPLETED ||
    eventStatus == EventStatus.CLOSED
  ) {
    indexOfPaasedValue = indexOfPaasedValue + 1;
  }
  if (status == eventOrderStatus.confirmed.value) {
    indexOfPaasedValue = indexOfPaasedValue + 1;
  }
  if (
    registrationType == eventOrderType.offline.value ||
    registrationType == eventOrderType.online.value
  ) {
    indexOfPaasedValue = indexOfPaasedValue + 1;
  }

  return indexOfPaasedValue == CAN_EDIT_BILLING_DETAIL_MIN_VALUE;
}

export {
  transformManageBillingInfoToFromValue,
  transformManageBillingInfoFormValueToApiDataBody,
  canAcessEditBillingDetails,
};
