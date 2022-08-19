import React from 'react';
import VideoPlayer from '../../../../helper/VideoPlayer/VideoPlayer';

const TestimonialCard = ({
  testimonialContent,
  fraternityName,
  fraternityPost,
  containsMedia = false,
  media,
}) => {
  return (
    <div className="testimonial_card my-5 mx-2">
      {!containsMedia ? (
        <div className="testimonial_content d-flex align-items-center justify-content-center">
          <p>{testimonialContent}</p>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-center mx-auto mt-3 mb-5 video_bg">
          <VideoPlayer src={media} />
        </div>
      )}

      <h5 className="text-center font-weight-bold m-1 fraternity_name">{fraternityName}</h5>
      <p className="text-grey-400 text-center m-1 fraternity_post">{fraternityPost}</p>
    </div>
  );
};

export default TestimonialCard;
