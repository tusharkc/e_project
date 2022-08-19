import { DoctTypography } from '@doct-react/core';
import { useEffect, useRef, useState } from 'react';
import './Dropdown.scss';

export function DropdownListEl({ children, onClick, isDisabled = false }) {
  return (
    <div
      className={`dropdown-list-el d-flex align-items-center ${!isDisabled && 'cursor-pointer'}`}
      onClick={() => {
        !isDisabled && onClick();
      }}
    >
      <DoctTypography
        variant="textLabel1"
        className={`my-0 d-flex align-items-center ${isDisabled && 'text-grey-500'}`}
      >
        {children}
      </DoctTypography>
    </div>
  );
}

export function DropdownMenu(props) {
  const { children, className, ...reset } = props;
  return (
    <div className={`dropdown-menu ${className}`} {...reset}>
      {children}
    </div>
  );
}

export default function Dropdown(props) {
  const { children, className = '', disabled, ...rest } = props;

  const [classList, setClassList] = useState([]);

  const handleClick = () => {
    let classListArray = [];
    if (!classList.includes('dropdown-open')) {
      classListArray.push('dropdown-open');
    }
    setClassList(classListArray);
  };

  const ref = useRef();

  useOnClickOutside(ref, () => {
    setClassList([]);
  });

  return (
    <div
      className={
        className
          ? `position-relative dropdown ${classList.join(' ')} ${className}`
          : `position-relative dropdown ${classList.join(' ')}`
      }
      {...rest}
      ref={ref}
      onClick={disabled ? null : handleClick}
    >
      {children}
    </div>
  );
}

// Hook
function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler],
  );
}
