import { DoctTypography } from '@doct-react/core';
import NoDataFoundImg from '../../assets/icons/empty-state-icon.svg';

export default function NoDataFound() {
  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <img src={NoDataFoundImg} alt="no data found" />
      <DoctTypography variant="subtitle2" className="text-grey-600">
        No Data Found
      </DoctTypography>
    </div>
  );
}
