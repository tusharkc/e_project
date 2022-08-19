import { DoctAutoComplete, DoctChip, DoctTextField } from '@doct-react/app';
import { DoctCol, DoctIconButton, DoctRow, DoctTypography } from '@doct-react/core';
import { useState } from 'react';
import useFieldOptions from '../../../../../../hooks/useFieldOptions/useFieldOptions';
import arrowDropDown from '../../../../../../assets/icons/arrowDropDown.svg';

const BasicInfo = ({ control, error, affiliations, setAffiliations, watch }) => {
  const { optionsArray: courseTitleOptions } = useFieldOptions({
    apiRoute: '/course-titles/names',
  });

  const { optionsArray: courseTypeOptions } = useFieldOptions({
    apiRoute: '/course-types/names',
  });

  const { optionsArray: disciplineOptions } = useFieldOptions({
    apiRoute: '/disciplines',
  });

  const { optionsArray: specialtyOptions } = useFieldOptions({
    apiRoute: '/specialties/names',
  });

  const { optionsArray: affiliationOptions } = useFieldOptions({
    apiRoute: '/affiliations/names',
  });

  const [selectCustomTitle, setSelectCustomTitle] = useState(false);
  const [selectCustomAffiliation, setSelectCustomAffiliation] = useState(false);
  const watchAffiliations = watch('affiliation');

  const addAffiliationsToArr = () => {
    if (watchAffiliations && !affiliations?.includes(watchAffiliations)) {
      setAffiliations((prevState) => [...prevState, watchAffiliations]);
    }
  };

  const removeAffiliationFromArr = (affiliationToRemove) => {
    setAffiliations(
      affiliations?.filter((existingAffiliation) => existingAffiliation != affiliationToRemove),
    );
  };
  return (
    <>
      {!selectCustomTitle && (
        <div className="input-column">
          <div className="d-flex align-items-center justify-content-between">
            <DoctTypography variant="subtitle2">Course Title</DoctTypography>
            <span
              onClick={() => {
                setSelectCustomTitle(true);
              }}
            >
              <DoctTypography variant="subtitle3" className="text-primary cursor-pointer">
                Couldn&apos;t find?
              </DoctTypography>
            </span>
          </div>

          <DoctAutoComplete
            control={control}
            isErrors={error}
            id={'courseTitleId'}
            name={'courseTitleId'}
            label={'Select Course'}
            options={courseTitleOptions || []}
            validationRules={{
              required: !selectCustomTitle ? "It's Required Field" : false,
            }}
          />
        </div>
      )}

      {selectCustomTitle && (
        <>
          <div className="input-column">
            <DoctTypography variant="subtitle2">Course Title</DoctTypography>

            <div
              onClick={() => setSelectCustomTitle(false)}
              className="d-flex align-items-center justify-content-between bg-white px-2 box-shadow cursor-pointer"
            >
              <DoctTypography variant="textLabel1">Choose custom</DoctTypography>
              <img src={arrowDropDown} />
            </div>
          </div>

          <div className="input-column bg-primary-100 p-2 border-radius">
            <DoctTextField
              control={control}
              isErrors={error}
              id={'newCourseTitleName'}
              name={'newCourseTitleName'}
              label={'Enter course name/title'}
              options={courseTitleOptions || []}
              showStar={false}
              validationRules={{
                required: selectCustomTitle ? "It's Required Field" : false,
              }}
            />

            <DoctTypography variant="body3" className="my-2 p-0 text-grey-600">
              Docthub will verify this course title or will choose the right match for this course.
            </DoctTypography>
          </div>
        </>
      )}

      <DoctRow>
        <DoctCol sm={6}>
          <DoctTypography variant="subtitle2">Course Type</DoctTypography>
          <DoctAutoComplete
            control={control}
            isErrors={error}
            id={'courseTypeId'}
            name={'courseTypeId'}
            label={'Select'}
            options={courseTypeOptions || []}
            validationRules={{
              required: "It's Required Field",
            }}
          />
        </DoctCol>
        <DoctCol sm={6}>
          <DoctTypography variant="subtitle2">Discipline</DoctTypography>
          <DoctAutoComplete
            control={control}
            isErrors={error}
            id={'disciplineId'}
            name={'disciplineId'}
            label={'Select'}
            options={disciplineOptions || []}
            validationRules={{
              required: "It's Required Field",
            }}
          />
        </DoctCol>
      </DoctRow>

      <div className="input-column">
        <DoctTypography variant="subtitle2">Specialty</DoctTypography>
        <DoctAutoComplete
          control={control}
          isErrors={error}
          id={'specialtyId'}
          name={'specialtyId'}
          label={'Select'}
          options={specialtyOptions || []}
          validationRules={{
            required: "It's Required Field",
          }}
        />
      </div>

      {!selectCustomAffiliation && (
        <div className="input-column">
          <div className="d-flex align-items-center justify-content-between">
            <DoctTypography variant="subtitle2">Affiliation (optional)</DoctTypography>

            <span
              onClick={() => {
                setSelectCustomAffiliation(true);
              }}
            >
              <DoctTypography variant="subtitle3" className="text-primary cursor-pointer">
                Couldn&apos;t find?
              </DoctTypography>
            </span>
          </div>
          <DoctRow>
            <DoctCol sm={11}>
              <DoctAutoComplete
                control={control}
                isErrors={error}
                id={'affiliation'}
                name={'affiliation'}
                label={'Search or Select affiliation'}
                options={affiliationOptions || []}
              />
            </DoctCol>
            <DoctCol sm={1}>
              <DoctIconButton
                onButtonClickHandler={(e) => {
                  e.preventDefault();
                  addAffiliationsToArr();
                }}
                icon="check"
                size="medium"
              />
            </DoctCol>
          </DoctRow>
        </div>
      )}

      {selectCustomAffiliation && (
        <>
          <div className="input-column">
            <DoctTypography variant="subtitle2">Affiliation (optional)</DoctTypography>

            <div
              onClick={() => setSelectCustomAffiliation(false)}
              className="d-flex align-items-center justify-content-between bg-white px-2 box-shadow cursor-pointer"
            >
              <DoctTypography variant="textLabel1">Choose custom</DoctTypography>
              <img src={arrowDropDown} />
            </div>
          </div>

          <div className="input-column bg-primary-100 p-2 border-radius">
            <DoctTextField
              control={control}
              isErrors={error}
              id={'newAffiliationName'}
              name={'newAffiliationName'}
              label={'Enter affiliation name'}
              options={courseTitleOptions || []}
              showStar={false}
              validationRules={{
                required: selectCustomAffiliation ? "It's Required Field" : false,
              }}
            />

            <DoctTypography variant="body3" className="my-2 p-0 text-grey-600">
              Docthub will verify this course title or will choose the right match for this course.
            </DoctTypography>
          </div>
        </>
      )}

      <DoctRow>
        <DoctCol sm={12}>
          {affiliations?.length > 0 &&
            affiliations?.map((affiliation, i) => (
              <div key={i} className="m-2">
                <DoctChip
                  title={affiliation?.label}
                  onCloseHandler={() => {
                    removeAffiliationFromArr(affiliation);
                  }}
                />
              </div>
            ))}
        </DoctCol>
      </DoctRow>
    </>
  );
};

export default BasicInfo;
