import { DoctForm } from '@doct-react/app';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEventById,
  saveApiData,
  savePaymentAndInvoice,
  selectCreateEventResponse,
  selectCurrentStep,
  selectLoading,
  selectPaymentAndInvoice,
  selectResponseData,
  selectSaveAsDraftClicked,
  setCurrentStep,
  setDefaultState,
  setStepsFormData,
} from '../../../createEvent.slice';
import stepsName from '../stepsName';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { updateCreateEvent } from '../../../services/CreateEventServices';

const defaultValue = {
  ['payoutCountry']: {
    label: 'India',
    value: 'India',
  },
  ['currency']: {
    label: 'INR',
    value: 'INR',
  },
};

const formNameWithDefaultProps = (control, errors) => {
  return {
    payoutCountry: {
      name: 'payoutCountry',
      label: 'Payout Country',
      id: 'payoutCountry',
      control,
      errors,
      isErrors: errors,
    },
    currency: {
      name: 'currency',
      label: 'Currency',
      id: 'currency',
      control,
      errors,
      isErrors: errors,
    },
    bankName: {
      name: 'bankName',
      label: 'Bank name',
      id: 'bankName',
      control,
      errors,
      isErrors: errors,
    },
    accountHolderName: {
      name: 'accountHolderName',
      label: 'Account holder name',
      id: 'accountHolderName',
      control,
      errors,
      isErrors: errors,
    },
    accountNumber: {
      name: 'accountNumber',
      label: 'Account number',
      id: 'accountNumber',
      control,
      errors,
      isErrors: errors,
    },
    accountType: {
      name: 'accountType',
      label: 'Select account type',
      id: 'accountType',
      control,
      errors,
      isErrors: errors,
    },
    ifscCode: {
      name: 'ifscCode',
      label: 'IFSC code',
      id: 'ifscCode',
      control,
      errors,
      isErrors: errors,
    },
    branchName: {
      name: 'branchName',
      label: 'Branch name (optional)',
      id: 'branchName',
      control,
      errors,
      isErrors: errors,
    },
    gstIn: {
      name: 'gstIn',
      label: 'GSTIN',
      id: 'gstIn',
      control,
      errors,
      isErrors: errors,
    },
    registeredCompanyName: {
      name: 'registrationName',
      label: 'Registered name, Company/ Organizer',
      id: 'registrationName',
      control,
      errors,
      isErrors: errors,
    },
    registeredCompanyAddress: {
      name: 'RegistrationCompanyAddress',
      label: 'Registered company address',
      id: 'registeredCompanyAddress',
      control,
      errors,
      isErrors: errors,
    },
    contactNumber: {
      name: 'contactNumber',
      label: 'Contact number',
      id: 'contactNumber',
      control,
      errors,
      isErrors: errors,
    },
    emailAddress: {
      name: 'emailAddress',
      label: 'Email address',
      id: 'emailAddress',
      control,
      errors,
      isErrors: errors,
    },
    panCardNumber: {
      name: 'panNumber',
      label: 'PAN number',
      id: 'panCardNumber',
      control,
      errors,
      isErrors: errors,
    },
  };
};

export default function useFormPaymentsInvoice() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const paymentsAndInvoice = useSelector(selectPaymentAndInvoice);
  const apiResponseData = useSelector(selectCreateEventResponse);
  const createdEventResponse = useSelector(selectResponseData);
  const loading = useSelector(selectLoading);
  const draftBtnClicked = useSelector(selectSaveAsDraftClicked);
  const navigate = useNavigate();

  const { handleSubmit, control, errors, formState, reset, touched, watch, setValue } = DoctForm({
    mode: 'onChange',
    defaultValues: {},
  });

  const [uploadRegistration, setUploadRegistration] = useState([]);
  const [uploadSignature, setUploadSignature] = useState([]);
  const [defaultStateValue, setDefaultStateValue] = useState();

  useEffect(() => {
    if (draftBtnClicked == true) {
      handleFormSubmit();
      navigate(-1);
      dispatch(setDefaultState());
    }
  }, [draftBtnClicked]);

  useEffect(() => {
    if (Object.keys(apiResponseData).length) {
      if (id == undefined) return;
      const values = { ...apiResponseData };
      if (values.paymentSettlement) {
        values['bankName'] = values.paymentSettlement?.bankName;
        values['accountNumber'] = values.paymentSettlement?.accountNumber;
        values['accountHolderName'] = values.paymentSettlement?.accountHolderName;
        values['branchName'] = values.paymentSettlement?.branchName;
        values['ifscCode'] = values.paymentSettlement?.ifscCode;
        values['accountType'] = {
          label: values.paymentSettlement?.accountType,
          value: values.paymentSettlement?.accountType,
        };
      }
      if (values.invoiceDetail) {
        values['gstIn'] = values.invoiceDetail?.gstin;
        values['panNumber'] = values.invoiceDetail?.panNumber;
        values['RegistrationCompanyAddress'] = values.invoiceDetail?.registrationCompanyAddress;
        values['emailAddress'] = values.invoiceDetail?.emailAddress;
        values['registrationName'] = values.invoiceDetail?.registrationName;
        values['contactNumber'] = values.invoiceDetail?.contactNumber;
        if (values.invoiceDetail?.state) {
          values['State'] = {
            label: values.invoiceDetail?.state,
            value: values.invoiceDetail?.state,
          };
          setDefaultStateValue(values.invoiceDetail?.state);
        }
        if (values.invoiceDetail?.city) {
          values['City'] = {
            label: values.invoiceDetail?.city,
            value: values.invoiceDetail?.city,
          };
        }
      }

      reset({ ...values, ...defaultValue });
    } else if (Object.keys(paymentsAndInvoice).length) {
      const values = { ...paymentsAndInvoice };

      if (values.Paymentsettlement?.PaymentCountry) {
        values['payoutCountry'] = {
          label: values.Paymentsettlement?.PaymentCountry,
          value: values.Paymentsettlement?.PaymentCountry,
        };
      }
      if (values.Paymentsettlement?.CurrencyMode) {
        values['currency'] = {
          label: values.Paymentsettlement?.CurrencyMode,
          value: values.Paymentsettlement?.CurrencyMode,
        };
      }
      if (values.Paymentsettlement?.CurrencyMode) {
        values['accountType'] = {
          label: values.Paymentsettlement?.AccountType,
          value: values.Paymentsettlement?.AccountType,
        };
      }
      if (values.InvoiceDetail?.State) {
        values['State'] = {
          label: values.InvoiceDetail?.State,
          value: values.InvoiceDetail?.State,
        };
        setDefaultStateValue(values.InvoiceDetail?.State);
      }
      if (values.InvoiceDetail?.City) {
        values['City'] = {
          label: values.InvoiceDetail?.City,
          value: values.InvoiceDetail?.City,
        };
      }
      if (values.InvoiceDetail) {
        values['gstIn'] = values.InvoiceDetail?.gstIn;
        values['panNumber'] = values.InvoiceDetail?.panNumber;
        values['RegistrationCompanyAddress'] = values.InvoiceDetail?.RegistrationCompanyAddress;
        values['emailAddress'] = values.InvoiceDetail?.emailAddress;
        values['registrationName'] = values.InvoiceDetail?.registrationName;
        values['contactNumber'] = values.InvoiceDetail?.contactNumber;
      }
      if (values.Paymentsettlement) {
        values['bankName'] = values.Paymentsettlement?.bankName;
        values['accountNumber'] = values.Paymentsettlement?.accountNumber;
        values['accountHolderName'] = values.Paymentsettlement?.accountHolderName;
        values['branchName'] = values.Paymentsettlement?.branchName;
        values['ifscCode'] = values.Paymentsettlement?.ifscCode;
      }
      if (values.InvoiceDetail?.GSTRegistrationUploadFile) {
        setUploadRegistration([values.InvoiceDetail?.GSTRegistrationUploadFile]);
      }
      if (values.InvoiceDetail?.SignatureFile) {
        setUploadSignature([values.InvoiceDetail?.SignatureFile]);
      }
      reset({ ...values, ...defaultValue });
    } else {
      reset(defaultValue);
    }
  }, [apiResponseData, paymentsAndInvoice]);

  useEffect(() => {
    if (id == undefined) return;
    dispatch(fetchEventById(id));
  }, [id]);

  const handleFormSubmit = handleSubmit((values) => {
    values.Paymentsettlement = {};
    values.Paymentsettlement.PaymentCountry = values.payoutCountry?.label;
    values.Paymentsettlement.CurrencyMode = values.currency?.label;
    values.Paymentsettlement.AccountType = values.accountType?.value;
    values.Paymentsettlement.bankName = values.bankName;
    values.Paymentsettlement.accountHolderName = values.accountHolderName;
    values.Paymentsettlement.accountNumber = values.accountNumber;
    values.Paymentsettlement.ifscCode = values.ifscCode;
    values.Paymentsettlement.branchName = values.branchName;

    values.InvoiceDetail = {};
    values.InvoiceDetail.gstIn = values.gstIn;
    values.InvoiceDetail.panNumber = values.panNumber;
    values.InvoiceDetail.emailAddress = values.emailAddress;
    values.InvoiceDetail.RegistrationCompanyAddress = values.RegistrationCompanyAddress;
    values.InvoiceDetail.registrationName = values.registrationName;
    values.InvoiceDetail.contactNumber = values.contactNumber;
    values.InvoiceDetail.IsGSTRegistration = true;
    values.InvoiceDetail.Country = values.payoutCountry?.label;
    values.InvoiceDetail.State = values.State?.label;
    values.InvoiceDetail.City = values.City?.label;
    values.InvoiceDetail.GSTRegistrationUploadFile = uploadRegistration[0];
    values.InvoiceDetail.SignatureFile = uploadSignature[0];
    delete values.Paymentsettlement.payoutCountry;
    delete values.Paymentsettlement.currency;
    delete values.Paymentsettlement.accountType;
    delete values.City;
    delete values.RegistrationCompanyAddress;
    delete values.State;
    delete values.accountHolderName;
    delete values.accountNumber;
    delete values.accountType;
    delete values.bankName;
    delete values.branchName;
    delete values.contactNumber;
    delete values.currency;
    delete values.emailAddress;
    delete values.gstIn;
    delete values.ifscCode;
    delete values.panNumber;
    delete values.payoutCountry;
    delete values.registrationName;
    if (createdEventResponse?.id) {
      values.Id = createdEventResponse.id;
    }
    if (id) {
      values.Id = id;
      dispatch(saveApiData({ ...values, ...apiResponseData }));
    }
    dispatch(savePaymentAndInvoice(values));
    dispatch(updateCreateEvent(values.Id)); // PUT API Call
    if (draftBtnClicked == false) {
      if (loading == false) {
        dispatch(setCurrentStep(currentStep + 1));
        dispatch(setStepsFormData({ [stepsName.paymentsAndInvoice.name]: values }));
      }
    }
  });

  return {
    formName: formNameWithDefaultProps(control, errors),
    handleFormSubmit,
    control,
    errors,
    formState,
    reset,
    touched,
    watch,
    setValue,
    setUploadRegistration,
    uploadRegistration,
    setUploadSignature,
    uploadSignature,
    defaultStateValue,
  };
}
