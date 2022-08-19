import { DoctActionMenu, DoctDatePickerV2, DoctTextField, DoctTimePicker } from '@doct-react/app';
import { DoctButton, DoctTypography } from '@doct-react/core';
import React, { useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import './TicketCategory.scss';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { selectTicketCategory } from '../../../../../createEvent.slice';

function TicketCategoryModal({ control, errors, touched, handleFormSubmit, watch, reset }) {
  const ticketCategories = useSelector(selectTicketCategory);

  const options = [
    {
      title: 'Delete',
    },
  ];

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ticketCategories',
    categoryName: 'categoryName',
    startDate: 'startDate',
    startTime: 'startTime',
    endDate: 'endDate',
    endTime: 'endTime',
  });

  const returnWatch = (index) => {
    const startDate = watch(`ticketCategories[${index}].salesStartDate`);
    const endDate = watch(`ticketCategories[${index}].salesEndDate`);

    return {
      startDate,
      endDate,
    };
  };

  useEffect(() => {
    if (Object.keys(ticketCategories).length) {
      let transformValue = { ...ticketCategories };

      transformValue.ticketCategories = transformValue.ticketCategories?.map((element) => {
        const newTimeObj = {};
        newTimeObj['name'] = element.name;
        newTimeObj['startTime'] = element.startTime
          ? new Date(element.startTime)
          : new Date(element.salesStartDate);
        newTimeObj['endTime'] = element.endTime
          ? new Date(element.endTime)
          : new Date(element.salesEndDate);
        newTimeObj['salesStartDate'] = new Date(element.salesStartDate);
        newTimeObj['salesEndDate'] = new Date(element.salesEndDate);

        return newTimeObj;
      });

      setTimeout(() => {
        reset(transformValue);
      }, 1000);
    }
    if (Object.keys(ticketCategories).length == 0) {
      reset({
        ticketCategories: [
          {
            name: '',
            salesStartDate: '',
            startTime: '',
            salesEndDate: '',
            endTime: '',
          },
        ],
      });
    }
  }, [Object.keys(ticketCategories).length]);

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <DoctTypography variant="body2" className="text-grey-600">
          You can add multiple ticket categories upto 4.
          <br />
          e.g. Super Early, Early Bird, Regular, Spot-on, etc with
          <br />
          individual start & en date validity.
        </DoctTypography>
        <DoctButton
          variant="text"
          icon="plus"
          type="primary"
          text="Add Category"
          className="mb-3 p-0 background_transparent"
          disabled={fields?.length >= 4}
          onButtonClickHandler={(e) => {
            append({
              name: '',
              salesStartDate: '',
              startTime: '',
              salesEndDate: '',
              endTime: '',
            });
            e.preventDefault();
          }}
        />
        {fields.map((item, index) => {
          returnWatch(index);
          return (
            <>
              <div
                key={item.id}
                className="category_body_container px-3 py-12px mb-2 bg-grey-300 border-radius"
              >
                <div key={index}>
                  <div className="d-flex justify-content-between">
                    <DoctTypography variant="subtitle2" className="text-grey-600">
                      CATEGORY {index + 1}
                    </DoctTypography>
                    <DoctActionMenu
                      btnType="secondary"
                      className="more_icon mt-12px"
                      options={options}
                      onClick={(item) => {
                        if (item.title == 'Delete') {
                          remove(index);
                        }
                      }}
                      fill="#AAAAAA"
                    ></DoctActionMenu>
                  </div>
                  <div className="category_name mt-n2">
                    <DoctTextField
                      showStar={false}
                      className="mt-2 mb-2"
                      name={`ticketCategories[${index}].name`}
                      label="Category Name *"
                      id="categoryName"
                      control={control}
                      isErrors={errors}
                      defaultValue={item.name}
                      validationRules={{
                        required: "It's Required Field",
                      }}
                      touched={touched}
                    />
                  </div>
                  <div>
                    <div className="categories_start_date d-flex pr-2">
                      <DoctDatePickerV2
                        inputProps={{
                          label: 'Start Date *',
                          id: 'startDate',
                          dateFormat: 'dd MMM yyyy',
                          autoComplete: 'off',
                          minDate: dayjs(returnWatch(index - 1).endDate).toDate(),
                        }}
                        control={control}
                        isErrors={errors}
                        showStar={false}
                        name={`ticketCategories[${index}].salesStartDate`}
                        validationRules={{
                          required: "It's Required Field",
                        }}
                        className="date_picker mr-2"
                        defaultValue={item.salesStartDate}
                      />
                      <DoctTimePicker
                        name={`ticketCategories[${index}].startTime`}
                        label="Start Time"
                        id="StartTime"
                        className="w-100"
                        control={control}
                        touched={touched}
                        isErrors={errors}
                        defaultValue={item.startTime}
                      />
                    </div>
                    <div className="categories_start_date d-flex mt-2 pr-2">
                      <DoctDatePickerV2
                        inputProps={{
                          label: 'End Date *',
                          id: 'endDate',
                          dateFormat: 'dd MMM yyyy',
                          minDate: dayjs(returnWatch(index).startDate).toDate(),
                          autoComplete: 'off',
                          disabled: returnWatch(index).startDate ? false : true,
                        }}
                        control={control}
                        isErrors={errors}
                        showStar={false}
                        name={`ticketCategories[${index}].salesEndDate`}
                        className="date_picker mr-2"
                        validationRules={{
                          required: "It's Required Field",
                        }}
                        defaultValue={item.salesEndDate}
                      />
                      <DoctTimePicker
                        name={`ticketCategories[${index}].endTime`}
                        label="End Time"
                        id="endTime"
                        className="w-100"
                        control={control}
                        touched={touched}
                        isErrors={errors}
                        defaultValue={item.endTime}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </form>
    </>
  );
}

export default TicketCategoryModal;
