import { DoctIcon, DoctIconButton, DoctTypography } from '@doct-react/core';
import { useEffect, useState } from 'react';

import './Tost.scss';

export default function Tost({ variant, text, className, onPressedClose }) {
  const [classNames, setClassNames] = useState([
    'tost d-flex align-items-center justify-content-center w-100',
  ]);
  const [iconName, setIconName] = useState('');

  useEffect(() => {
    switch (variant) {
      case 'positive':
        setClassNames([...classNames, 'tost_positive']);
        setIconName('check');
        break;

      case 'danger':
        setClassNames([...classNames, 'tost_danger']);
        setIconName('exclamation');
        break;

      case 'informative':
        setClassNames([...classNames, 'tost_informative']);
        setIconName('info');
        break;

      case 'error':
        setClassNames([...classNames, 'tost_error']);
        setIconName('info');
        break;

      default:
        setIconName('check');
        break;
    }

    if (className) {
      setClassNames([...classNames, className]);
    }
  }, []);

  return (
    <div className={classNames.join(' ')}>
      <span className="tost_base_icon mr-3 d-inline-flex align-items-center justify-content-center">
        <DoctIcon width="24" height="24" name={iconName} />
      </span>
      <DoctTypography variant="subtitle2" className="text-white ">
        {text}
      </DoctTypography>
      <span className="tost_vertical_divider ml-auto mr-1" />
      <span className="icon-white d-inline-flex">
        <DoctIconButton
          variant="text"
          type="secondary"
          icon="close"
          size="large"
          onButtonClickHandler={onPressedClose}
        ></DoctIconButton>
      </span>
    </div>
  );
}
