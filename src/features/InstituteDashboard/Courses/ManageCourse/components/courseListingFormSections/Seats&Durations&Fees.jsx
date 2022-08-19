import { DoctButton, DoctCol, DoctIconButton, DoctRow, DoctTypography } from '@doct-react/core';
import { DoctAutoComplete, DoctChip, DoctTextField } from '@doct-react/app';
import { monthsOptions } from '../static/monthOptions';
import { durationInformationOptions } from '../static/durationInformationOptions';
import { feesOptions } from '../static/feesOptions';
import { accommodationOptions } from '../static/accommodationOptions';

const SeatsDurationsFees = ({ control, error, watch, intakesArr, setIntakesArr }) => {
  const watchIntakes = watch('intakes');

  const addIntakeToArr = () => {
    if (watchIntakes?.label && !intakesArr?.includes(watchIntakes.label)) {
      setIntakesArr((prevState) => [...prevState, watchIntakes.label]);
    }
  };

  const removeIntakeFromArr = (intakeToRemove) => {
    setIntakesArr(intakesArr?.filter((existingIntake) => existingIntake != intakeToRemove));
  };

  return (
    <>
      <DoctTypography variant="subtitle2">Intake (optional)</DoctTypography>
      <DoctRow>
        <DoctCol sm={11}>
          <DoctAutoComplete
            control={control}
            isErrors={error}
            id={'intakes'}
            name={'intakes'}
            label={'Select'}
            options={monthsOptions}
          />
        </DoctCol>

        <DoctCol sm={1}>
          <DoctIconButton
            onButtonClickHandler={(e) => {
              e.preventDefault();
              addIntakeToArr();
            }}
            icon="check"
            size="medium"
          />
        </DoctCol>

        {intakesArr?.length > 0 &&
          intakesArr?.map((intake, i) => {
            return (
              <div key={i} className={`m-2`}>
                <DoctChip
                  title={intake}
                  onCloseHandler={() => {
                    removeIntakeFromArr(intake);
                  }}
                />
              </div>
            );
          })}

        <DoctCol sm={12}>
          <DoctTypography variant="subtitle2">Total Seats (optional)</DoctTypography>
          <DoctTextField
            control={control}
            isErrors={error}
            id={'totalSeats'}
            label={'Enter Number'}
            name={'totalSeats'}
            showStar={false}
            validationRules={{
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                message: 'Number is not valid',
              },
            }}
          />
        </DoctCol>
      </DoctRow>

      <DoctRow>
        <DoctCol sm={4}>
          <DoctTypography variant="subtitle2">Duration (optional)</DoctTypography>
          <DoctAutoComplete
            control={control}
            isErrors={error}
            id={'durationType'}
            name={'durationType'}
            label={'Select'}
            options={durationInformationOptions}
          />
        </DoctCol>
        <DoctCol sm={8}>
          <DoctTypography variant="subtitle2">&nbsp;</DoctTypography>
          <DoctTextField
            control={control}
            isErrors={error}
            id={'duration'}
            name={'duration'}
            label={'Duration'}
            validationRules={{
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                message: 'Number is not valid',
              },
            }}
          />
        </DoctCol>
      </DoctRow>

      <DoctRow>
        <DoctCol sm={4}>
          <DoctTypography variant="subtitle2">Fees (optional)</DoctTypography>
          <DoctAutoComplete
            control={control}
            isErrors={error}
            id={'feesType'}
            name={'feesType'}
            label={'Select'}
            options={feesOptions}
          />
        </DoctCol>

        <DoctCol sm={2}>
          <DoctTypography variant="subtitle2">&nbsp;</DoctTypography>

          <DoctTextField
            validationRules={{}}
            control={control}
            isErrors={error}
            id={'feesCurrency'}
            name={'feesCurrency'}
            label={'Currency'}
            disabled
            defaultValue={'INR'}
          />
        </DoctCol>
        <DoctCol sm={6}>
          <DoctTypography variant="subtitle2">&nbsp;</DoctTypography>

          <DoctTextField
            control={control}
            isErrors={error}
            id={'fees'}
            label={''}
            name={'fees'}
            showStar={false}
            validationRules={{
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                message: 'Number is not valid',
              },
            }}
          />
        </DoctCol>
      </DoctRow>

      <div className="input-column">
        <DoctTypography variant="subtitle2">Stipend (optional)</DoctTypography>
        <DoctTextField
          control={control}
          isErrors={error}
          label={'Stipend info'}
          id={'stipend'}
          name={'stipend'}
          showStar={false}
          validationRules={''}
        />
      </div>

      <div className="input-column">
        <DoctTypography variant="subtitle2">Accommodation (optional)</DoctTypography>
        <DoctAutoComplete
          control={control}
          isErrors={error}
          id={'accomodation'}
          name={'accomodation'}
          label={'Select'}
          options={accommodationOptions}
        />
      </div>
      <div className="input-column">
        <DoctTypography variant="subtitle2">Scholarship (optional)</DoctTypography>
        <DoctTextField
          control={control}
          isErrors={error}
          label={'Scholarship info'}
          id={'scholarship'}
          name={'scholarship'}
          showStar={false}
          validationRules={''}
        />
      </div>
    </>
  );
};

export default SeatsDurationsFees;
