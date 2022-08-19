import { DoctActionMenu, DoctForm, DoctModal } from '@doct-react/app';
import { DoctButton, DoctTypography } from '@doct-react/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import inrImg from '../../../../../../../../assets/images/Create Events Form/Tickets/ticket-usd-image.svg';
import {
  fetchEventById,
  indianTicket,
  selectCreateEventResponse,
  selectIndianTicket,
  selectTicketCategory,
  selectTicketsDetails,
} from '../../../../../createEvent.slice';
import InrCard from '../../TicketsSubSection/components/InrCard';
import ManageIndianRegistration from './ManageIndianRegistration';

function IndianRegistration({ inrTickets, setInrTickets, tarrif }) {
  const { handleSubmit, control, touched, errors, watch, reset } = DoctForm({
    mode: 'onChange',
    defaultValues: {},
  });
  const dispatch = useDispatch();
  const { id } = useParams();
  const ticketCategory = useSelector(selectTicketCategory);
  const selectindianTicket = useSelector(selectIndianTicket);
  const tickets = useSelector(selectTicketsDetails);
  const apiResponseData = useSelector(selectCreateEventResponse);
  const [dataStoreInState, setDataStoreInState] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(false);

  const manageActionHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (id == undefined) return;
    dispatch(fetchEventById(id));
  }, [id]);

  const deleteRecordHandler = (index) => {
    let newArray = [...inrTickets];
    newArray.splice(index, 1);
    setInrTickets(newArray);
  };

  const [selectedRecords, setSelectedRecords] = useState(null);

  useEffect(() => {
    const inrReg = [...inrTickets];
    if (Object.keys(selectindianTicket).length > 1) {
      inrReg.push(selectindianTicket);
    }
    setInrTickets(inrReg);
  }, [selectindianTicket]);

  useEffect(() => {
    if (dataStoreInState == true) return;
    const inrReg = [...inrTickets];
    if (Object.keys(tickets).length) {
      const inrArray = tickets?.Tickets?.filter(({ Currency }) => Currency == 'INR') || [];
      const newArrayForInrReg = [];
      inrArray?.map((item) => {
        const newObj = {};
        newObj.attendeeType = item.attendeeType;
        newObj.numberOfSeats = item.NumberOfSeats;
        newObj.category = {};
        item.prices.map((item) => {
          const categoryName = {};
          newObj.category[item.category] = categoryName;
          categoryName.code = 'INR';
          categoryName.amount = item.amount;
        });
        newArrayForInrReg.push(newObj);
      });
      newArrayForInrReg?.map((item) => {
        if (inrReg.includes(item) != true) {
          inrReg.push(item);
        }
      });
      setDataStoreInState(true);
    }
    if (Object.keys(apiResponseData).length) {
      if (id == undefined) return;
      const inrArray = apiResponseData?.tickets?.filter(({ currency }) => currency == 'INR') || [];
      const newArrayForInrReg = [];
      inrArray?.map((item) => {
        const newObj = {};
        newObj.attendeeType = item.attendeeType;
        newObj.numberOfSeats = item.numberOfSeats;
        newObj.category = {};
        item.prices.map((item) => {
          const categoryName = {};
          newObj.category[item.category] = categoryName;
          categoryName.code = 'INR';
          categoryName.amount = item.amount;
        });
        newArrayForInrReg.push(newObj);
      });
      newArrayForInrReg?.map((item) => {
        if (inrReg.includes(item) != true) {
          inrReg.push(item);
        }
      });
      setDataStoreInState(true);
    }
    setInrTickets(inrReg);
  }, [Object.keys(apiResponseData).length, Object.keys(tickets).length]);

  const handleFormSubmit = handleSubmit((values) => {
    if (editingData) {
      inrTickets[selectedRecords] = values;
      manageActionHandler();
      setEditingData(false);
    } else {
      dispatch(indianTicket(values));
      manageActionHandler();
      setEditingData(false);
    }
  });
  return (
    <>
      {inrTickets.length ? (
        <div className="INR_section_second_page bg-grey-100 px-3 py-3 border-radius mt-3">
          <DoctTypography variant="h6" className="inr_text">
            Indian Registration (INR)
          </DoctTypography>
          <DoctButton
            type="inverse"
            variant="text"
            icon="plus"
            text="Add Ticket"
            className="mx-sm-n4 mt-2"
            onButtonClickHandler={(e) => {
              setSelectedRecords(null);
              manageActionHandler();
              e.preventDefault();
            }}
            disabled={ticketCategory?.ticketCategories ? false : true}
          />

          <div className="inr_categories_second-page position-relative bg-white border-radius">
            {inrTickets?.map((item, index) => {
              return (
                <div key={index}>
                  <InrCard
                    regtype={item?.attendeeType}
                    seats={item?.numberOfSeats}
                    category={item?.category}
                    setIsModalOpen={setIsModalOpen}
                    additionalFun={() => {
                      setSelectedRecords(index);
                      setEditingData(true);
                    }}
                    deleteRecordHandler={deleteRecordHandler}
                    index={index}
                    ticketCategory={ticketCategory?.ticketCategories}
                  />
                </div>
              );
            })}
          </div>
          {tarrif && (
            <DoctTypography variant="body3" className="text-grey-400 text-center">
              Prices are
              {tarrif == 'ExcludingAllTaxes' ? ' Excluding All Taxes' : ' Including All Taxes'}
            </DoctTypography>
          )}
        </div>
      ) : (
        <div className="INR_section bg-grey-100 mt-3 border-radius mx-auto px-4 py-3">
          <h6 className="inr_text">Indian Registration (INR)</h6>
          <div className="d-flex text-center justify-content-center align-items-center">
            <div>
              <div className="mt-2">
                <img src={inrImg} alt="INR" />
              </div>
              <div>
                <DoctTypography variant="body2" className="mt-1 text-grey-600">
                  Add tickets as per your attendee types.
                </DoctTypography>
              </div>
              <div className="d-flex text-center justify-content-center align-items-center">
                <DoctButton
                  variant="contained"
                  icon="plus"
                  text="Add Ticket"
                  className="doct_btn_set_catrgories mb-3"
                  disabled={ticketCategory?.ticketCategories ? false : true}
                  onButtonClickHandler={(e) => {
                    setSelectedRecords(null);
                    manageActionHandler();
                    e.preventDefault();
                  }}
                />
              </div>
            </div>
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
          setSelectedRecords(null);
          manageActionHandler();
          setEditingData(false);
        }}
        title={editingData ? 'Edit Ticket' : 'Add Ticket'}
        width={360}
      >
        <ManageIndianRegistration
          control={control}
          errors={errors}
          touched={touched}
          handleFormSubmit={handleFormSubmit}
          inrTickets={inrTickets}
          selectedRecord={selectedRecords}
          reset={reset}
          tarrif={tarrif}
        />
      </DoctModal>
    </>
  );
}

export default IndianRegistration;
