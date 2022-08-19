import React from 'react';
import TestimonialCard from './component/TestimonialCard';
import { testimonialData } from './component/testimonialData';
import './Testimonial.scss';
import Slider from 'react-slick';
// import bgIllustratation from '../../../assets/images/landing_page/landing_page_illustrations/testimonial_bg_illustrations.svg';

const TestimonialSection = () => {
  const settings = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: false,
    arrows: false,
    variableWidth: true,
    pauseOnHover: true,
  };

  return (
    <div className="event_testimonial_section_container position-relative">
      <h3 className="text-center event_section_testimonial_title  font-weight-bold">
        What fraternity saying?
      </h3>

      <Slider {...settings} className="event_slider-flex-slick-track">
        {testimonialData.map((testimonial, index) => {
          return (
            <div key={index} className="mx-auto">
              <TestimonialCard
                testimonialContent={testimonial.testimonialContent}
                fraternityName={testimonial.fraternityName}
                fraternityPost={testimonial.fraternityPost}
                media={testimonial.media}
                containsMedia={testimonial.containsMedia}
              />
            </div>
          );
        })}
      </Slider>

      {/* <img
        alt="bg_illustration"
        src={bgIllustratation}
        className="position-absolute bg_illustration_testimonials"
      /> */}
    </div>
  );
};

export default TestimonialSection;
