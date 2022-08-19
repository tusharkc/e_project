import { DoctForm } from '@doct-react/app';
import { useState } from 'react';
import { addNewMembership } from '../services/AddNewMembership.service';

const initialValues = {
  membershipTitle: '',
  currency: 'INR',
  taxation: [{ value: '', label: '' }],
  fees: '',
  renewalPaymentTerms: '',
  criterias: [{ value: '' }],
  benefits: [{ name: '' }],
};

export const useMemberShipForm = () => {
  const [isSuccessFull, setIsSuccessFull] = useState();

  const { handleSubmit, control, errors, register } = DoctForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: initialValues,
  });

  let formatedBenifits = [];
  let formatedCriterias = [];
  const handleFormSubmit = handleSubmit((values) => {
    values?.benefits?.map((item) => {
      if (item.name != '') {
        formatedBenifits.push(item.name);
      }
    });

    values?.criterias?.map((item) => {
      if (item.name != '') {
        formatedCriterias.push(item.name);
      }
    });
    values.renewalPaymentTerms = values.renewalPaymentTerms.label;
    values.benefits = formatedBenifits;
    values.criterias = formatedCriterias;

    addNewMembership(values)
      .then(() => {
        setIsSuccessFull(true);
      })
      .catch(() => {
        setIsSuccessFull(false);
      });
  });

  return {
    handleFormSubmit,
    control,
    errors,
    isSuccessFull,
  };
};
