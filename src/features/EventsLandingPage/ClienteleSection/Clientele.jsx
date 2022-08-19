import React from 'react';
import './Clientele.scss';
import { clienteleLogoData } from './component/clienteleLogoData';
import Slider from 'react-slick';

const Clientele = () => {
  const settingsClient = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 5000,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    variableWidth: true,
  };
  return (
    <div className="mt-4">
      <h2 className="clientel_heading text-center  font-weight-bold">Clientele</h2>
      <Slider {...settingsClient} className="slider-flex-slick-track logo-slider">
        {clienteleLogoData.map((logoSrc, index) => {
          return (
            <div key={index} className=" d-flex align-items-center justify-content-center mt-5">
              <img src={logoSrc.imgPath} alt="logo" className="img-fluid" />
            </div>
          );
        })}
        {clienteleLogoData.map((logoSrc, index) => {
          return (
            <div key={index} className=" d-flex align-items-center justify-content-center mt-5">
              <img src={logoSrc.imgPath} alt="logo" className="img-fluid" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Clientele;
