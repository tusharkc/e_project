import { DoctForm, DoctModal } from '@doct-react/app';
import { DoctButton, DoctCol, DoctIcon, DoctRow, DoctTypography } from '@doct-react/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ticketBg from '../../../../../../../../assets/images/Create Events Form/Tickets/TICKET.svg';
import TicketCategoriesCard from '../../TicketsSubSection/components/TicketCategoriesCard';
import TicketCategoryModal from '../TicketCategory/TicketCategoryModal';
import dayjs from 'dayjs';
import {
  saveTicketCategory,
  selectCreateEventResponse,
  selectTicketCategory,
} from '../../../../../createEvent.slice';
import { useParams } from 'react-router-dom';
import { Tost } from '../../../../../../../../shared';

function TicketCategories() {
  const [sameNameCategories, setSameNameCategories] = useState(false);
  const { handleSubmit, control, touched, errors, watch, register, reset } = DoctForm({
    mode: 'onChange',
    defaultValues: {
      categoryName: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
    },
  });
  const dispatch = useDispatch();
  const ticketCategory = useSelector(selectTicketCategory);
  const apiResponseData = useSelector(selectCreateEventResponse);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  const manageActionHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (Object.keys(apiResponseData).length) {
      if (id == undefined) return;
      const newObj = {};
      newObj.ticketCategories = apiResponseData.ticketCategories;
      dispatch(saveTicketCategory(newObj));
    }
  }, [apiResponseData]);

  useEffect(() => {
    if (sameNameCategories) {
      setTimeout(() => {
        onTostCloseHandler();
      }, 2000);
    }
  }, [sameNameCategories]);

  const onTostCloseHandler = () => {
    setSameNameCategories(false);
  };

  const handleFormSubmit = handleSubmit((values) => {
    var valueArr = values?.ticketCategories?.map(function (item) {
      return item.name?.toLowerCase().replace(/ /g, '');
    });

    var isDuplicate = valueArr?.some(function (item, idx) {
      return valueArr?.indexOf(item) != idx;
    });

    if (isDuplicate == true) {
      setSameNameCategories(true);
    } else {
      dispatch(saveTicketCategory(values));
      manageActionHandler();
    }
  });

  return (
    <>
      {sameNameCategories && (
        <div className="position-fixed tost-container">
          <Tost
            variant={'error'}
            text={'Duplicate Ticket Categories found, Please Correct it.'}
            onPressedClose={onTostCloseHandler}
          />
        </div>
      )}
      {ticketCategory?.ticketCategories == null && (
        <div className="ticket_categories_section bg-grey-100 mx-auto border-radius px-4 py-3">
          <DoctTypography variant="h6" className="text-grey-800">
            Ticket Categories
          </DoctTypography>
          <div className="d-flex text-center justify-content-center align-items-center">
            <div>
              <div className="mt-2">
                <img src={ticketBg} alt="tickets" />
              </div>
              <div>
                <DoctTypography variant="body3" className="mt-1 text-grey-600">
                  Setup multiple ticket categories maximum upto 4. <br /> e.g. Super Early, Early
                  Bird, Regular, Spot-on.
                </DoctTypography>
              </div>
              <div className="d-flex text-center justify-content-center align-items-center">
                <DoctButton
                  variant="contained"
                  icon="plus"
                  text="Set Categories"
                  className="doct_btn_set_catrgories mb-3"
                  onButtonClickHandler={(e) => {
                    e.preventDefault();
                    manageActionHandler();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {ticketCategory?.ticketCategories && (
        <div className="ticket_categories_second_page px-3 border-radius bg-grey-100 py-2">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <DoctTypography variant="h6" fontWeight="medium" className="text-grey-800">
              Ticket Categories
            </DoctTypography>
            <span
              onClick={(e) => {
                e.preventDefault();
                manageActionHandler();
              }}
            >
              <DoctIcon name="editOutline" fill="#717171" className="members_icon mb-3 mt-3" />
            </span>
          </div>

          <div className="col-lg-auto bg-white border-radius d-flex mt-sm-n3">
            {ticketCategory?.ticketCategories.map((item, index) => {
              return (
                <div key={index}>
                  <TicketCategoriesCard
                    categories={item.name}
                    from={dayjs(item.salesStartDate).format('D MMM YYYY')}
                    to={dayjs(item.salesEndDate).format('D MMM YYYY')}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <DoctModal
        iconName={''}
        primaryBtnText={'Save'}
        open={isModalOpen}
        className={'disable_modal_outside_click'}
        handlePrimaryButtonClick={handleFormSubmit}
        handleClose={() => {
          manageActionHandler();
        }}
        title={'Add Ticket Categories'}
        width={360}
      >
        <TicketCategoryModal
          defaultValues={{ name: 'Tushar' }}
          control={control}
          touched={touched}
          errors={errors}
          watch={watch}
          handleFormSubmit={handleFormSubmit}
          reset={reset}
        />
      </DoctModal>
    </>
  );
}

export default TicketCategories;
