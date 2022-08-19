import { DoctButton, DoctTypography } from '@doct-react/core';
import inrImg from '../../../../../../../../assets/images/Create Events Form/Tickets/ticket-usd-image.svg';
import React, { useEffect, useState } from 'react';
import { DoctForm, DoctModal } from '@doct-react/app';
import ManageForeignRegistration from './ManageForeignRegistration';
import { useDispatch, useSelector } from 'react-redux';
import InrCard from '../../TicketsSubSection/components/InrCard';
import {
  fetchEventById,
  foreignTicket,
  selectCreateEventResponse,
  selectForeignTicket,
  selectTicketCategory,
  selectTicketsDetails,
} from '../../../../../createEvent.slice';
import { useParams } from 'react-router-dom';

function ForeignRegistration({ usdTickets, setUsdTickets, tarrif }) {
  const { handleSubmit, control, touched, errors, watch, reset } = DoctForm({
    mode: 'onChange',
    defaultValues: {},
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const ticketCategory = useSelector(selectTicketCategory);
  const selectforeignTicket = useSelector(selectForeignTicket);
  const tickets = useSelector(selectTicketsDetails);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiResponseData = useSelector(selectCreateEventResponse);
  const [dataStoreInState, setDataStoreInState] = useState(false);
  const [editingData, setEditingData] = useState(false);

  const [selectedRecords, setSelectedRecords] = useState(null);

  const manageActionHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (id == undefined) return;
    dispatch(fetchEventById(id));
  }, [id]);

  const deleteRecordHandler = (index) => {
    let newArray = [...usdTickets];
    newArray.splice(index, 1);
    setUsdTickets(newArray);
  };

  useEffect(() => {
    const usdReg = [...usdTickets];
    if (Object.keys(selectforeignTicket).length > 1) {
      usdReg.push(selectforeignTicket);
    }
    setUsdTickets(usdReg);
  }, [selectforeignTicket]);

  useEffect(() => {
    if (dataStoreInState == true) return;
    const usdReg = [...usdTickets];
    if (Object.keys(tickets).length) {
      const usdArray = tickets?.Tickets?.filter(({ Currency }) => Currency == 'USD') || [];
      const newArrayForUsdReg = [];
      usdArray?.map((item) => {
        if (usdReg.includes(item) != true) {
          const newObj = {};
          newObj.attendeeType = item.attendeeType;
          newObj.numberOfSeats = item.NumberOfSeats;
          newObj.category = {};
          item?.prices?.map((item) => {
            const categoryName = {};
            newObj.category[item.category] = categoryName;
            categoryName.amount = item.amount;
            categoryName.code = 'USD';
          });
          newArrayForUsdReg.push(newObj);
        }
      });
      newArrayForUsdReg?.map((item) => {
        if (usdReg.includes(item) != true) {
          usdReg.push(item);
        }
      });
      setDataStoreInState(true);
    }
    if (Object.keys(apiResponseData).length) {
      if (id == undefined) return;
      const usdArray = apiResponseData?.tickets?.filter(({ currency }) => currency == 'USD') || [];
      const newArrayForUsdReg = [];
      usdArray?.map((item) => {
        const newObj = {};
        newObj.attendeeType = item.attendeeType;
        newObj.numberOfSeats = item.numberOfSeats;
        newObj.category = {};
        item.prices.map((item) => {
          const categoryName = {};
          newObj.category[item.category] = categoryName;
          categoryName.code = 'USD';
          categoryName.amount = item.amount;
        });
        newArrayForUsdReg.push(newObj);
      });
      newArrayForUsdReg?.map((item) => {
        if (usdReg.includes(item) != true) {
          usdReg.push(item);
        }
      });
      setDataStoreInState(true);
    }
    setUsdTickets(usdReg);
  }, [Object.keys(apiResponseData).length, Object.keys(tickets).length]);

  const handleFormSubmit = handleSubmit((values) => {
    if (editingData) {
      usdTickets[selectedRecords] = values;
      manageActionHandler();
      setEditingData(false);
    } else {
      dispatch(foreignTicket(values));
      manageActionHandler();
      setEditingData(false);
    }
  });
  return (
    <>
      {usdTickets.length ? (
        <div className="INR_section_second_page bg-grey-100 px-3 py-3 border-radius mt-3">
          <DoctTypography variant="h6" className="inr_text">
            Foreign Registration (USD)
          </DoctTypography>
          <DoctButton
            type="inverse"
            variant="text"
            icon="plus"
            text="Add Ticket"
            className="mx-sm-n4 mt-2"
            onButtonClickHandler={(e) => {
              setSelectedRecords(null);
              e.preventDefault();
              manageActionHandler();
            }}
            disabled={ticketCategory?.ticketCategories ? false : true}
          />

          <div className="inr_categories_second-page position-relative bg-white border-radius">
            {usdTickets?.map((item, index) => {
              return (
                <div key={index}>
                  <InrCard
                    regtype={item.attendeeType}
                    seats={item.numberOfSeats}
                    category={item.category}
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
        <div className="USD_section bg-grey-100 mt-3 border-radius px-4 py-3">
          <h6 className="usd_text">Foreign Registration (USD)</h6>
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
                    e.preventDefault();
                    manageActionHandler();
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
        <ManageForeignRegistration
          control={control}
          errors={errors}
          touched={touched}
          handleFormSubmit={handleFormSubmit}
          usdTickets={usdTickets}
          selectedRecord={selectedRecords}
          reset={reset}
          tarrif={tarrif}
        />
      </DoctModal>
    </>
  );
}

export default ForeignRegistration;
