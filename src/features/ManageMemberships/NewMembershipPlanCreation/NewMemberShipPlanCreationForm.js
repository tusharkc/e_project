import React from 'react';
import { NewMemberShipCreationLayout } from './NewMemberShipCreationLayout';
import NewMembershipform from './components/NewMembershipform';
import '../newMembership.scss';
import { useMemberShipForm } from './components/hooks/useForm.CreateMembershipFrom';
import SuccessModal from './components/SuccessModal';
import FailureModal from './components/FailureModal';

export const NewMemberShipPlanCreationForm = () => {
  const { errors, control, handleFormSubmit, isSuccessFull } = useMemberShipForm();

  return (
    <form onSubmit={handleFormSubmit}>
      <SuccessModal isSuccess={isSuccessFull} />
      <FailureModal isSuccessfull={isSuccessFull} />
      <NewMemberShipCreationLayout>
        <div className="bg-grey-100 red">
          <NewMembershipform control={control} errors={errors} />
        </div>
      </NewMemberShipCreationLayout>
    </form>
  );
};
