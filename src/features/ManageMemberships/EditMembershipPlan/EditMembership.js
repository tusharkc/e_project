import React from 'react';
import { EditmembershipLayout } from './EditmembershipLayout';
import '../newMembership.scss';
import { useEditMembershipForm } from './components/hooks/useForm.EditMembership';
import EditMembeshipForm from './components/EditMembeshipForm';
import SuccessModal from './components/SuccessModal';
import FailureModal from './components/FailureModal';

export const Editmembership = () => {
  const { errors, control, handleFormSubmit, isSuccessFull } = useEditMembershipForm();

  return (
    <form onSubmit={handleFormSubmit}>
      <FailureModal isSuccessfull={isSuccessFull} />
      <SuccessModal isSuccess={isSuccessFull} />
      <EditmembershipLayout>
        <div className="bg-grey-100 red">
          <EditMembeshipForm control={control} errors={errors} />
        </div>
      </EditmembershipLayout>
    </form>
  );
};
