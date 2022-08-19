import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CheckIcon from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import './Stepper.scss';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',

  '& .QontoStepIcon-completedIcon': {
    color: 'white',
    zIndex: 1,
    fontSize: 14,
    borderRadius: '50%',
  },
  '& .QontoStepIcon-circle': {
    width: 16,
    height: 16,
    borderRadius: '50%',
    borderWidth: '2px',
    borderColor: `rgba(255, 255, 255, 0.8)`,
    borderStyle: 'solid',
    position: 'relative',
    // left: '-9px',
  },
}));

function QontoStepIconCompleted(props) {
  const { className, active } = props || {};
  return (
    <QontoStepIconRoot className={className}>
      {active ? (
        <span className="QontoStepIcon-completedIcon-container d-inline-flex align-items-center justify-content-center">
          <CheckIcon className="QontoStepIcon-completedIcon" />
        </span>
      ) : (
        <span className={`${active ? 'QontoStepIcon-active' : ''} `}>
          <div className="QontoStepIcon-circle" />
        </span>
      )}
    </QontoStepIconRoot>
  );
}

function QontoStepIcon(props) {
  const { active, completed, className, icon } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <span className="QontoStepIcon-completedIcon-container d-inline-flex align-items-center justify-content-center">
          <CheckIcon className="QontoStepIcon-completedIcon" />
        </span>
      ) : (
        <span className={`${active ? 'QontoStepIcon-active' : ''} `}>
          <div className="QontoStepIcon-circle" />
        </span>
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

export default function CustomStepper({ steps, style, activeStep }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={4} className="custom-stepper mx-auto" {...style}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector completed={true} activeStep={activeStep} />}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={steps.length - 1 == index ? QontoStepIconCompleted : QontoStepIcon}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
