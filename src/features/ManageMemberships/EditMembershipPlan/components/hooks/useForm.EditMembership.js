import { DoctForm } from '@doct-react/app';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { editMembership, getDefaultMembershipValues } from '../services/editMembership.service';

export const useEditMembershipForm = () => {
  const [isSuccessFull, setIsSuccessFull] = useState();
  useEffect(() => {
    getDefaultMembershipValues(id).then((values) => {
      let resetFormData = { ...values };

      resetFormData.renewalPaymentTerms = { label: values.renewalPaymentTerms };
      if (resetFormData.criterias) {
        resetFormData?.criterias?.map((item) => {
          initialValues.criterias.push({ name: item });
        });
      }
      resetFormData.criterias = initialValues.criterias;

      resetFormData?.benefits?.map((item) => {
        initialValues.benefits.push({ name: item });
      });

      resetFormData.benefits = initialValues.benefits;

      setTimeout(() => {
        reset(resetFormData);
      }, 100);
    });
  }, []);

  const initialValues = {
    membershipTitle: '',
    currency: '',
    taxation: [{ value: '', label: '' }],
    fees: '',
    renewalPaymentTerms: '',
    criterias: [],
    benefits: [],
  };

  function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();

  const id = query.get('id');

  const { handleSubmit, control, errors, register, reset } = DoctForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: initialValues,
  });

  let formatedBenifits = [];
  let formatedCriterias = [];

  const handleFormSubmit = handleSubmit((values) => {
    values?.benefits?.map((item) => {
      formatedBenifits.push(item.name);
    });

    values?.criterias?.map((item) => {
      formatedCriterias.push(item.name);
    });

    values.benefits = formatedBenifits;
    values.criterias = formatedCriterias;
    values.renewalPaymentTerms = values.renewalPaymentTerms.label;
    editMembership(values, id)
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
