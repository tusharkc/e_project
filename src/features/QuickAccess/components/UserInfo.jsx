import { DoctTypography } from '@doct-react/core';
import BuildingIcon from '../../../assets/icons/business_office_company_building.svg';
import IndianFlag from '../../../assets/icons/indian-flag.svg';

export default function UserInfo({ userInfo, className }) {
  const { name, organizationName, userNumber } = userInfo || {};

  return (
    <div
      className={className ? `d-flex align-items-center ${className}` : 'd-flex align-items-center'}
    >
      <span className="d-inline-flex">
        <img src={BuildingIcon} alt="office icon"></img>
      </span>
      <p className="my-0 ml-3">
        <DoctTypography variant="textLabel1" className="my-0">
          {name}
        </DoctTypography>
        <DoctTypography
          variant="caption2"
          textTransform="normal"
          className="text-grey-600 my-0 d-inline-block"
        >
          {organizationName}
          <br />
          ID: {userNumber}
        </DoctTypography>
      </p>
      <span className="ml-auto d-inline-flex">
        <DoctTypography variant="textLabel1" className="text-grey-600 my-0 mr-3">
          India
        </DoctTypography>
        <img src={IndianFlag} alt="Indian flag" />
      </span>
    </div>
  );
}
