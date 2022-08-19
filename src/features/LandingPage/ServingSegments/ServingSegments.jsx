import React, { useState, useEffect } from 'react';
import { segmentData } from './components/segmentData';
import ServingSegmentsStructure from './components/ServingSegmentsStructure';
import './ServingSegments.scss';
import Slider from 'react-slick';
import bgIllustration from '../../../assets/images/landing_page/landing_page_illustrations/serving_segmants_bg_illustration.png';

const ServingSegments = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    vertical: true,
    verticalSwiping: true,
    fade: true,
    arrows: false,
    speed: 200,
    pauseOnHover: true,
    asNavFor: '.slider-nav',
  };

  const settings2 = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    centerMode: true,
    speed: 200,
    focusOnSelect: true,
    pauseOnHover: true,
    asNavFor: '.slider-nav',
  };

  return (
    <div className="position-relative">
      <h1 className="section_title text-center">The segments we serve</h1>
      <img
        src={bgIllustration}
        className="position-absolute bg_illustration"
        alt="bg_illustration"
      />
      <div className="slider_container my-5">
        <Slider {...settings} asNavFor={nav2} ref={(slider) => setSlider1(slider)}>
          {segmentData.map((item, index) => {
            return (
              <ServingSegmentsStructure
                key={index}
                image={item.image}
                segmentInfo={item.segmentInfo}
              />
            );
          })}
        </Slider>
      </div>
      <div className="segmant_title_container position-absolute">
        <Slider {...settings2} asNavFor={nav1} ref={(slider) => setSlider2(slider)}>
          <p className="segment_titles my-0 cursor-pointer">Hospitals</p>
          <p className="segment_titles my-0 cursor-pointer">Medical Institutes</p>
          <p className="segment_titles my-0 cursor-pointer">Medical Associations</p>
          <p className="segment_titles my-0 cursor-pointer">Pharmaceuticals</p>
          <p className="segment_titles my-0 cursor-pointer">Enterprises</p>
        </Slider>
      </div>
    </div>
  );
};

export default ServingSegments;
