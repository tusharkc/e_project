import { DoctLoading, DoctPageLoading } from '@doct-react/app';
import PropTypes from 'prop-types';

export default function LayoutLoading({ isLoading, children = null }) {
  if (isLoading) {
    return (
      <div className="position-relative content-loading d-flex justify-content-center">
        <DoctLoading />
      </div>
    );
  }
  return children;
}

LayoutLoading.propTypes = {
  children: PropTypes.any,
  isLoading: PropTypes.bool,
};
