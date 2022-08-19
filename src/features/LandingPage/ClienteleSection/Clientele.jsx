import React from 'react';
import './Clientele.scss';
import { clienteleLogoData } from './components/clienteleLogoData';
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
    <div className="cleintele_container position-relative">
      <h3 className="text-center text-white py-5">Clientele</h3>

      <div className="clientele_images_container position-absolute bg-white d-flex flex-row align-items-center justify-content-center">
        <Slider {...settingsClient} className="slider-flex-slick-track logo-slider">
          {clienteleLogoData.map((logoSrc, index) => {
            return (
              <div
                key={index}
                className="clientele_slider_img_container d-flex align-items-center justify-content-center"
              >
                <img src={logoSrc.imgPath} alt="logo" className="img-fluid" />
              </div>
            );
          })}
          {clienteleLogoData.map((logoSrc, index) => {
            return (
              <div
                key={index}
                className="clientele_slider_img_container d-flex align-items-center justify-content-center"
              >
                <img src={logoSrc.imgPath} alt="logo" className="img-fluid" />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Clientele;
