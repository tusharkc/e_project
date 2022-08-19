import React from 'react';

const ServingSegmentsStructure = ({ image, segmentInfo }) => {
  return (
    <>
      <div className="d-flex align-items-center position-relative">
        <div className="serving_segment_image_container">
          <img src={image} alt="serving_segments_images" className="serving_segments_images" />
        </div>
        <p className="serving_segments_info text-grey-600">{segmentInfo}</p>
      </div>
    </>
  );
};

export default ServingSegmentsStructure;
