import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import MUIButton from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove';
import MuiTooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

import { DoctTypography } from '@doct-react/core';

const CustomToolTip = withStyles(() => ({
  tooltip: {
    backgroundColor: '#6665ff',
    color: '#ffffff',
    padding: '14px',
    minWidth: '290px',
    fontSize: '14px',
  },
}))(Tooltip);

class AddRemoveCounter extends Component {
  updateCount = (count) => {
    const { item, ticketInformation, addTicketInformation, removeTicketInformation } = this.props;
    if (count === 0) {
      removeTicketInformation({ id: item.id });
      return;
    }
    addTicketInformation({ ...ticketInformation, count });
  };

  onChangeHandler = (clicked) => {
    const { item, addTicketInformation, removeTicketInformation } = this.props;
    if (clicked) {
      addTicketInformation({ ...item, checked: true, count: 1 });
    } else {
      removeTicketInformation({ id: item.id });
    }
  };

  render() {
    let {
      ticketInformation: { checked = false, count = 0 } = { checked: false, count: 0 },
      isDisabled,
    } = this.props;

    const isDisabledAddTicked = count >= this.props.ticketLimit;

    return (
      <CustomToolTip
        title={isDisabled ? 'You can only select single currency registration category.' : ''}
        arrow
        placement="top"
      >
        <div>
          {!checked && (
            <MUIButton
              variant="contained"
              startIcon={<AddIcon />}
              className={`button-slate-blue add-button ${isDisabled ? 'add-button-disabled' : ''}`}
              onClick={(e) => this.onChangeHandler(true)}
              disabled={isDisabled}
            >
              Add
            </MUIButton>
          )}
          {checked && (
            <div className="d-flex align-items-center">
              <MUIButton
                variant="contained"
                color="primary"
                startIcon={count === 1 ? <DeleteIcon /> : <RemoveIcon />}
                className="circle-button"
                onClick={() => this.updateCount(--count)}
              >
                <span />
              </MUIButton>
              <DoctTypography variant="textLabel1" className="mb-0 add-remove-count">
                {count}
              </DoctTypography>
              <MuiTooltip
                title={
                  isDisabledAddTicked ? `You can add max ${this.props.ticketLimit} Tickets` : ''
                }
                arrow
                placement="top"
              >
                <span className={isDisabledAddTicked && 'cursor-not-allow'}>
                  <MUIButton
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    className="circle-button"
                    disabled={isDisabledAddTicked}
                    onClick={() => !isDisabledAddTicked && this.updateCount(++count)}
                  >
                    <span />
                  </MUIButton>
                </span>
              </MuiTooltip>
            </div>
          )}
        </div>
      </CustomToolTip>
    );
  }
}

export default AddRemoveCounter;
