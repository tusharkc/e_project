import { useEffect, useState } from 'react';

export default function useAttendeeAccordionUiState(isOpen, details) {
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    const defaultClassList = [
      'attendee_details_with_form',
      'attendee_details_with_form_default',
      'mb-3',
    ];

    if (isOpen) {
      const newClassList = [...defaultClassList];
      const classListRemoveActive = newClassList.filter(
        (el) => el != 'attendee_details_with_form_completed',
      );
      classListRemoveActive.push('attendee_details_with_form_active');
      setClassList([...newClassList, ...classListRemoveActive]);
    } else {
      if (Object.keys(details).length) {
        const newClassList = [...defaultClassList];
        newClassList.push('attendee_details_with_form_completed');
        setClassList(newClassList.filter((el) => el != 'attendee_details_with_form_active'));
      } else {
        const newClassList = [...defaultClassList];
        setClassList(newClassList.filter((el) => el != 'attendee_details_with_form_active'));
      }
    }
  }, [isOpen]);

  return { classList };
}
