import './KeyPointIndicator.scss';
import React from 'react';

const KeyPointIndicator = () => {
  return (
    <div className="section_indicator mt-5">
      <div className="key__point_indicator_bg_img">
        <div className="align-items-center d-flex flex-column h-100 w-100 justify-content-around">
          <div className="text_fisrt d-flex text-center align-items-center justify-content-around h-75 w-75 mx-auto">
            <h4 className="text-white indicator_section">
              99% <br /> Client Satisfaction
            </h4>
            <h4 className="text-white indicator_section">
              25+ <br /> Projects Delivered
            </h4>
          </div>

          <div className=" text_second d-flex text-center align-items-center justify-content-around h-75 w-75">
            <h4 className="text-white indicator_section">
              24*7 <br /> Support
            </h4>
            <h4 className="text-white indicator_section">
              200+ <br /> Associations
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyPointIndicator;
